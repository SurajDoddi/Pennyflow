package routes

import (
	"my-go-app/controllers"

	"github.com/gin-gonic/gin"
)

func UserRoutes(r *gin.Engine) {
	r.POST("/api/v1/users", controllers.CreateUser)
}
