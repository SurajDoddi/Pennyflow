package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"
	"unicode"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

var DB *sql.DB

// ConnectDB connects to the PostgreSQL database and creates necessary tables if they do not exist
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

	// Create tables if they don't exist
	createTables()
}

// createTables creates the necessary tables if they don't exist
func createTables() {
	// Create the 'signup' table
	_, err := DB.Exec(`
		CREATE TABLE IF NOT EXISTS signup (
			id SERIAL PRIMARY KEY,
			username VARCHAR(100) NOT NULL,
			email VARCHAR(100) NOT NULL,
			password VARCHAR(255) NOT NULL
		);
	`)
	if err != nil {
		log.Fatalf("Error creating signup table: %v", err)
	}

	// Create the 'expenses' table
	_, err = DB.Exec(`
		CREATE TABLE IF NOT EXISTS expenses (
			id SERIAL PRIMARY KEY,
			description TEXT NOT NULL,
			amount DECIMAL(10, 2) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);
	`)
	if err != nil {
		log.Fatalf("Error creating expenses table: %v", err)
	}

	log.Println("Tables are ready!")
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

// AddExpense adds a new expense to the database
func AddExpense(description string, amount float64) error {
	// Validate input
	if description == "" {
		return fmt.Errorf("description cannot be empty")
	}
	if amount <= 0 {
		return fmt.Errorf("amount must be greater than zero")
	}

	// Prepare and execute the SQL statement
	stmt, err := DB.Prepare("INSERT INTO expenses (description, amount) VALUES ($1, $2)")
	if err != nil {
		log.Printf("Error preparing insert statement: %v", err)
		return fmt.Errorf("failed to prepare insert statement: %w", err)
	}
	defer stmt.Close()

	// Execute the statement
	_, err = stmt.Exec(description, amount)
	if err != nil {
		log.Printf("Error executing insert statement: %v", err)
		return fmt.Errorf("failed to insert expense: %w", err)
	}

	log.Printf("Expense added: %s - $%.2f", description, amount)
	return nil
}

// DeleteExpense removes an expense from the database by its ID
func DeleteExpense(id int) error {
	_, err := DB.Exec("DELETE FROM expenses WHERE id = $1", id)
	if err != nil {
		log.Printf("Error deleting expense: %v", err)
		return err
	}
	return nil
}

// UpdateExpense modifies an existing expense in the database
func UpdateExpense(id int, description string, amount float64) error {
	_, err := DB.Exec("UPDATE expenses SET description = $1, amount = $2 WHERE id = $3", description, amount, id)
	if err != nil {
		log.Printf("Error updating expense: %v", err)
		return err
	}
	return nil
}

func main() {
	// Connect to the database and ensure tables are created
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

	// Handle user registration (with password hashing)
	r.POST("/register", func(c *gin.Context) {
		username := c.PostForm("username")
		email := c.PostForm("email")
		password := c.PostForm("password")

		// Hash the password
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
		if err != nil {
			log.Printf("Error hashing password: %v", err)
			c.HTML(http.StatusInternalServerError, "register.html", gin.H{"error": "Failed to hash password"})
			return
		}

		// Store hashed password in the database
		_, err = DB.Exec("INSERT INTO signup (username, email, password) VALUES ($1, $2, $3)", username, email, string(hashedPassword))
		if err != nil {
			log.Printf("Error executing query: %v", err)
			c.HTML(http.StatusInternalServerError, "register.html", gin.H{"error": "Failed to register user"})
			return
		}

		log.Println("User successfully registered!")
		c.Redirect(http.StatusSeeOther, "/")
	})

	// Handle login (with password verification)
	r.POST("/login", func(c *gin.Context) {
		username := c.PostForm("username")
		password := c.PostForm("password")

		log.Printf("Login attempt for username: %s", username)

		if username == "" || password == "" {
			log.Println("Login failed: Missing username or password")
			c.HTML(http.StatusBadRequest, "login.html", gin.H{"error": "Username and password are required"})
			return
		}

		// Retrieve hashed password from database
		var hashedPassword string
		err := DB.QueryRow("SELECT password FROM signup WHERE username = $1", username).Scan(&hashedPassword)

		if err != nil {
			if err == sql.ErrNoRows {
				log.Println("Login failed: Account does not exist")
				c.HTML(http.StatusUnauthorized, "login.html", gin.H{"error": "Account does not exist. Please register first."})
				return
			}
			log.Println("Database error during login:", err)
			c.HTML(http.StatusInternalServerError, "login.html", gin.H{"error": "Database error"})
			return
		}

		// Compare the entered password with the hashed password stored in the database
		err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
		if err != nil {
			log.Println("Login failed: Incorrect password")
			c.HTML(http.StatusUnauthorized, "login.html", gin.H{"error": "Invalid username or password"})
			return
		}

		// Log successful login
		log.Printf("Login successful for user: %s", username)

		// Redirect to expenses page on successful login
		c.Redirect(http.StatusSeeOther, "/expenses")
	})

	// Handle displaying expenses (for logged-in users)

	// AddExpense adds a new expense to the database

	// Add these routes to your main() function within the router setup
	r.GET("/expenses", func(c *gin.Context) {
		rows, err := DB.Query("SELECT id, description, amount, created_at FROM expenses ORDER BY created_at DESC")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch expenses"})
			return
		}
		defer rows.Close()

		var expenses []map[string]interface{}
		var totalExpenses float64
		for rows.Next() {
			var id int
			var description string
			var amount float64
			var createdAt time.Time

			if err := rows.Scan(&id, &description, &amount, &createdAt); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse expenses"})
				return
			}

			expenses = append(expenses, map[string]interface{}{
				"id":          id,
				"description": description,
				"amount":      amount,
				"created_at":  createdAt.Format("2006-01-02 15:04:05"),
			})

			totalExpenses += amount
		}

		c.HTML(http.StatusOK, "expenses.html", gin.H{
			"expenses":      expenses,
			"totalExpenses": totalExpenses,
		})
	})

	// Route to handle adding a new expense
	r.POST("/expenses", func(c *gin.Context) {
		description := c.PostForm("description")
		amountStr := c.PostForm("amount")

		// Validate inputs
		if description == "" || amountStr == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Description and amount are required"})
			return
		}

		// Convert amount to float
		amount, err := strconv.ParseFloat(amountStr, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid amount"})
			return
		}

		// Add expense to database
		err = AddExpense(description, amount)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add expense"})
			return
		}

		// Redirect back to expenses page
		c.Redirect(http.StatusSeeOther, "/expenses")
	})

	// Route to handle deleting an expense
	r.DELETE("/expenses/:id", func(c *gin.Context) {
		idStr := c.Param("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid expense ID"})
			return
		}

		err = DeleteExpense(id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete expense"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Expense deleted successfully"})
	})

	// Route to handle updating an expense
	r.PUT("/expenses/:id", func(c *gin.Context) {
		idStr := c.Param("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid expense ID"})
			return
		}

		description := c.PostForm("description")
		amountStr := c.PostForm("amount")

		// Validate inputs
		if description == "" || amountStr == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Description and amount are required"})
			return
		}

		// Convert amount to float
		amount, err := strconv.ParseFloat(amountStr, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid amount"})
			return
		}

		// Update expense in database
		err = UpdateExpense(id, description, amount)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update expense"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Expense updated successfully"})
	})

	// Start the server
	port := "8080"
	fmt.Println("Server running on http://localhost:" + port)
	err := r.Run(":" + port)
	if err != nil {
		log.Fatal("Server failed:", err)
	}
}
