package models

import (
	"database/sql"
	"errors"
	"log"
	"time"

	"golang.org/x/crypto/bcrypt"

	"pennyflow/db"
)

// User represents a user in the system
type User struct {
	ID        int
	Name      string
	Username  string
	Email     string
	Password  string // This will be the hashed password
	CreatedAt time.Time
}

// CreateUser adds a new user to the database (with password hashing)
func CreateUser(name, username, email, password string) (int, error) {
	// Check if username already exists
	var exists bool
	err := db.DB.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)", username).Scan(&exists)
	if err != nil {
		return 0, err
	}
	if exists {
		return 0, errors.New("username already exists")
	}

	// Check if email already exists
	err = db.DB.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)", email).Scan(&exists)
	if err != nil {
		return 0, err
	}
	if exists {
		return 0, errors.New("email already exists")
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return 0, err
	}

	// Insert the new user
	var userID int
	err = db.DB.QueryRow(
		"INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
		name, username, email, string(hashedPassword),
	).Scan(&userID)

	if err != nil {
		return 0, err
	}

	log.Printf("User created: ID=%d, Name=%s, Username=%s", userID, name, username)
	return userID, nil
}

// GetUserByUsername retrieves a user by username
func GetUserByUsername(username string) (*User, error) {
	user := &User{}
	err := db.DB.QueryRow(
		"SELECT id, name, username, email, password, created_at FROM users WHERE username = $1",
		username,
	).Scan(&user.ID, &user.Name, &user.Username, &user.Email, &user.Password, &user.CreatedAt)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, errors.New("user not found")
		}
		return nil, err
	}

	return user, nil
}

// CheckPassword verifies if the provided password matches the user's stored hash
func (u *User) CheckPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
	return err == nil
}

// GetUserByID retrieves a user by ID
func GetUserByID(id int) (*User, error) {
	user := &User{}
	err := db.DB.QueryRow(
		"SELECT id, name, username, email, password, created_at FROM users WHERE id = $1",
		id,
	).Scan(&user.ID, &user.Name, &user.Username, &user.Email, &user.Password, &user.CreatedAt)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, errors.New("user not found")
		}
		return nil, err
	}

	return user, nil
}

// GetUsernameByID retrieves the username for a specific user ID
func GetUserNameByID(userID int) (string, error) {
	var username string
	err := db.DB.QueryRow(
		"SELECT name FROM users WHERE id = $1",
		userID,
	).Scan(&username)

	if err != nil {
		if err == sql.ErrNoRows {
			return "", errors.New("user not found")
		}
		return "", err
	}

	return username, nil
}
