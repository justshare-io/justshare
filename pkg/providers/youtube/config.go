package youtube

import (
	"go.uber.org/config"
)

type Config struct {
	APIKey string `yaml:"api_key"`
}

func NewDefaultConfig() Config {
	return Config{}
}

func NewConfig(provider config.Provider) (Config, error) {
	var c Config
	err := provider.Get("youtube").Populate(&c)
	if err != nil {
		return Config{}, err
	}

	return c, nil
}
