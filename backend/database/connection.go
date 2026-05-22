package database

import (
	"fmt"
	"log"

	"backend/config"

	"gorm.io/driver/postgres"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	var err error

	switch config.DB.Connection {
	case "sqlite":
		DB, err = gorm.Open(sqlite.Open(config.DB.Database), &gorm.Config{})
	case "postgres":
		dsn := fmt.Sprintf(
			"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=%s",
			config.DB.Host,
			config.DB.Username,
			config.DB.Password,
			config.DB.Database,
			config.DB.Port,
			config.DB.SSLMode,
			config.DB.TimeZone,
		)
		DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	default:
		log.Fatalf("Database connection type %s is not supported", config.DB.Connection)
	}

	if err != nil {
		log.Fatalf("Could not connect to the database: %v", err)
	}

	fmt.Printf("Database connection (%s) successfully established.\n", config.DB.Connection)
}
