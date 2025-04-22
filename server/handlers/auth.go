package handlers

import (
	"crypto/rand"
	"encoding/hex"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"

	"pennyflow/middleware"
	"pennyflow/models"
)

// UserCredentials represents login credentials for API requests
type UserCredentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// UserRegistration represents registration data for API requests
type UserRegistration struct {
	Name     string `json:"name"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

// Register handles user registration
func Register(c *gin.Context) {
	// Check if this is a JSON API request
	contentType := c.GetHeader("Content-Type")
	isAPIRequest := contentType == "application/json"

	var name, username, email, password string

	if isAPIRequest {
		// Handle JSON request from React frontend
		var userData UserRegistration
		if err := c.ShouldBindJSON(&userData); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON data"})
			return
		}
		name = userData.Name
		username = userData.Username
		email = userData.Email
		password = userData.Password
	} else {
		// Handle form data from original web form
		name = c.PostForm("name")
		username = c.PostForm("username")
		email = c.PostForm("email")
		password = c.PostForm("password")
	}

	// Basic validation
	if username == "" || email == "" || password == "" {
		if isAPIRequest {
			c.JSON(http.StatusBadRequest, gin.H{"error": "All fields are required"})
		} else {
			c.HTML(http.StatusBadRequest, "register.html", gin.H{
				"error": "All fields are required",
			})
		}
		return
	}

	// Create new user
	userID, err := models.CreateUser(name, username, email, password)
	if err != nil {
		if isAPIRequest {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		} else {
			c.HTML(http.StatusBadRequest, "register.html", gin.H{
				"error": err.Error(),
			})
		}
		return
	}

	sessionToken, err := generateSessionToken()
	if err != nil {
		if isAPIRequest {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create session"})
		} else {
			c.HTML(http.StatusInternalServerError, "register.html", gin.H{
				"error": "Failed to create session",
			})
		}
		return
	}

	// Store the session
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

	if isAPIRequest {
		c.JSON(http.StatusOK, gin.H{
			"message": "Registration successful",
			"userId":  userID,
		})
	} else {
		// Redirect to the expenses page or wherever you want after registration
		c.Redirect(http.StatusSeeOther, "/expenses")
	}
}

// Login handles user authentication
func Login(c *gin.Context) {
	// Check if this is a JSON API request
	contentType := c.GetHeader("Content-Type")
	isAPIRequest := contentType == "application/json"

	var username, password string

	if isAPIRequest {
		// Handle JSON request from React frontend
		var credentials UserCredentials
		if err := c.ShouldBindJSON(&credentials); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON data"})
			return
		}
		username = credentials.Username
		password = credentials.Password
	} else {
		// Handle form data from original web form
		username = c.PostForm("username")
		password = c.PostForm("password")
	}

	// Basic validation
	if username == "" || password == "" {
		if isAPIRequest {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Username and password are required"})
		} else {
			c.HTML(http.StatusBadRequest, "login.html", gin.H{
				"error": "Username and password are required",
			})
		}
		return
	}

	// Get user
	user, err := models.GetUserByUsername(username)
	if err != nil {
		if isAPIRequest {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		} else {
			c.HTML(http.StatusUnauthorized, "login.html", gin.H{
				"error": "Invalid username or password",
			})
		}
		return
	}

	// Check password
	if !user.CheckPassword(password) {
		if isAPIRequest {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		} else {
			c.HTML(http.StatusUnauthorized, "login.html", gin.H{
				"error": "Invalid username or password",
			})
		}
		return
	}

	// Generate session token
	sessionToken, err := generateSessionToken()
	if err != nil {
		if isAPIRequest {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		} else {
			c.HTML(http.StatusInternalServerError, "login.html", gin.H{
				"error": "Internal server error",
			})
		}
		return
	}

	// Convert user.ID from int to string and store session
	middleware.Sessions[sessionToken] = strconv.Itoa(user.ID)

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

	if isAPIRequest {
		c.JSON(http.StatusOK, gin.H{
			"message": "Login successful",
			"userId":  user.ID,
		})
	} else {
		// Redirect to expenses page
		c.Redirect(http.StatusSeeOther, "/expenses")
	}
}

// Logout handles user logout
func Logout(c *gin.Context) {
	// Check if this is a JSON API request
	acceptHeader := c.GetHeader("Accept")
	isAPIRequest := acceptHeader == "application/json"

	// Get session token
	sessionToken, err := c.Cookie("session")
	if err == nil {
		// Remove session
		delete(middleware.Sessions, sessionToken)
	}

	// Clear cookie
	c.SetCookie("session", "", -1, "/", "", false, true)

	if isAPIRequest {
		c.JSON(http.StatusOK, gin.H{"message": "Logout successful"})
	} else {
		// Redirect to login page
		c.Redirect(http.StatusSeeOther, "/login")
	}
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
