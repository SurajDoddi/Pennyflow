# 📊 PennyFlow - Personal Finance Management Application

**PennyFlow** is a comprehensive personal finance management system built to help users monitor, manage, and analyze their expenses effectively. It features a modern **React.js frontend** for an intuitive user experience and a secure **Golang backend** for robust data processing and API services. The application includes expense tracking, authentication, and insightful analytics.

---

### For more information of frontend and backend, we have special readme files in the documentation folder with the names - Sprint4_frontend.md, Sprint4_backend.md.


## 🖥️ Frontend Documentation

### 🚀 Technologies Used

- **Framework:** React.js (v18+)
- **Routing:** React Router v6
- **State Management:** React Hooks (`useState`, `useContext`, `useEffect`)
- **Charts:** Chart.js (React wrapper)
- **Styling:** CSS-in-JS with modular components
- **Testing:** Cypress (E2E testing)

### ▶️ How to Run Frontend
```bash
    # Navigate to the frontend directory
    cd frontend

    # Install dependencies
    npm install

    # Build the project
    npm run build

    # Start the development server
    npm start
```

### ⚙️ Core Features

- **Expense Tracking**: Add, update, and delete expenses with categorization and payment methods.
- **Analytics**: Real-time visualization using Chart.js:
  - Pie chart: Category-wise breakdown
  - Bar chart: Monthly trends
  - Doughnut chart: Payment method usage
- **Authentication**: login, registration, session management, and protected routes.

### 📁 Component Modules

#### 🔐 Authentication Module
- **Files**: `Login.js`, `Register.js`, `utils/api.js`
- **Key Functions**:
  - `login(userData)`
  - `register(userData)`
  - `logout()`
  - `getExpenses()`

#### 💸 Expense Management Module
- **Files**: `Expenses.js`, `AddExpense.js`
- **Key Functions**:
  - `handleAddExpense(expenseData)`
  - `handleUpdateExpense(id, expenseData)`
  - `handleDeleteExpense(id)`
  - `fetchExpenses(filters)`

#### 📈 Analytics Module
- **File**: `Analysis.js`
- **Key Functions**:
  - `createCategoryChart()`
  - `createTrendChart()`
  - `createPaymentMethodChart()`
  - `calculateKeyMetrics()`

### 💡 UI Features

- Fully responsive design  
- Modular and reusable components  
- Form validation  
- Interactive and dynamic chart rendering  
- Context-aware navigation and menus  

---

## ✅ Cypress Testing

### ▶️ Run Cypress Tests

    npm run cypress:run
    npm run cypress:run --spec "cypress/e2e/login.cy.js"
    npm run cypress:open

### 🧪 Test Files

- `login.cy.js` – Validates login functionality  
- `register.cy.js` – Tests user registration  
- `expenses.cy.js` – Verifies add, edit, delete operations  
- `analysis.cy.js` – Checks chart rendering and analytics 
- `about.cy.js` – Tests the “About Us” page content and layout
- `add_expense.cy.js` – Verifies the add-expense form, validations, and success messages
- `index.cy.js` – Entry point for Cypress tests; typically used to configure or bootstrap


---

## 🔧 Backend Documentation

### 📦 Repository

GitHub: https://github.com/SurajDoddi/Pennyflow.git

### ✅ Completed Features

- Secure authentication with Postgres 
- Categorized expense analytics  
- API documentation  
- Unit testing for all handlers and middleware  

### 🛠️ Technologies Used

- **Language**: Go (Golang 1.6+)
- **Framework**: Gin Gonic  
- **Database**: PostgreSQL  
- **ORM**: GORM  

### ⚙️ Environment Setup

Create a `.env` file in the backend directory:

    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=your_password
    DB_NAME=pennyflow_db

> ⚠️ The `.env` file is excluded from version control for security purposes.

### ▶️ How to Run Backend
```bash
    # Navigate to backend directory
    cd backend

    # Run the Go server
    go run main.go
```

---

## 📡 API Documentation

### 🔐 Authentication Endpoints

#### POST `/register`

    {
      "name": "Full Name",
      "username": "username",
      "email": "user@example.com",
      "password": "password"
    }

#### POST `/login`

    {
      "username": "username",
      "password": "password"
    }

#### GET `/logout`

Logs out the user.

---

### 💸 Expense Management Endpoints

#### GET `/expenses`

Returns all expenses for the authenticated user.

#### POST `/expenses`

    {
      "description": "Groceries",
      "amount": "45.67",
      "category": "Food",
      "payment_method": "Credit Card",
      "date": "2023-05-15",
      "time": "10:30"
    }

#### PUT `/expenses/:id`

Updates expense by ID

#### DELETE `/expenses/:id`

Deletes expense by ID

---

### 📊 Analysis Endpoint

#### GET `/analysis`

    {
      "categories": [
        {"name": "Food", "amount": 45.67},
        {"name": "Transportation", "amount": 35.50}
      ],
      "total": 81.17
    }

---

## 🧪 Backend Unit Testing

- Authentication: Register, login, logout  
- Analytics grouping and totals  

---

© 2025 PennyFlow | Designed with 💡 and built with Go & React
