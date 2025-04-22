PennyFlow - Personal Finance Management Application
Overview
PennyFlow is a complete personal finance management system designed to help users monitor and organize their expenses efficiently. It includes a modern React.js frontend for an intuitive user experience and a secure Golang backend for robust data processing and API services. The app supports core financial features like expense tracking, user authentication, analytics, and reporting.

Frontend Documentation
Technologies Used
Framework: React.js (v18+)

Routing: React Router v6

State Management: React Hooks (useState, useContext, useEffect)

Charts: Chart.js integrated through React wrapper

Styling: CSS-in-JS (with modular components)

Icon Set: Font Awesome

Testing: Cypress (for end-to-end testing)

How to Run Frontend
Navigate to the frontend project directory

Install dependencies:

bash
Copy
Edit
npm install
Build the project:

bash
Copy
Edit
npm run build
Start the development server:

bash
Copy
Edit
npm run start
Core Features (Frontend)
Expense Tracking
Users can add, update, and delete expenses

Expenses are categorized and associated with payment methods

Analytics
Real-time charts showing spending patterns

Pie chart: category-wise breakdown

Bar chart: monthly trends

Doughnut chart: payment method usage

Authentication
Users can register and log in

Protected routes are implemented using JWT

Session management and logout are fully functional

Component Modules
Authentication Module
Files: Login.js, Register.js, utils/api.js
Key Functions:

login(userData)

register(userData)

logout()

getExpenses()

Expense Management Module
Files: Expenses.js, AddExpense.js
Key Functions:

handleAddExpense(expenseData)

handleUpdateExpense(id, expenseData)

handleDeleteExpense(id)

fetchExpenses(filters)

Analytics Module
File: Analysis.js
Key Functions:

createCategoryChart()

createTrendChart()

createPaymentMethodChart()

calculateKeyMetrics()

UI Features
Fully responsive design

Reusable form components with validation

Interactive Chart.js graphs

Dynamic menus and context-aware navigation

Cypress Testing
How to Run Cypress Tests:
bash
Copy
Edit
npm run cypress:run
npm run cypress:run --spec "cypress/e2e/login.cy.js"
npm run cypress:open
Test Files:
login.cy.js: Tests login process

register.cy.js: Tests registration scenarios

expenses.cy.js: Tests adding, editing, deleting expenses

analysis.cy.js: Validates charts and data rendering

Backend Documentation (Sprint 4)
Repository
GitHub: https://github.com/SurajDoddi/Pennyflow.git

Completed Work
Expense management (create, edit, delete)

Categorized expense analysis

Backend API documentation

Full unit testing for handlers

Secure JWT-based authentication

Technologies Used (Backend)
Language: Go (Golang 1.6+)

Framework: Gin Gonic

Database: PostgreSQL

ORM: GORM

Authentication: JSON Web Tokens (JWT)

Environment Setup
Create a .env file in the backend project folder with the following variables:

ini
Copy
Edit
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=pennyflow_db
Note: .env is intentionally excluded from GitHub to protect sensitive data.

How to Run Backend
Open a terminal inside the backend folder

Run the server using:

bash
Copy
Edit
go run main.go
API Documentation
Authentication Endpoints
POST /register
Registers a new user.

json
Copy
Edit
{
  "name": "Full Name",
  "username": "username",
  "email": "user@example.com",
  "password": "password"
}
POST /login
Logs the user in.

json
Copy
Edit
{
  "username": "username",
  "password": "password"
}
GET /logout
Logs the user out.

Expense Management Endpoints
GET /expenses
Returns all expenses for the authenticated user.

POST /expenses
Creates a new expense.

json
Copy
Edit
{
  "description": "Groceries",
  "amount": "45.67",
  "category": "Food",
  "payment_method": "Credit Card",
  "date": "2023-05-15",
  "time": "10:30"
}
PUT /expenses/:id
Updates an expense by ID.

DELETE /expenses/:id
Deletes an expense by ID.

Analysis Endpoint
GET /analysis
Returns expense data grouped by category.
Example response:

json
Copy
Edit
{
  "categories": [
    {"name": "Food", "amount": 45.67},
    {"name": "Transportation", "amount": 35.50}
  ],
  "total": 81.17
}
Backend Unit Testing
Registration/Login/Logout

Expense CRUD operations

Middleware (JWT check)

Data analysis grouping and totals