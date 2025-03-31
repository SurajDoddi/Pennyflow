package main

import (
	"fmt"
	"log"
	"path/filepath"

	"github.com/gin-gonic/gin"

	"pennyflow/config"
	"pennyflow/db"
	"pennyflow/handlers"
	"pennyflow/middleware"
)

func main() {
	// Load configuration and connect to the database
	config.LoadEnv()
	database := db.ConnectDB()
	defer database.Close()

	// Initialize Gin router
	r := gin.Default()

	// Set up HTML rendering:
	// Load all HTML templates from the build folder (e.g., client/build)
	buildPath, err := filepath.Abs("./client/build")
	if err != nil {
		log.Fatal("Error getting build path:", err)
	}
	r.LoadHTMLGlob(filepath.Join(buildPath, "*.html"))

	// Serve static files (CSS, JS, images) from the static folder inside the build directory
	r.Static("/static", filepath.Join(buildPath, "static"))

	// Define page routes
	r.GET("/", handlers.HomePage)
	r.GET("/login", handlers.LoginPage)
	r.GET("/register", handlers.RegisterPage)
	r.GET("/about-us", handlers.AboutPage)
	r.GET("/add_expense", handlers.AddExpensePage)
	// Analysis page route
	r.GET("/analysis", handlers.AnalysisPage)

	// Authentication routes
	r.POST("/register", handlers.Register)
	r.POST("/login", handlers.Login)
	r.GET("/logout", handlers.Logout)

	// Expense routes (with authentication middleware)
	expenseRoutes := r.Group("/expenses")
	expenseRoutes.Use(middleware.AuthRequired)
	{
		expenseRoutes.GET("/", handlers.GetExpenses)
		expenseRoutes.POST("/", handlers.CreateExpense)
		expenseRoutes.DELETE("/:id", handlers.DeleteExpense)
		expenseRoutes.PUT("/:id", handlers.UpdateExpense)
	}

	// Start the server on the specified port from configuration
	port := config.GetPort()
	fmt.Println("Server running on http://localhost:" + port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Server failed:", err)
	}
}
