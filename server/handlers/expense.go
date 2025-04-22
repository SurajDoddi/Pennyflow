package handlers

import (
	"log"
	"net/http"
	"strconv"

	"pennyflow/models"

	"github.com/gin-gonic/gin"
)

// GetExpenses returns all expenses as JSON for the current user
func GetExpenses(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		log.Println("No userID found in context")
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	log.Printf("User ID: %v", userID)

	expenses, totalAmount, err := models.GetExpensesByUserID(userID.(int))
	if err != nil {
		log.Printf("Error fetching expenses: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch expenses"})
		return
	}

	userName, err := models.GetUserNameByID(userID.(int))
	if err != nil {
		log.Printf("Error fetching user name: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user name"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"expenses":    expenses,
		"totalAmount": totalAmount,
		"userName":    userName,
	})
}

// CreateExpense adds a new expense (expects JSON payload)
func CreateExpense(c *gin.Context) {
	userID := c.GetInt("userID")

	var req struct {
		Description   string `json:"description"`
		Amount        string `json:"amount"`
		Category      string `json:"category"`
		PaymentMethod string `json:"payment_method"`
		Date          string `json:"date"` // YYYY-MM-DD
		Time          string `json:"time"` // HH:MM or HH:MM:SS
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
		return
	}

	if req.Description == "" || req.Amount == "" || req.Category == "" || req.PaymentMethod == "" || req.Date == "" || req.Time == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "All fields are required"})
		return
	}

	amount, err := strconv.ParseFloat(req.Amount, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid amount"})
		return
	}

	if len(req.Time) == 5 {
		req.Time += ":00"
	}

	datetimeStr := req.Date + " " + req.Time

	_, err = models.AddExpense(userID, req.Description, amount, req.Category, req.PaymentMethod, datetimeStr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add expense"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Expense added successfully"})
}

// DeleteExpense deletes an expense by ID (from URL param)
func DeleteExpense(c *gin.Context) {
	userID := c.GetInt("userID")
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid expense ID"})
		return
	}

	if err := models.DeleteExpense(id, userID); err != nil {
		log.Printf("Error deleting expense: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete expense"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Expense deleted successfully"})
}

// UpdateExpense updates an existing expense (expects JSON payload)
func UpdateExpense(c *gin.Context) {
	userID := c.GetInt("userID")
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid expense ID"})
		return
	}

	var req struct {
		Description   string `json:"description"`
		Amount        string `json:"amount"`
		Category      string `json:"category"`
		PaymentMethod string `json:"payment_method"`
		Date          string `json:"date"` // YYYY-MM-DD
		Time          string `json:"time"` // HH:MM or HH:MM:SS
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
		return
	}

	if req.Description == "" || req.Amount == "" || req.Category == "" || req.PaymentMethod == "" || req.Date == "" || req.Time == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "All fields are required"})
		return
	}

	amount, err := strconv.ParseFloat(req.Amount, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid amount"})
		return
	}

	if len(req.Time) == 5 {
		req.Time += ":00"
	}

	datetimeStr := req.Date + " " + req.Time

	err = models.UpdateExpense(id, userID, req.Description, amount, req.Category, req.PaymentMethod, datetimeStr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update expense"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Expense updated successfully"})
}
