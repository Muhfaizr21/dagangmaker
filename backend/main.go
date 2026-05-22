package main

import (
	"fmt"
	"log"

	"backend/app/models"
	"backend/config"
	"backend/database"
	"backend/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	// 1. Load Environment variables (analogous to Laravel bootstrap)
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found, using system environment variables")
	}

	// 2. Load Configuration
	config.LoadAppConfig()
	config.LoadDBConfig()

	// 3. Connect to Database
	database.Connect()

	// 4. Auto Migrate GORM Models (analogous to php artisan migrate)
	fmt.Println("Running database migrations...")
	err := database.DB.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatalf("Migration failed: %v", err)
	}
	fmt.Println("Database migrations completed successfully.")

	// 5. Initialize Fiber Web App
	app := fiber.New(fiber.Config{
		AppName: config.App.Name,
	})

	// 6. Setup Routes
	routes.Setup(app)

	// 7. Start the Web Server
	port := config.App.Port
	log.Printf("Server starting on port %s in %s mode...", port, config.App.Env)
	log.Fatal(app.Listen(fmt.Sprintf(":%s", port)))
}
