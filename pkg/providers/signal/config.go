package signal

import (
	"go.uber.org/config"
)

type Config struct {
	Number  string `yaml:"number"`
	BaseURL string `yaml:"base_url"`
}

func NewDefaultConfig() Config {
	return Config{
		Number:  "",
		BaseURL: "${BASE_URL:\"http://localhost:8080\"}",
	}
}

func NewConfig(provider config.Provider) (Config, error) {
	var c Config
	err := provider.Get("signal").Populate(&c)
	if err != nil {
		return Config{}, err
	}

	return c, nil
}
