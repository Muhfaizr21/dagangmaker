package controllers

import "github.com/gofiber/fiber/v2"

// BaseController provides Laravel-like JSON response formatting helpers
type BaseController struct{}

func (c *BaseController) ResponseSuccess(ctx *fiber.Ctx, data interface{}, message string, status int) error {
	return ctx.Status(status).JSON(fiber.Map{
		"success": true,
		"message": message,
		"data":    data,
	})
}

func (c *BaseController) ResponseError(ctx *fiber.Ctx, message string, status int, errors interface{}) error {
	return ctx.Status(status).JSON(fiber.Map{
		"success": false,
		"message": message,
		"errors":  errors,
	})
}
