package main

import (
	"fmt"
	"log"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Define the absolute build path
	buildPath, _ := filepath.Abs("./client/build")

	// Serve static files (CSS, JS, images)
	r.Static("/static", filepath.Join(buildPath, "static"))

	// Serve Landing Page
	r.GET("/", func(c *gin.Context) {
		c.File(filepath.Join(buildPath, "index.html"))
	})

	// Serve Login Page
	r.GET("/login", func(c *gin.Context) {
		c.File(filepath.Join(buildPath, "login.html"))
	})

	// Serve Register Page
	r.GET("/register", func(c *gin.Context) {
		c.File(filepath.Join(buildPath, "register.html"))
	})

	// Serve About Us Page
	r.GET("/about-us", func(c *gin.Context) {
		c.File(filepath.Join(buildPath, "about.html"))
	})

	// Start server
	port := "8080"
	fmt.Println("Server running on http://localhost:" + port)
	err := r.Run(":" + port)
	if err != nil {
		log.Fatal("Server failed:", err)
	}
}
