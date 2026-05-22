package repositories

import (
	"backend/app/models"
	"backend/database"
)

type UserRepository interface {
	All() ([]models.User, error)
	Find(id uint) (*models.User, error)
	Create(user *models.User) error
	Update(user *models.User) error
	Delete(id uint) error
	FindByEmail(email string) (*models.User, error)
}

type userRepository struct{}

func NewUserRepository() UserRepository {
	return &userRepository{}
}

func (r *userRepository) All() ([]models.User, error) {
	var users []models.User
	err := database.DB.Find(&users).Error
	return users, err
}

func (r *userRepository) Find(id uint) (*models.User, error) {
	var user models.User
	err := database.DB.First(&user, id).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *userRepository) Create(user *models.User) error {
	return database.DB.Create(user).Error
}

func (r *userRepository) Update(user *models.User) error {
	return database.DB.Save(user).Error
}

func (r *userRepository) Delete(id uint) error {
	return database.DB.Delete(&models.User{}, id).Error
}

func (r *userRepository) FindByEmail(email string) (*models.User, error) {
	var user models.User
	err := database.DB.Where("email = ?", email).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}
