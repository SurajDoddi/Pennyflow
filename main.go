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
	// Load config and connect to database
	config.LoadEnv()
	database := db.ConnectDB()
	defer database.Close()

	// Initialize Gin router
	r := gin.Default()

	// Set up HTML rendering
	buildPath, _ := filepath.Abs("./client/build")
	r.LoadHTMLGlob(filepath.Join(buildPath, "*.html"))

	// Serve static files
	r.Static("/static", filepath.Join(buildPath, "static"))

	// Page routes
	r.GET("/", handlers.HomePage)
	r.GET("/login", handlers.LoginPage)
	r.GET("/register", handlers.RegisterPage)
	r.GET("/about-us", handlers.AboutPage)
	r.GET("/add_expense", handlers.AddExpensePage)

	// Auth routes
	r.POST("/register", handlers.Register)
	r.POST("/login", handlers.Login)
	r.GET("/logout", handlers.Logout)

	// Expense routes (with auth middleware)
	expenseRoutes := r.Group("/expenses")
	expenseRoutes.Use(middleware.AuthRequired)
	{
		expenseRoutes.GET("/", handlers.GetExpenses)
		expenseRoutes.POST("/", handlers.CreateExpense)
		expenseRoutes.DELETE("/:id", handlers.DeleteExpense)
		expenseRoutes.PUT("/:id", handlers.UpdateExpense)
	}

	// Start the server
	port := config.GetPort()
	fmt.Println("Server running on http://localhost:" + port)
	err := r.Run(":" + port)
	if err != nil {
		log.Fatal("Server failed:", err)
	}
}
