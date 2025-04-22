package handlers

import (
	"path/filepath"

	"github.com/gin-gonic/gin"
)

// HomePage renders the home page
func HomePage(c *gin.Context) {
	buildPath, _ := filepath.Abs("./client/build")
	c.File(filepath.Join(buildPath, "index.html"))
}

// LoginPage renders the login page
func LoginPage(c *gin.Context) {
	buildPath, _ := filepath.Abs("./client/build")
	c.File(filepath.Join(buildPath, "login.html"))
}

// RegisterPage renders the registration page
func RegisterPage(c *gin.Context) {
	buildPath, _ := filepath.Abs("./client/build")
	c.File(filepath.Join(buildPath, "register.html"))
}

// AboutPage renders the about page
func AboutPage(c *gin.Context) {
	buildPath, _ := filepath.Abs("./client/build")
	c.File(filepath.Join(buildPath, "about.html"))
}

// AddExpensePage renders the add expense page
func Expenses(c *gin.Context) {
	buildPath, _ := filepath.Abs("./client/build")
	c.File(filepath.Join(buildPath, "expenses.html"))
}

// AddExpensePage renders the add expense page
func AddExpensePage(c *gin.Context) {
	buildPath, _ := filepath.Abs("./client/build")
	c.File(filepath.Join(buildPath, "add_expense.html"))
}
