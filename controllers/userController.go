package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Temporary in-memory storage
var users []map[string]string

func CreateUser(c *gin.Context) {
	var user map[string]string
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	users = append(users, user) // Store user in memory (no DB yet)
	c.JSON(http.StatusCreated, gin.H{"message": "User created", "user": user})
}
