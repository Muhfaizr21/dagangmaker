package config

import (
	"os"
	"strconv"
)

type AppConfig struct {
	Name  string
	Env   string
	Port  string
	Debug bool
}

var App AppConfig

func LoadAppConfig() {
	App = AppConfig{
		Name:  getEnv("APP_NAME", "Golang API"),
		Env:   getEnv("APP_ENV", "production"),
		Port:  getEnv("APP_PORT", "8000"),
		Debug: getEnvAsBool("APP_DEBUG", false),
	}
}

func getEnv(key string, defaultVal string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultVal
}

func getEnvAsBool(name string, defaultVal bool) bool {
	valStr := getEnv(name, "")
	if val, err := strconv.ParseBool(valStr); err == nil {
		return val
	}
	return defaultVal
}
