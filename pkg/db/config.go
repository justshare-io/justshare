package db

import (
	"go.uber.org/config"
)

type Config struct {
	DSN   string `yaml:"dsn"`
	Type  string `yaml:"type"`
	Debug bool   `yaml:"debug"`

	BackupName                   string `yaml:"backup_name"`
	Endpoint                     string `yaml:"endpoint"`
	AwsAccessKeyID               string `yaml:"aws_access_key_id"`
	AwsSecretAccessKey           string `yaml:"aws_secret_access_key"`
	GoogleApplicationCredentials string `yaml:"google_application_credentials"`

	BackupsEnabled bool
	BackupsConfig  string `yaml:"backups"`
}

func NewDefaultConfig() Config {
	return Config{
		DSN:   "${DSN:\"data/justshare.db\"}",
		Type:  "sqlite3",
		Debug: false,

		BackupName:                   "${BACKUP_NAME:\"justshare-backup\"}",
		Endpoint:                     "${ENDPOINT:\"http://localhost:9000\"}",
		AwsAccessKeyID:               "${AWS_ACCESS_KEY_ID:\"minio\"}",
		AwsSecretAccessKey:           "${AWS_SECRET_ACCESS_KEY:\"minio123\"}",
		GoogleApplicationCredentials: "${GOOGLE_APPLICATION_CREDENTIALS:\"\"}",

		BackupsEnabled: false,
		BackupsConfig:  "${BACKUPS:\"false\"}",
	}
}

func NewConfig(provider config.Provider) (Config, error) {
	value := provider.Get("db")

	var c Config
	err := value.Populate(&c)
	if err != nil {
		return Config{}, err
	}
	// TODO breadchris this parsing should happen automatically, but you can't declare a bool in env
	c.BackupsEnabled = c.BackupsConfig == "true"
	return c, nil
}
