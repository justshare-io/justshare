package deploy

import (
	"archive/zip"
	"context"
	"fmt"
	connect_go "github.com/bufbuild/connect-go"
	"github.com/google/wire"
	"github.com/justshare-io/justshare/pkg/bucket"
	"github.com/justshare-io/justshare/pkg/gen/deploy"
	"github.com/justshare-io/justshare/pkg/gen/deploy/deployconnect"
	"io"
	"os"
	"path/filepath"
	"time"

	"cloud.google.com/go/storage"
	"google.golang.org/api/cloudfunctions/v1"
	"google.golang.org/api/option"
)

var ProviderSet = wire.NewSet(
	NewService,
	NewConfig,
)

type Service struct {
	config Config
	bucket *bucket.Builder
}

var _ deployconnect.DeployServiceHandler = &Service{}

func NewService(config Config, bucket *bucket.Builder) *Service {
	return &Service{
		config: config,
		bucket: bucket,
	}
}

func (s *Service) Deploy(ctx context.Context, c *connect_go.Request[deploy.DeployRequest]) (*connect_go.Response[deploy.DeployResponse], error) {
	bucketName := "test-functions"
	functionName := "your-function-name"
	runtime := "nodejs14" // or any supported runtime
	entryPoint := "helloGET"
	objectName := "function.zip"
	projectID := "planar-sun-402202"

	zipFilePath, err := s.bucket.Dir("functions").File("build.zip")
	if err != nil {
		return nil, err
	}

	err = ZipDir("/Users/hacked/Documents/code/justshare/test-function", zipFilePath)
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

	if err := s.uploadFileToGCS(ctx, bucketName, objectName, zipFilePath); err != nil {
		return "", fmt.Errorf("failed to upload file to GCS: %v", err)
	}

	service, err := cloudfunctions.NewService(ctx, option.WithCredentialsFile(s.config.GcsAccount))
	if err != nil {
		return "", fmt.Errorf("failed to create Cloud Functions client: %v", err)
	}

	function := &cloudfunctions.CloudFunction{
		Name:             fmt.Sprintf("projects/%s/locations/%s/functions/%s", projectID, region, functionName),
		EntryPoint:       entryPoint,
		Runtime:          runtime,
		SourceArchiveUrl: fmt.Sprintf("gs://%s/%s", bucketName, objectName),
		HttpsTrigger:     &cloudfunctions.HttpsTrigger{},
	}

	operation, err := service.Projects.Locations.Functions.Create(fmt.Sprintf("projects/%s/locations/%s", projectID, region), function).Do()
	if err != nil {
		return "", fmt.Errorf("failed to deploy function: %v", err)
	}

	if err := waitForOperation(ctx, service, operation.Name); err != nil {
		return "", fmt.Errorf("failed to wait for deployment: %v", err)
	}

	deployedFunction, err := service.Projects.Locations.Functions.Get(function.Name).Do()
	if err != nil {
		return "", fmt.Errorf("failed to get deployed function details: %v", err)
	}

	return deployedFunction.HttpsTrigger.Url, nil
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

// waitForOperation waits for the operation to complete
func waitForOperation(ctx context.Context, service *cloudfunctions.Service, operationName string) error {
	for {
		operation, err := service.Operations.Get(operationName).Do()
		if err != nil {
			return fmt.Errorf("failed to get operation: %v", err)
		}
		if operation.Done {
			if operation.Error != nil {
				return fmt.Errorf("operation error: %v", operation.Error.Message)
			}
			return nil
		}
		time.Sleep(2 * time.Second)
	}
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
