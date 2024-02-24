package twillio

import "go.uber.org/config"

type Config struct {
	AccountSID string `yaml:"account_sid"`
	AuthToken  string `yaml:"auth_token"`
	Number     string `yaml:"number"`
}

func NewDefaultConfig() Config {
	return Config{}
}

func NewConfig(provider config.Provider) (Config, error) {
	value := provider.Get("twillio")

	var cfg Config
	err := value.Populate(&cfg)
	if err != nil {
		return Config{}, err
	}
	return cfg, nil
}
