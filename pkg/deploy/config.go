package deploy

import (
	"go.uber.org/config"
)

type Config struct {
	GcsAccount string `yaml:"gcs_account"`
}

func NewDefaultConfig() Config {
	return Config{
		GcsAccount: "${GCS_ACCOUNT_DEPLOY:\"data/gcs_account_deploy.json\"}",
	}
}

func NewConfig(provider config.Provider) (Config, error) {
	var c Config
	err := provider.Get("deploy").Populate(&c)
	if err != nil {
		return Config{}, err
	}
	return c, nil
}
