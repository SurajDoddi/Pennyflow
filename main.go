package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"unicode"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var DB *sql.DB

// ConnectDB connects to the PostgreSQL database
func ConnectDB() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"))

	DB, err = sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal("Failed to open connection:", err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatal("Failed to connect to the database:", err)
	}

	log.Println("Database connected successfully!")
}

// Helper function to check if a string is alphanumeric
func isAlphanumeric(s string) bool {
	for _, r := range s {
		if !unicode.IsLetter(r) && !unicode.IsNumber(r) {
			return false
		}
	}
	return true
}

func main() {
	// Connect to the database
	ConnectDB()
	defer DB.Close()

	// Initialize Gin router
	r := gin.Default()

	// Set up HTML rendering
	buildPath, _ := filepath.Abs("./client/build")
	r.LoadHTMLGlob(filepath.Join(buildPath, "*.html"))

	// Serve static files
	r.Static("/static", filepath.Join(buildPath, "static"))

	// Handle routes
	r.GET("/", func(c *gin.Context) {
		c.File(filepath.Join(buildPath, "index.html"))
	})

	r.GET("/login", func(c *gin.Context) {
		c.File(filepath.Join(buildPath, "login.html"))
	})

	r.GET("/register", func(c *gin.Context) {
		c.File(filepath.Join(buildPath, "register.html"))
	})

	r.GET("/about-us", func(c *gin.Context) {
		c.File(filepath.Join(buildPath, "about.html"))
	})

	// Handle user registration
	r.POST("/register", func(c *gin.Context) {
		username := c.PostForm("username")
		email := c.PostForm("email")
		password := c.PostForm("password")
	
		// Log received data
		log.Printf("Received registration request for username: %s, email: %s", username, email)
	
		// Validate inputs
		if username == "" || email == "" || password == "" {
			c.HTML(http.StatusBadRequest, "register.html", gin.H{"error": "All fields are required"})
			return
		}
	
		if !isAlphanumeric(username) || !isAlphanumeric(password) {
			c.HTML(http.StatusBadRequest, "register.html", gin.H{"error": "Username and password must be alphanumeric"})
			return
		}
	
		_, err := DB.Exec("INSERT INTO signup (username, email, password) VALUES ($1, $2, $3)", username, email, password)
		if err != nil {
			log.Printf("Error executing query: %v", err) // Log the exact database query error
			c.HTML(http.StatusInternalServerError, "register.html", gin.H{"error": "Failed to register user"})
			return
		}
		
		

	
		// Log success
		log.Println("User successfully registered!")
	
		// Redirect to home page on successful registration
		c.Redirect(http.StatusSeeOther, "/")
	})
	

	// Handle login
	r.POST("/login", func(c *gin.Context) {
		username := c.PostForm("username")
		password := c.PostForm("password")

		// Validate inputs
		if username == "" || password == "" {
			c.HTML(http.StatusBadRequest, "login.html", gin.H{"error": "Username and password are required"})
			return
		}

		// Check credentials in the database
		var dbPassword string
		err := DB.QueryRow("SELECT password FROM signup WHERE username = $1", username).Scan(&dbPassword)

		if err != nil {
			if err == sql.ErrNoRows {
				c.HTML(http.StatusUnauthorized, "login.html", gin.H{"error": "Invalid username or password"})
				return
			}
			c.HTML(http.StatusInternalServerError, "login.html", gin.H{"error": "Database error"})
			return
		}

		// Validate password
		if dbPassword != password {
			c.HTML(http.StatusUnauthorized, "login.html", gin.H{"error": "Invalid username or password"})
			return
		}

		// Redirect to expenses page on successful login
		c.Redirect(http.StatusSeeOther, "/expenses")
	})

	// Handle displaying expenses
	r.GET("/expenses", func(c *gin.Context) {
		rows, err := DB.Query("SELECT id, description, amount FROM expenses ORDER BY id ASC")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch expenses"})
			return
		}
		defer rows.Close()

		var expenses []map[string]interface{}
		for rows.Next() {
			var id int
			var description string
			var amount float64

			if err := rows.Scan(&id, &description, &amount); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse expenses"})
				return
			}

			expenses = append(expenses, map[string]interface{}{
				"id":          id,
				"description": description,
				"amount":      amount,
			})
		}

		c.HTML(http.StatusOK, "expenses.html", gin.H{
			"expenses": expenses,
		})
	})

	// Start the server
	port := "8080"
	fmt.Println("Server running on http://localhost:" + port)
	err := r.Run(":" + port)
	if err != nil {
		log.Fatal("Server failed:", err)
	}
}
