package bucket

import (
	"github.com/pkg/errors"
	"go.uber.org/config"
	"net/url"
	"path"
	"path/filepath"
)

const ConfigurationKey = "bucket"

type Config struct {
	Bucket string `yaml:"bucket"`

	// TODO breadchris this might be brittle
	Url *url.URL
}

func NewDefaultConfig() Config {
	return Config{
		Bucket: "${BUCKET:\"file://data/bucket\"}",
	}
}

func NewURL(ul string) (*url.URL, error) {
	u, err := url.Parse(ul)
	if err != nil {
		return nil, errors.Wrapf(err, "failed to parse: %s", ul)
	}

	var np string
	if u.Scheme == "file" {
		switch u.Host {
		case "data":
			np, err = filepath.Abs(path.Join("data", u.Path))
			if err == nil {
				err = EnsureDirExists(np)
			}
		case "user":
			np, err = CreateLocalDir(u.Path)
		case "path":
			// TODO breadchris this is confusing
			np = u.Path
		default:
			err = errors.Errorf("unknown host for Bucket: %s", u.Host)
		}
		if err != nil {
			return nil, err
		}
	}
	if np != "" {
		u.Path = np
		u.Host = ""
	}
	return u, nil
}

func NewConfig(config config.Provider) (Config, error) {
	var c Config
	err := config.Get(ConfigurationKey).Populate(&c)
	if err != nil {
		return Config{}, err
	}
	c.Url, err = NewURL(c.Bucket)
	if err != nil {
		return Config{}, err
	}
	return c, nil
}
