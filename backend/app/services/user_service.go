package services

import (
	"errors"

	"backend/app/models"
	"backend/app/repositories"
)

type UserService interface {
	GetAllUsers() ([]models.User, error)
	GetUserByID(id uint) (*models.User, error)
	RegisterUser(name, email, password string) (*models.User, error)
	UpdateUser(id uint, name, email string) (*models.User, error)
	DeleteUser(id uint) error
}

type userService struct {
	repo repositories.UserRepository
}

func NewUserService(repo repositories.UserRepository) UserService {
	return &userService{repo: repo}
}

func (s *userService) GetAllUsers() ([]models.User, error) {
	return s.repo.All()
}

func (s *userService) GetUserByID(id uint) (*models.User, error) {
	return s.repo.Find(id)
}

func (s *userService) RegisterUser(name, email, password string) (*models.User, error) {
	// Business validation: Check if email already registered
	existingUser, _ := s.repo.FindByEmail(email)
	if existingUser != nil {
		return nil, errors.New("email is already registered")
	}

	// Create user
	user := &models.User{
		Name:     name,
		Email:    email,
		Password: password, // In production, hash this with bcrypt
	}

	err := s.repo.Create(user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *userService) UpdateUser(id uint, name, email string) (*models.User, error) {
	user, err := s.repo.Find(id)
	if err != nil {
		return nil, err
	}

	user.Name = name
	user.Email = email

	err = s.repo.Update(user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *userService) DeleteUser(id uint) error {
	_, err := s.repo.Find(id)
	if err != nil {
		return err
	}
	return s.repo.Delete(id)
}
