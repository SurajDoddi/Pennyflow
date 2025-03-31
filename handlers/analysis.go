package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AnalysisPage(c *gin.Context) {
	// Example data (replace with real data)
	expenseData := []map[string]interface{}{
		{"category": "Food", "amount": 150.0},
		{"category": "Transport", "amount": 80.0},
	}

	dataJSON, _ := json.Marshal(expenseData)

	c.HTML(http.StatusOK, "analysis.html", gin.H{
		"UserName":    "TestUser",
		"ExpenseData": string(dataJSON),
	})
}
