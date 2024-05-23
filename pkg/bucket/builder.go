package bucket

import (
	"context"
	"fmt"
	"github.com/pkg/errors"
	"gocloud.dev/blob"
	"gocloud.dev/gcerrors"
	"io"
	"net/http"
	"path"
	"time"

	_ "gocloud.dev/blob/fileblob"
	_ "gocloud.dev/blob/gcsblob"
)

type Builder struct {
	*blob.Bucket
	config Config

	path string
}

func NewBuilder(c Config) (*Builder, error) {
	bucket, err := blob.OpenBucket(context.Background(), c.Url.String())
	if err != nil {
		return nil, errors.Wrapf(err, "failed to open bucket: %s", c.Url.String())
	}
	// TODO breadchris is this always true
	if c.Url.Scheme != "file" {
		bucket = blob.PrefixedBucket(bucket, c.Url.Path)
	}

	// TODO breadchris handle signed URLs
	//urlSigner := fileblob.NewURLSignerHMAC(baseURL, []byte("secret-key"))
	//bucket, err := fileblob.OpenBucket(config.Path, &fileblob.Options{
	//	URLSigner: urlSigner,
	//	CreateDir: true,
	//})

	return &Builder{
		Bucket: bucket,
		config: c,
		path:   c.Url.Path,
	}, nil
}

func (s *Builder) Dir(name string) *Builder {
	ns := *s
	ns.path = path.Join(s.path, name)
	return &ns
}

func (s *Builder) Build() (string, error) {
	return s.path, EnsureDirExists(s.path)
}

func (s *Builder) File(name string) (string, error) {
	return path.Join(s.path, name), EnsureDirExists(s.path)
}

func (s *Builder) SignedURL(ctx context.Context, objectKey string, duration time.Duration) (string, error) {
	// TODO breadchris ideally file urls also could be real signed URLs. https://github.com/justshare-io/justshare/blob/main/pkg/bucket/http.go#L9
	if s.config.Url.Scheme == "file" {
		return "/upload", nil
	}

	opts := &blob.SignedURLOptions{
		Expiry:      duration,
		Method:      http.MethodPut,
		ContentType: "application/octet-stream",
	}
	url, err := s.Bucket.SignedURL(ctx, objectKey, opts)
	if err != nil {
		if gcerrors.Code(err) == gcerrors.Unimplemented {
			return "", fmt.Errorf("signed URL not supported, or missing permissions: %v", err)
		}
		return "", fmt.Errorf("failed to create signed URL: %v", err)
	}

	return url, nil
}

// TODO breadchris can we use the fs interface? https://github.com/google/go-cloud/pull/3272/files
func (s *Builder) ListBucket(ctx context.Context) ([]*FileInfo, error) {
	iter := s.Bucket.List(nil)

	var fi []*FileInfo
	for {
		obj, err := iter.Next(ctx)
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, errors.Wrapf(err, "failed to list Bucket")
		}
		fi = append(fi, &FileInfo{
			Name: obj.Key,
			Size: obj.Size,
		})
	}
	return fi, nil
}
