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
// Register handles user registration
func Register(c *gin.Context) {
	// Get user input from the form
	username := c.PostForm("username")
	email := c.PostForm("email")
	password := c.PostForm("password")

	// Basic validation
	if username == "" || email == "" || password == "" {
		c.HTML(http.StatusBadRequest, "register.html", gin.H{
			"error": "All fields are required",
		})
		return
	}

	// Create new user
	userID, err := models.CreateUser(username, email, password)
	if err != nil {
		// Check if the error is a specific one (e.g., username or email already exists)
		c.HTML(http.StatusBadRequest, "register.html", gin.H{
			"error": err.Error(),
		})
		return
	}

	sessionToken, err := generateSessionToken() // Assuming generateSessionToken is defined somewhere
	if err != nil {
		c.HTML(http.StatusInternalServerError, "register.html", gin.H{
			"error": "Failed to create session",
		})
		return
	}

	// Store the session (assuming middleware is set up to handle sessions)
	middleware.Sessions[sessionToken] = strconv.Itoa(userID)

	// Set the session cookie
	c.SetCookie(
		"session",
		sessionToken,
		int(time.Hour.Seconds()*24), // 24 hours
		"/",
		"",
		false,
		true,
	)

	// Redirect to the expenses page or wherever you want after registration
	c.Redirect(http.StatusSeeOther, "/expenses")
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
