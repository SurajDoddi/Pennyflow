package handlers

import (
	"crypto/rand"
	"encoding/hex"
	"net/http"
	"strconv" // Import strconv package to convert int to string
	"time"

	"github.com/gin-gonic/gin"

	"pennyflow/middleware"
	"pennyflow/models"
)

// Register handles user registration
func Register(c *gin.Context) {
	// (Existing registration logic)
}

// Login handles user authentication
func Login(c *gin.Context) {
	username := c.PostForm("username")
	password := c.PostForm("password")

	// Basic validation
	if username == "" || password == "" {
		c.HTML(http.StatusBadRequest, "login.html", gin.H{
			"error": "Username and password are required",
		})
		return
	}

	// Get user
	user, err := models.GetUserByUsername(username)
	if err != nil {
		c.HTML(http.StatusUnauthorized, "login.html", gin.H{
			"error": "Invalid username or password",
		})
		return
	}

	// Check password
	if !user.CheckPassword(password) {
		c.HTML(http.StatusUnauthorized, "login.html", gin.H{
			"error": "Invalid username or password",
		})
		return
	}

	// Generate session token
	sessionToken, err := generateSessionToken()
	if err != nil {
		c.HTML(http.StatusInternalServerError, "login.html", gin.H{
			"error": "Internal server error",
		})
		return
	}

	// Convert user.ID from int to string and store session
	middleware.Sessions[sessionToken] = strconv.Itoa(user.ID) // Convert to string

	// Set session cookie
	c.SetCookie(
		"session",
		sessionToken,
		int(time.Hour.Seconds()*24), // 24 hours
		"/",
		"",
		false,
		true,
	)

	// Redirect to expenses page
	c.Redirect(http.StatusSeeOther, "/expenses")
}

// Logout handles user logout
func Logout(c *gin.Context) {
	// Get session token
	sessionToken, err := c.Cookie("session")
	if err == nil {
		// Remove session
		delete(middleware.Sessions, sessionToken)
	}

	// Clear cookie
	c.SetCookie("session", "", -1, "/", "", false, true)

	// Redirect to login page
	c.Redirect(http.StatusSeeOther, "/login")
}

// generateSessionToken creates a random token for user sessions
func generateSessionToken() (string, error) {
	b := make([]byte, 16)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}
	return hex.EncodeToString(b), nil
}
