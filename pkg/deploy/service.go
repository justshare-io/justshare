package deploy

import (
	"archive/zip"
	"cloud.google.com/go/functions/apiv1"
	"cloud.google.com/go/functions/apiv1/functionspb"
	"cloud.google.com/go/iam/apiv1/iampb"
	"cloud.google.com/go/storage"
	"context"
	"fmt"
	connect_go "github.com/bufbuild/connect-go"
	"github.com/google/wire"
	"github.com/gosimple/slug"
	"github.com/justshare-io/justshare/pkg/bucket"
	"github.com/justshare-io/justshare/pkg/gen/deploy"
	"github.com/justshare-io/justshare/pkg/gen/deploy/deployconnect"
	"github.com/justshare-io/justshare/pkg/http"
	"google.golang.org/api/option"
	"io"
	"log/slog"
	"os"
	"os/exec"
	"path/filepath"
	"time"
)

var ProviderSet = wire.NewSet(
	NewService,
	NewConfig,
)

type Service struct {
	config Config
	bucket *bucket.Builder
	sess   *http.SessionManager
}

var _ deployconnect.DeployServiceHandler = &Service{}

func NewService(
	config Config,
	bucket *bucket.Builder,
	sess *http.SessionManager,
) *Service {
	return &Service{
		config: config,
		bucket: bucket,
		sess:   sess,
	}
}

func (s *Service) Deploy(ctx context.Context, c *connect_go.Request[deploy.DeployRequest]) (*connect_go.Response[deploy.DeployResponse], error) {
	uid, err := s.sess.GetUserID(ctx)
	if err != nil {
		return nil, err
	}

	bucketName := "test-functions"
	runtime := "nodejs14"
	entryPoint := "helloGET"
	objectName := "function.zip"
	projectID := "planar-sun-402202"

	funcSlug := slug.Make(c.Msg.Code.Name)
	if funcSlug == "" {
		return nil, fmt.Errorf("function name is required")
	}
	functionName := fmt.Sprintf("%s-%s", uid.String(), funcSlug)

	name := fmt.Sprintf("%s_%d", funcSlug, time.Now().Unix())

	fBuild, err := s.bucket.Dir("functions_build").Dir(name).Build()
	if err != nil {
		return nil, err
	}

	slog.Debug("Copying templates", "runtime", runtime, "fBuild", fBuild)
	//err = util.CopyDir(templates.FS, runtime, fBuild)
	//if err != nil {
	//	return nil, err
	//}
	if err = os.WriteFile(filepath.Join(fBuild, "package.json"), []byte(`{
  "name": "nodejs14",
  "version": "0.0.1",
  "private": true,
  "license": "Apache-2.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/GoogleCloudPlatform/nodejs-docs-samples.git"
  },
  "engines": {
    "node": ">=14.0.0"
  },
  "scripts": {},
  "dependencies": {
    "@google-cloud/functions-framework": "^3.1.0"
  },
  "devDependencies": {}
}`), 0644); err != nil {
		return nil, err
	}

	slog.Debug("Running npm install", "fBuild", fBuild)
	cmd := exec.Command("npm", "install")
	cmd.Dir = fBuild

	if out, err := cmd.CombinedOutput(); err != nil {
		slog.Error("Failed to run npm install", "err", err, "out", string(out))
		return nil, err
	}

	if err = os.WriteFile(filepath.Join(fBuild, "function.js"), []byte(c.Msg.Code.Code), 0644); err != nil {
		return nil, err
	}

	zipFilePath, err := s.bucket.Dir("functions").File("build.zip")
	if err != nil {
		return nil, err
	}

	err = ZipDir(fBuild, zipFilePath)
	if err != nil {
		return nil, err
	}

	err = s.CreateBucket(ctx, bucketName, projectID)
	if err != nil {
		return nil, err
	}

	endpoint, err := s.DeployFunction(
		projectID, bucketName, objectName, zipFilePath, functionName, runtime, entryPoint)
	if err != nil {
		return nil, err
	}

	return connect_go.NewResponse(&deploy.DeployResponse{
		Endpoint: endpoint,
	}), nil
}

