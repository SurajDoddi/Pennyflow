package main

import (
	"fmt"
	"log"
	"net/http"
	"pennyflow/config"
	"pennyflow/db"
	"pennyflow/handlers"
	"pennyflow/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Load configuration and connect to the database
	config.LoadEnv()
	database := db.ConnectDB()
	defer database.Close()

	// Initialize Gin router
	r := gin.Default()

	// Configure CORS for React frontend
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // React dev server address
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// API mode flag - set to true when using separate React frontend
	apiOnly := true

	// Only set up HTML templates if not in API-only mode
	if !apiOnly {
		// Load all HTML templates (skip this in API-only mode)
		r.LoadHTMLGlob("../client/build/*.html")
		// Serve static files (skip this in API-only mode)
		r.Static("/static", "../client/build/static")

		// Define page routes (these serve HTML)
		r.GET("/", handlers.HomePage)
		r.GET("/login", handlers.LoginPage)
		r.GET("/register", handlers.RegisterPage)
		r.GET("/about-us", handlers.AboutPage)
		r.GET("/add_expense", handlers.AddExpensePage)
		r.GET("/analysis", handlers.AnalysisPage)
	} else {
		// In API-only mode, return a simple message for the root path
		r.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "PennyFlow API server is running",
				"version": "1.0",
			})
		})
	}

	// Authentication routes - these work in both modes
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
	fmt.Println("API-only mode:", apiOnly)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Server failed:", err)
	}
}
