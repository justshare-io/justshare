package bucket

import (
	"context"
	connect_go "github.com/bufbuild/connect-go"
	"github.com/google/wire"
	bucket "github.com/justshare-io/justshare/pkg/gen/bucket"
	"github.com/justshare-io/justshare/pkg/gen/bucket/bucketconnect"
	"time"
)

type Service struct {
	config Config
	bucket *Builder
}

var _ bucketconnect.BucketServiceHandler = (*Service)(nil)

var ProviderSet = wire.NewSet(
	NewConfig,
	NewService,
	NewBuilder,
)

func NewService(
	config Config,
	bucket *Builder,
) *Service {
	return &Service{
		config: config,
		bucket: bucket,
	}
}

type FileInfo struct {
	Name  string
	Size  int64
	IsDir bool
}

func (s Service) SignedURL(ctx context.Context, c *connect_go.Request[bucket.SignedURLRequest]) (*connect_go.Response[bucket.SignedURLResponse], error) {
	// TODO breadchris make expiration configurable
	url, err := s.bucket.SignedURL(ctx, c.Msg.Path, time.Minute*5)
	if err != nil {
		return nil, err
	}
	return connect_go.NewResponse(&bucket.SignedURLResponse{
		Url: url,
	}), nil
}

func (s Service) Readdir(ctx context.Context, c *connect_go.Request[bucket.ReaddirRequest]) (*connect_go.Response[bucket.ReaddirResponse], error) {
	fi, err := s.bucket.ListBucket(ctx)
	if err != nil {
		return nil, err
	}

	var files []*bucket.FileInfo
	for _, f := range fi {
		files = append(files, &bucket.FileInfo{
			Name:  f.Name,
			Size:  f.Size,
			IsDir: f.IsDir,
		})
	}
	return connect_go.NewResponse(&bucket.ReaddirResponse{
		Files: files,
	}), nil
}

func (s Service) Remove(ctx context.Context, c *connect_go.Request[bucket.RemoveRequest]) (*connect_go.Response[bucket.RemoveResponse], error) {
	err := s.bucket.Delete(ctx, c.Msg.Path)
	if err != nil {
		return nil, err
	}
	return connect_go.NewResponse(&bucket.RemoveResponse{}), nil
}
