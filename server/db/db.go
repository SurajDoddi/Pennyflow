package db

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"

	"pennyflow/config"
)

var DB *sql.DB

// ConnectDB connects to the PostgreSQL database and creates necessary tables
func ConnectDB() *sql.DB {
	dsn := config.GetDSN()

	var err error
	DB, err = sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal("Failed to open connection:", err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatal("Failed to connect to the database:", err)
	}

	log.Println("Database connected successfully!")

	// Create tables if they don't exist
	createTables()

	return DB
}

// createTables creates the necessary tables if they don't exist
func createTables() {
	// Create the 'users' table (renamed from 'signup' for better naming)
	_, err := DB.Exec(`
		CREATE TABLE IF NOT EXISTS users (
			id SERIAL PRIMARY KEY,
			name VARCHAR(100) NOT NULL,
			username VARCHAR(100) NOT NULL UNIQUE,
			email VARCHAR(100) NOT NULL UNIQUE,
			password VARCHAR(255) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);
	`)
	if err != nil {
		log.Fatalf("Error creating users table: %v", err)
	}

	// Create the 'expenses' table with user_id foreign key
	_, err = DB.Exec(`
		CREATE TABLE IF NOT EXISTS expenses (
			id SERIAL PRIMARY KEY,
			user_id INT NOT NULL,
			description TEXT NOT NULL,
			amount DECIMAL(10, 2) NOT NULL,
			category VARCHAR(50) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			payment_method VARCHAR(50) NOT NULL,
			FOREIGN KEY (user_id) REFERENCES users(id)
		);
	`)
	if err != nil {
		log.Fatalf("Error creating expenses table: %v", err)
	}

	log.Println("Tables are ready!")
}

// GetDB returns the database connection
func GetDB() *sql.DB {
	return DB
}
