package handlers

import (
	"log"
	"net/http"
	"strconv"

	"pennyflow/models"
	"time"

	"github.com/gin-gonic/gin"
)

// GetExpenses displays all expenses for the current user
func GetExpenses(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		log.Println("No userID found in context")
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	log.Printf("User ID: %v", userID)

	expenses, totalAmount, err := models.GetExpensesByUserID(userID.(int)) // Cast userID to int
	if err != nil {
		log.Printf("Error fetching expenses: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch expenses"})
		return
	}

	// Create a slice to hold expenses with formatted created_at (date + time)
	var expensesWithFormattedDate []struct {
		ID          int
		Description string
		Amount      float64
		CreatedAt   time.Time // Single field for formatted created_at
	}

	// Process expenses
	for _, exp := range expenses {
		// Ensure the displayed date and time are the user-provided ones
		expensesWithFormattedDate = append(expensesWithFormattedDate, struct {
			ID          int
			Description string
			Amount      float64
			CreatedAt   time.Time
		}{
			ID:          exp.ID,
			Description: exp.Description,
			Amount:      exp.Amount,
			CreatedAt:   exp.CreatedAt,
		})
	}

	// Return the list of expenses with merged date and time
	c.HTML(http.StatusOK, "expenses.html", gin.H{
		"expenses":    expensesWithFormattedDate,
		"totalAmount": totalAmount,
	})
}

// CreateExpense adds a new expense
func CreateExpense(c *gin.Context) {
	// Get user from context
	userID := c.GetInt("userID")

	// Get form data
	description := c.PostForm("description")
	amountStr := c.PostForm("amount")
	dateStr := c.PostForm("date") // Get the date as a string (YYYY-MM-DD)
	timeStr := c.PostForm("time") // Get the time as a string (HH:MM)

	// Log date and time inputs
	log.Printf("Received date: %s, time: %s", dateStr, timeStr)

	// Validate inputs
	if description == "" || amountStr == "" || dateStr == "" || timeStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Description, amount, date, and time are required"})
		return
	}

	// Convert amount to float
	amount, err := strconv.ParseFloat(amountStr, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid amount"})
		return
	}

	// Ensure that time has seconds: if not, append ":00"
	if len(timeStr) == 5 { // HH:MM format
		timeStr += ":00"
	}

	// Merge date and time into a single datetime string
	datetimeStr := dateStr + " " + timeStr

	// Add expense to the database
	_, err = models.AddExpense(userID, description, amount, datetimeStr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Redirect back to expenses page
	c.Redirect(http.StatusSeeOther, "/expenses")
}

// DeleteExpense removes an expense
func DeleteExpense(c *gin.Context) {
	// Get user from context
	userID := c.GetInt("userID")

	// Get expense ID from URL
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid expense ID"})
		return
	}

	// Delete the expense
	err = models.DeleteExpense(id, userID)
	if err != nil {
		log.Printf("Error deleting expense: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Expense deleted successfully"})
}

// UpdateExpense modifies an existing expense
func UpdateExpense(c *gin.Context) {
	// Get user from context
	userID := c.GetInt("userID")

	// Get expense ID from URL
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid expense ID"})
		return
	}

	// Get form data
	description := c.PostForm("description")
	amountStr := c.PostForm("amount")
	dateStr := c.PostForm("date") // Get the date as a string (YYYY-MM-DD)
	timeStr := c.PostForm("time") // Get the time as a string (HH:MM:SS)

	// Validate inputs
	if description == "" || amountStr == "" || dateStr == "" || timeStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Description, amount, date, and time are required"})
		return
	}

	// Convert amount to float
	amount, err := strconv.ParseFloat(amountStr, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid amount"})
		return
	}

	// Ensure that time has seconds: if not, append ":00"
	if len(timeStr) == 5 { // HH:MM format
		timeStr += ":00"
	}

	// Merge date and time into a single datetime string
	datetimeStr := dateStr + " " + timeStr

	// Update the expense, pass createdAt as a string
	err = models.UpdateExpense(id, userID, description, amount, datetimeStr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Expense updated successfully"})
}
