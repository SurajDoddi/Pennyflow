package middleware

import (
	"net/http"
	"pennyflow/models"
	"strconv" // Import the strconv package to convert strings to integers

	"github.com/gin-gonic/gin"
)

// AuthRequired is middleware to check if user is authenticated
func AuthRequired(c *gin.Context) {
	// Get user ID from session
	session, err := c.Cookie("session")
	if err != nil {
		c.Redirect(http.StatusSeeOther, "/login")
		c.Abort()
		return
	}

	// In a real application, you'd decrypt the session cookie and validate it
	// This is a simplified version for demonstration
	// You should use a proper session management library

	// Get userID from the session
	userIDStr, ok := Sessions[session]
	if !ok {
		c.Redirect(http.StatusSeeOther, "/login")
		c.Abort()
		return
	}

	// Convert userIDStr from string to int
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		c.Redirect(http.StatusSeeOther, "/login")
		c.Abort()
		return
	}

	// Get user details and add to context
	user, err := models.GetUserByID(userID)
	if err != nil {
		c.Redirect(http.StatusSeeOther, "/login")
		c.Abort()
		return
	}

	// Set user in context for handlers to access
	c.Set("user", user)
	c.Set("userID", userID)

	c.Next()
}

// Sessions is a map for demonstration purposes
// In a real application, you'd use Redis, a database, or a session library
var Sessions = make(map[string]string)
