package middleware

import (
	"net/http"
	"pennyflow/models"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

// AuthRequired is middleware to check if user is authenticated
func AuthRequired(c *gin.Context) {
	// Check if it's an API request (looking at Accept or Content-Type headers)
	acceptHeader := c.GetHeader("Accept")
	contentType := c.GetHeader("Content-Type")
	isAPIRequest := strings.Contains(acceptHeader, "application/json") || strings.Contains(contentType, "application/json")

	// Get user ID from session
	session, err := c.Cookie("session")
	if err != nil {
		if isAPIRequest {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required"})
		} else {
		c.Redirect(http.StatusSeeOther, "/login")
		}
		c.Abort()
		return
	}

	// Get userID from the session
	userIDStr, ok := Sessions[session]
	if !ok {
		if isAPIRequest {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid session"})
		} else {
		c.Redirect(http.StatusSeeOther, "/login")
		}
		c.Abort()
		return
	}

	// Convert userIDStr from string to int
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		if isAPIRequest {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID"})
		} else {
		c.Redirect(http.StatusSeeOther, "/login")
		}
		c.Abort()
		return
	}

	// Get user details and add to context
	user, err := models.GetUserByID(userID)
	if err != nil {
		if isAPIRequest {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		} else {
		c.Redirect(http.StatusSeeOther, "/login")
		}
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
