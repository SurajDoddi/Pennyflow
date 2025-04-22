# PennyFlow - Personal Finance Management Application

![PennyFlow Logo](/static/assets/logo_Penny_Flow.png)

## Overview

PennyFlow is an enterprise-grade personal finance management application designed to provide users with a complete solution for tracking expenses and generating meaningful financial insights. The platform is built with a focus on modern frontend architecture, secure authentication, and responsive design, delivering a seamless user experience.

## Command to Execute Front-end
Go to the client folder and use the following command to run the client - 
- **To build**
```bash
npm run build
```

- **To start the front-end**
```bash
npm run start
```

## Core Features

### Financial Management
- **Expense Tracking and Categorization**: Record, classify, and manage expenses using custom categories and payment methods.
- **Financial Dashboard**: Access a centralized view of key financial metrics, including total spending and category-wise distributions.
- **Analytical Reporting**: Generate visual reports and identify patterns using interactive charts and time-based analytics.
- **Secure Authentication**: Implements JWT-based authentication with protected routes and session control.

## Technical Architecture

### Frontend Technology Stack
- **Framework**: React.js (v18.x)
- **State Management**: React Hooks (`useState`, `useEffect`, `useContext`)
- **Routing**: React Router DOM v6
- **Visualization**: Chart.js with React wrapper
- **Styling**: CSS-in-JS with modular component styling
- **Iconography**: Font Awesome
- **Testing**: Cypress for end-to-end testing

### Backend Integration
- RESTful API interactions using custom utility functions
- Token-based user authentication (JWT)
- Comprehensive error handling and response parsing
- CORS configuration for cross-origin communication

## Application Modules

### Authentication Module
**Files**: `Login.js`, `Register.js`, `utils/api.js`  
**Key Functions**:
- `login(userData)`: Validates and authenticates user credentials.
- `register(userData)`: Creates new user accounts with field validation.
- `logout()`: Ends the session and removes tokens.
- `getExpenses()`: Fetches expense records tied to the authenticated user.

### Expense Management Module
**Files**: `Expenses.js`, `AddExpense.js`  
**Key Functions**:
- `handleAddExpense(expenseData)`: Adds new expense entries.
- `handleUpdateExpense(id, expenseData)`: Edits existing expense entries.
- `handleDeleteExpense(id)`: Deletes expenses with user confirmation.
- `fetchExpenses(filters)`: Retrieves filtered expenses.

### Analytics Module
**File**: `Analysis.js`  
**Key Functions**:
- `createCategoryChart()`: Pie chart for expense categories.
- `createTrendChart()`: Bar chart for monthly trends.
- `createPaymentMethodChart()`: Doughnut chart for payment methods.
- `calculateKeyMetrics()`: Computes summary statistics such as totals and averages.

## User Interface Components

### Navigation
- Responsive, context-aware navigation bar
- Dynamic links and dropdowns based on login state
- Collapsible layout for mobile views

### Form System
- Controlled input elements with validation
- Icon-enhanced fields and real-time feedback
- Uniform error handling for a consistent experience

### Visualization
- Interactive, responsive charts powered by Chart.js
- Unified color scheme and live data updates
- Tooltips and legends for enhanced clarity

## Testing Infrastructure

### Cypress End-to-End Testing
**Directory**: `/cypress/e2e/`  
**Test Suites**:
- `login.cy.js`: Authentication validation
- `register.cy.js`: Account registration scenarios
- `expenses.cy.js`: Expense management flows
- `analysis.cy.js`: Data visualization validations

### Detailed Test Scenarios

#### Authentication
- Valid and invalid login attempts
- Field validation and redirection checks
- Session persistence and logout operations

#### Registration
- Form validation and duplicate handling
- Password policy enforcement
- Navigation between login and registration

#### Expense Management
- Add, edit, and delete operations
- Filtering and sorting functionalities
- Total calculation and pagination tests

#### Analysis
- Chart rendering accuracy
- Metric validation
- Empty state and dynamic refresh testing

### Running Cypress Tests
```bash
# Run all tests
npm run cypress:run

# Run specific test files
npm run cypress:run --spec "cypress/e2e/login.cy.js"
npm run cypress:open  # Launch Cypress Test Runner
