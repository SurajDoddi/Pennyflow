🚀 Sprint 2 - Backend API Documentation 🛠️
Welcome to the backend API documentation for Sprint 2! This guide outlines our database connection, routes, and helper functions. Let's dive in! 🏊‍♂️

🔌 Database Connection
Our trusty ConnectDB() function establishes a connection to PostgreSQL:

🔐 Uses environment variables for secure access

🚨 Logs fatal errors if things go sideways

🛣️ Routes
1. 🏠 Home Page
GET /

Serves up our main index.html file

2. 🔑 Login Page
GET /login

Delivers the login.html file

3. 📝 Registration Page
GET /register

Hands over the register.html file

4. ℹ️ About Us Page
GET /about-us

Presents the about.html file

5. 👤 User Registration
POST /register

Handles new user sign-ups

📦 Request Body:

username: string (required, alphanumeric)

email: string (required)

password: string (required, alphanumeric)

📬 Responses:

200 OK: Welcome aboard! 🎉

400 Bad Request: Oops, something's missing or incorrect 😕

500 Internal Server Error: Houston, we have a problem 🚀💥

6. 🔓 User Login
POST /login

Gets users into their accounts

📦 Request Body:

username: string (required)

password: string (required)

📬 Responses:

200 OK: You're in! 🎊

400 Bad Request: Forgot something? 🤔

401 Unauthorized: Who goes there? 🕵️‍♂️

500 Internal Server Error: Gremlins in the system 👾

7. 💰 Expenses List
GET /expenses

Fetches and displays the user's expenses

📬 Responses:

200 OK: Here's your spending report 📊

500 Internal Server Error: Our piggy bank is stuck 🐷

🛠️ Helper Functions
isAlphanumeric
Checks if a string is alphanumeric

Parameters:

s: string

Returns: bool (true for alphanumeric, false otherwise)

🌳 Environment Variables
Don't forget to set these up!

DB_HOST: Where's the party? 🎉

DB_PORT: Which door? 🚪

DB_USER: VIP name 🕴️

DB_PASSWORD: Secret handshake 🤝

DB_NAME: Party theme 🎭

⚙️ Server Configuration
Port: 8080 (We're all ears! 👂)

Static files: Served fresh from "./client/build/static" 📁