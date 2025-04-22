# **PennyFlow**

## **Project Description**
**PennyFlow** is a personal finance management web application that helps users efficiently track and analyze their expenses with ease. Users can:

- **Record and Categorize** their daily expenses.
- **Visualize Spending Patterns** using charts and dashboards.
- **Securely Register and Login** with postgres authentication.
- **Manage Transactions** with add, edit, and delete functionality.
- **Gain Insights** from real-time financial analytics.

Built with a **React.js frontend**, **Go backend (Gin framework)**, and **PostgreSQL** database.

---

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


## **Setup and Installation**

### **Steps**

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/SurajDoddi/Pennyflow.git
    cd Pennyflow
    ```

2. **Install Frontend Dependencies and Build:**
    ```bash
    cd client
    npm install
    ```

3. **Run the Frontend Server:**
    ```bash
    npm start
    ```

4. **Navigate to Root Folder:**
    ```bash
    cd ../../
    ```

5. **Run the Backend Server:**
    ```bash
    cd server
    go run main.go
    ```

6. **Access the App:**
    - Open your browser and go to `http://localhost:3000`.

7. **View API Documentation (Optional):**
    - Use tools like Postman or Swagger to interact with the backend routes (e.g., `/api/register`, `/api/expenses`).
---