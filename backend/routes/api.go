package routes

import (
	"backend/app/http/controllers"
	"backend/app/http/middleware"
	"backend/app/repositories"
	"backend/app/services"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	// Apply Global Middleware (like CORS)
	app.Use(middleware.NewCorsMiddleware())

	// Initialize Dependencies (Dependency Injection pattern)
	userRepo := repositories.NewUserRepository()
	userService := services.NewUserService(userRepo)
	userController := controllers.NewUserController(userService)

	// API Routing Group
	api := app.Group("/api")
	v1 := api.Group("/v1")

	// User Resources (Laravel style CRUD endpoints)
	v1.Get("/users", userController.Index)
	v1.Get("/users/:id", userController.Show)
	v1.Post("/users", userController.Store)
	v1.Put("/users/:id", userController.Update)
	v1.Delete("/users/:id", userController.Destroy)
}
