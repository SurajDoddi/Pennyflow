package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// LoadEnv loads environment variables from .env file
func LoadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Warning: Error loading .env file, using environment variables")
	}
}

// GetDSN returns the database connection string
func GetDSN() string {
	return "host=" + os.Getenv("DB_HOST") +
		" port=" + os.Getenv("DB_PORT") +
		" user=" + os.Getenv("DB_USER") +
		" password=" + os.Getenv("DB_PASSWORD") +
		" dbname=" + os.Getenv("DB_NAME") +
		" sslmode=disable"
}

// GetPort returns the port for the web server
func GetPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default port
	}
	return port
}

// GetSessionSecret returns the secret key for session encryption
func GetSessionSecret() string {
	secret := os.Getenv("SESSION_SECRET")
	if secret == "" {
		// In production, you would want to handle this differently
		log.Println("Warning: SESSION_SECRET not set, using default")
		return "default-secret-key-change-in-production"
	}
	return secret
}