func (s *Service) DeployFunction(
	projectID,
	bucketName,
	objectName,
	zipFilePath,
	functionName,
	runtime,
	entryPoint string,
) (string, error) {
	ctx := context.Background()

	region := "us-west1"

	slog.Debug("Deploying function", "projectID", projectID, "bucketName", bucketName, "objectName", objectName, "zipFilePath", zipFilePath, "functionName", functionName, "runtime", runtime, "entryPoint", entryPoint)

	if err := s.uploadFileToGCS(ctx, bucketName, objectName, zipFilePath); err != nil {
		return "", fmt.Errorf("failed to upload file to GCS: %v", err)
	}

	service, err := functions.NewCloudFunctionsClient(ctx, option.WithCredentialsFile(s.config.GcsAccount))
	if err != nil {
		return "", fmt.Errorf("failed to create Cloud Functions client: %v", err)
	}

	function := &functionspb.CloudFunction{
		Name:       fmt.Sprintf("projects/%s/locations/%s/functions/%s", projectID, region, functionName),
		EntryPoint: entryPoint,
		Runtime:    runtime,
		SourceCode: &functionspb.CloudFunction_SourceArchiveUrl{
			SourceArchiveUrl: fmt.Sprintf("gs://%s/%s", bucketName, objectName),
		},
		Trigger: &functionspb.CloudFunction_HttpsTrigger{
			HttpsTrigger: &functionspb.HttpsTrigger{},
		},
		IngressSettings: functionspb.CloudFunction_ALLOW_ALL,
	}

	slog.Debug("Getting function state", "function", function)
	// check if the function already exists, update it if it does
	if _, err := service.GetFunction(ctx, &functionspb.GetFunctionRequest{
		Name: function.Name,
	}); err == nil {
		slog.Debug("Function already exists, updating", "function", function)

		operation, err := service.UpdateFunction(ctx, &functionspb.UpdateFunctionRequest{
			Function: function,
		})
		if err != nil {
			return "", fmt.Errorf("failed to update function: %v", err)
		}

		if _, err := operation.Wait(ctx); err != nil {
			return "", fmt.Errorf("failed to wait for update: %v", err)
		}

		deployedFunction, err := service.GetFunction(ctx, &functionspb.GetFunctionRequest{Name: function.Name})
		if err != nil {
			return "", fmt.Errorf("failed to get deployed function details: %v", err)
		}

		if err := makeFunctionPublic(ctx, service, function.Name); err != nil {
			return "", fmt.Errorf("failed to make function public: %v", err)
		}

		return deployedFunction.GetHttpsTrigger().Url, nil
	}

	slog.Debug("Function does not exist, creating", "function", function)
	operation, err := service.CreateFunction(ctx, &functionspb.CreateFunctionRequest{Location: fmt.Sprintf("projects/%s/locations/%s", projectID, region), Function: function})
	if err != nil {
		return "", fmt.Errorf("failed to deploy function: %v", err)
	}

	if _, err = operation.Wait(ctx); err != nil {
		return "", fmt.Errorf("failed to wait for deployment: %v", err)
	}

	if err := makeFunctionPublic(ctx, service, function.Name); err != nil {
		return "", fmt.Errorf("failed to make function public: %v", err)
	}

	deployedFunction, err := service.GetFunction(ctx, &functionspb.GetFunctionRequest{Name: function.Name})
	if err != nil {
		return "", fmt.Errorf("failed to get deployed function details: %v", err)
	}

	return deployedFunction.GetHttpsTrigger().Url, nil
}

func makeFunctionPublic(ctx context.Context, functionsClient *functions.CloudFunctionsClient, functionName string) error {
	req := &iampb.GetIamPolicyRequest{
		Resource: functionName,
	}
	policy, err := functionsClient.GetIamPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("failed to get IAM policy: %v", err)
	}

	// check if the policy already has the allUsers role
	for _, binding := range policy.Bindings {
		if binding.Role == "roles/cloudfunctions.invoker" {
			for _, member := range binding.Members {
				if member == "allUsers" {
					return nil
				}
			}
		}
	}

	policy.Bindings = append(policy.Bindings, &iampb.Binding{
		Role:    "roles/cloudfunctions.invoker",
		Members: []string{"allUsers"},
	})

	setIamPolicyReq := &iampb.SetIamPolicyRequest{
		Resource: functionName,
		Policy:   policy,
	}

	_, err = functionsClient.SetIamPolicy(ctx, setIamPolicyReq)
	if err != nil {
		return fmt.Errorf("failed to set IAM policy: %v", err)
	}
	return nil
}

func (s *Service) CreateBucket(ctx context.Context, bucketName string, projectID string) error {
	client, err := storage.NewClient(ctx, option.WithCredentialsFile(s.config.GcsAccount))
	if err != nil {
		return fmt.Errorf("failed to create storage client: %v", err)
	}
	defer client.Close()

	b := client.Bucket(bucketName)

	// check to see if the bucket already exists
	if _, err := b.Attrs(ctx); err == nil {
		return nil
	}

	attrs := &storage.BucketAttrs{
		Location: "US",
	}

	if err := b.Create(ctx, projectID, attrs); err != nil {
		return fmt.Errorf("failed to create bucket: %v", err)
	}

	// Wait for the bucket to be created
	time.Sleep(5 * time.Second) // This is to ensure that the bucket creation is propagated

	return nil
}

// uploadFileToGCS uploads a file to Google Cloud Storage
func (s *Service) uploadFileToGCS(ctx context.Context, bucketName, objectName, zipFilePath string) error {
	client, err := storage.NewClient(ctx, option.WithCredentialsFile(s.config.GcsAccount))
	if err != nil {
		return fmt.Errorf("failed to create GCS client: %v", err)
	}
	defer client.Close()

	bucket := client.Bucket(bucketName)
	object := bucket.Object(objectName)

	writer := object.NewWriter(ctx)
	file, err := os.Open(zipFilePath)
	if err != nil {
		return fmt.Errorf("failed to open source file: %v", err)
	}
	defer file.Close()

	if _, err := io.Copy(writer, file); err != nil {
		return fmt.Errorf("failed to write file to GCS: %v", err)
	}

	if err := writer.Close(); err != nil {
		return fmt.Errorf("failed to close GCS writer: %v", err)
	}

	return nil
}

// https://github.com/mholt/archiver
func ZipDir(sourceDir, zipFile string) error {
	zf, err := os.Create(zipFile)
	if err != nil {
		return err
	}
	defer zf.Close()

	zipWriter := zip.NewWriter(zf)
	defer zipWriter.Close()

	return filepath.Walk(sourceDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		header, err := zip.FileInfoHeader(info)
		if err != nil {
			return err
		}

		header.Name, err = filepath.Rel(sourceDir, path)
		if err != nil {
			return err
		}

		if info.IsDir() {
			header.Name += "/"
		} else {
			header.Method = zip.Deflate
		}

		writer, err := zipWriter.CreateHeader(header)
		if err != nil {
			return err
		}

		if info.IsDir() {
			return nil
		}

		file, err := os.Open(path)
		if err != nil {
			return err
		}
		defer file.Close()

		_, err = io.Copy(writer, file)
		return err
	})
}
