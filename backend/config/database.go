package config

type DatabaseConfig struct {
	Connection string
	Host       string
	Port       string
	Database   string
	Username   string
	Password   string
	SSLMode    string
	TimeZone   string
}

var DB DatabaseConfig

func LoadDBConfig() {
	DB = DatabaseConfig{
		Connection: getEnv("DB_CONNECTION", "sqlite"),
		Host:       getEnv("DB_HOST", "127.0.0.1"),
		Port:       getEnv("DB_PORT", "5432"),
		Database:   getEnv("DB_DATABASE", "database.db"),
		Username:   getEnv("DB_USERNAME", ""),
		Password:   getEnv("DB_PASSWORD", ""),
		SSLMode:    getEnv("DB_SSLMODE", "disable"),
		TimeZone:   getEnv("DB_TIMEZONE", "Asia/Jakarta"),
	}
}
