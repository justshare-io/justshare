package kubes

import (
	"go.uber.org/config"
)

type Config struct {
	Enabled          bool   `yaml:"enabled"`
	Container        string `yaml:"container"`
	DefaultNamespace string `yaml:"default_namespace"`
	DefaultIngress   string `yaml:"default_ingress"`

	// TODO breadchris can these be combined?
	GcsAccount       string `yaml:"gcs_account"`
	GcsAccountDeploy string `yaml:"gcs_account_deploy"`
}

func NewDefaultConfig() Config {
	return Config{
		Enabled:          false,
		Container:        "${CONTAINER:\"\"}",
		DefaultNamespace: "${DEFAULT_NAMESPACE:\"justshare\"}",
		DefaultIngress:   "${DEFAULT_INGRESS:\"justshare-ingress\"}",

		// TODO breadchris can these be combined?
		GcsAccount:       "${GCS_ACCOUNT:\"data/gcs_account.json\"}",
		GcsAccountDeploy: "${GCS_ACCOUNT_DEPLOY:\"data/gcs_account_deploy.json\"}",
	}
}

func NewConfig(provider config.Provider) (Config, error) {
	var c Config
	err := provider.Get("kubes").Populate(&c)
	if err != nil {
		return Config{}, err
	}
	return c, nil
}
