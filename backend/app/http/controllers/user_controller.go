package controllers

import (
	"strconv"

	"backend/app/services"

	"github.com/gofiber/fiber/v2"
)

type UserController struct {
	BaseController
	service services.UserService
}

func NewUserController(service services.UserService) *UserController {
	return &UserController{service: service}
}

type CreateUserRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UpdateUserRequest struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func (ctrl *UserController) Index(c *fiber.Ctx) error {
	users, err := ctrl.service.GetAllUsers()
	if err != nil {
		return ctrl.ResponseError(c, "Failed to retrieve users", fiber.StatusInternalServerError, err.Error())
	}
	return ctrl.ResponseSuccess(c, users, "Users successfully retrieved", fiber.StatusOK)
}

func (ctrl *UserController) Show(c *fiber.Ctx) error {
	idParam := c.Params("id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		return ctrl.ResponseError(c, "Invalid user ID parameter", fiber.StatusBadRequest, nil)
	}

	user, err := ctrl.service.GetUserByID(uint(id))
	if err != nil {
		return ctrl.ResponseError(c, "User not found", fiber.StatusNotFound, err.Error())
	}

	return ctrl.ResponseSuccess(c, user, "User details successfully retrieved", fiber.StatusOK)
}

func (ctrl *UserController) Store(c *fiber.Ctx) error {
	var req CreateUserRequest
	if err := c.BodyParser(&req); err != nil {
		return ctrl.ResponseError(c, "Invalid request body", fiber.StatusBadRequest, err.Error())
	}

	// Basic validation
	if req.Name == "" || req.Email == "" || req.Password == "" {
		return ctrl.ResponseError(c, "Name, Email, and Password are required fields", fiber.StatusUnprocessableEntity, nil)
	}

	user, err := ctrl.service.RegisterUser(req.Name, req.Email, req.Password)
	if err != nil {
		return ctrl.ResponseError(c, "Failed to create user", fiber.StatusBadRequest, err.Error())
	}

	return ctrl.ResponseSuccess(c, user, "User successfully created", fiber.StatusCreated)
}

func (ctrl *UserController) Update(c *fiber.Ctx) error {
	idParam := c.Params("id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		return ctrl.ResponseError(c, "Invalid user ID parameter", fiber.StatusBadRequest, nil)
	}

	var req UpdateUserRequest
	if err := c.BodyParser(&req); err != nil {
		return ctrl.ResponseError(c, "Invalid request body", fiber.StatusBadRequest, err.Error())
	}

	if req.Name == "" || req.Email == "" {
		return ctrl.ResponseError(c, "Name and Email are required fields", fiber.StatusUnprocessableEntity, nil)
	}

	user, err := ctrl.service.UpdateUser(uint(id), req.Name, req.Email)
	if err != nil {
		return ctrl.ResponseError(c, "Failed to update user", fiber.StatusBadRequest, err.Error())
	}

	return ctrl.ResponseSuccess(c, user, "User successfully updated", fiber.StatusOK)
}

func (ctrl *UserController) Destroy(c *fiber.Ctx) error {
	idParam := c.Params("id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		return ctrl.ResponseError(c, "Invalid user ID parameter", fiber.StatusBadRequest, nil)
	}

	err = ctrl.service.DeleteUser(uint(id))
	if err != nil {
		return ctrl.ResponseError(c, "Failed to delete user", fiber.StatusBadRequest, err.Error())
	}

	return ctrl.ResponseSuccess(c, nil, "User successfully deleted", fiber.StatusOK)
}
