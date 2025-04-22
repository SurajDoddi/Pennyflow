# Sprint 4 Completion Report
 # git hub pull link - https://github.com/SurajDoddi/Pennyflow.git


## Completed Work
- Enhanced expense management (edit, delete functionality)
- Added expense analysis features (categorization, totals)
- Implemented comprehensive backend unit tests
- Created detailed API documentation
- Improved error handling and security

## Backend Unit Tests
We've implemented tests for:
- Auth handlers (register, login, logout)
- Expense handlers (get, create, update, delete)
- Analysis functionality
- Authentication middleware

## Backend API Documentation

### Dependencies
- Go 1.6+
- Gin web framework
- GORM for database operations
- PostgreSQL (production)

### Environment Setup
Create a `.env` file in the root directory with:
```
DB_HOST=localhost
DB_PORT="YOUR DEFAULT PORT"
DB_USER=postgres
DB_PASSWORD="YOUR PASSWORD"
DB_NAME="YOUR USERNAME"

```
Note: The `.env` file is not included in GitHub for security reasons.

### Running the server
Go to the server folder and use the following command to run the server - 

```bash
go run main.go
```

### API Documentation


### API Routes

#### Authentication
- `POST /register`: Register new user
  ```json
  {"name": "Full Name", "username": "username", "email": "user@example.com", "password": "password"}
  ```

- `POST /login`: Login user
  ```json
  {"username": "username", "password": "password"}
  ```

- `GET /logout`: Logout user

#### Expenses
- `GET /expenses`: Get all user expenses
  - Response: List of expenses with total amount

- `POST /expenses`: Create new expense
  ```json
  {
    "description": "Groceries",
    "amount": "45.67",
    "category": "Food",
    "payment_method": "Credit Card",
    "date": "2023-05-15",
    "time": "10:30"
  }
  ```

- `PUT /expenses/:id`: Update expense
  - Same format as POST request

- `DELETE /expenses/:id`: Delete expense

#### Analysis
- `GET /analysis`: Get expense analysis
  - Response: Expenses grouped by category with totals
  ```json
  {
    "categories": [
      {"name": "Food", "amount": 45.67},
      {"name": "Transportation", "amount": 35.50}
    ],
    "total": 81.17
  }
  ```

## Next Steps
1. Implement integration tests
2. Add more detailed analytics capabilities
3. Enhance security for the authentication system 