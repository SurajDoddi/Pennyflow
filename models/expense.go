package models

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"pennyflow/db"
	"time"
)

// Expense represents an expense record
type Expense struct {
	ID            int
	UserID        int
	Description   string
	Amount        float64
	Category      string
	PaymentMethod string
	CreatedAt     time.Time
}

// AddExpense adds a new expense to the database
func AddExpense(userID int, description string, amount float64, category string, paymentMethod string, createdAt string) (int, error) {
	// Validate input
	if description == "" {
		return 0, errors.New("description cannot be empty")
	}
	if amount <= 0 {
		return 0, errors.New("amount must be greater than zero")
	}
	if category == "" {
		return 0, errors.New("category cannot be empty")
	}
	if paymentMethod == "" {
		return 0, errors.New("payment method cannot be empty")
	}

	// Prepare and execute the SQL statement
	var expenseID int
	err := db.DB.QueryRow(
		"INSERT INTO expenses (user_id, description, amount, category, payment_method, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
		userID, description, amount, category, paymentMethod, createdAt,
	).Scan(&expenseID)

	if err != nil {
		log.Printf("Error adding expense: %v", err)
		return 0, fmt.Errorf("failed to add expense: %w", err)
	}

	log.Printf("Expense added: ID=%d, UserID=%d, Description=%s, Amount=%.2f, Category=%s, PaymentMethod=%s, CreatedAt=%s",
		expenseID, userID, description, amount, category, paymentMethod, createdAt)
	return expenseID, nil
}

// GetExpensesByUserID retrieves all expenses for a specific user
func GetExpensesByUserID(userID int) ([]Expense, float64, error) {
	rows, err := db.DB.Query(
		"SELECT id, user_id, description, amount, category, payment_method, created_at FROM expenses WHERE user_id = $1 ORDER BY created_at DESC",
		userID,
	)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var expenses []Expense
	var totalAmount float64

	for rows.Next() {
		var exp Expense
		if err := rows.Scan(&exp.ID, &exp.UserID, &exp.Description, &exp.Amount, &exp.Category, &exp.PaymentMethod, &exp.CreatedAt); err != nil {
			return nil, 0, err
		}
		expenses = append(expenses, exp)
		totalAmount += exp.Amount
	}

	if err = rows.Err(); err != nil {
		return nil, 0, err
	}

	return expenses, totalAmount, nil
}

// GetExpenseByID retrieves a single expense by ID
func GetExpenseByID(id int) (*Expense, error) {
	expense := &Expense{}
	err := db.DB.QueryRow(
		"SELECT id, user_id, description, amount, category, payment_method, created_at FROM expenses WHERE id = $1",
		id,
	).Scan(&expense.ID, &expense.UserID, &expense.Description, &expense.Amount, &expense.Category, &expense.PaymentMethod, &expense.CreatedAt)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, errors.New("expense not found")
		}
		return nil, err
	}
	log.Println(expense.CreatedAt)
	return expense, nil
}

// DeleteExpense removes an expense from the database by its ID and ensures it belongs to the user
func DeleteExpense(id int, userID int) error {
	// First check if the expense exists and belongs to the user
	expense, err := GetExpenseByID(id)
	if err != nil {
		return err
	}

	if expense.UserID != userID {
		return errors.New("unauthorized: expense belongs to another user")
	}

	// Delete the expense
	_, err = db.DB.Exec("DELETE FROM expenses WHERE id = $1", id)
	if err != nil {
		log.Printf("Error deleting expense: %v", err)
		return err
	}

	log.Printf("Expense deleted: ID=%d, UserID=%d", id, userID)
	return nil
}

// UpdateExpense modifies an existing expense in the database
func UpdateExpense(id int, userID int, description string, amount float64, category string, paymentMethod string, createdAt string) error {
	// First check if the expense exists and belongs to the user
	expense, err := GetExpenseByID(id)
	if err != nil {
		return err
	}

	if expense.UserID != userID {
		return errors.New("unauthorized: expense belongs to another user")
	}

	// Validate input
	if description == "" {
		return errors.New("description cannot be empty")
	}
	if amount <= 0 {
		return errors.New("amount must be greater than zero")
	}
	if category == "" {
		return errors.New("category cannot be empty")
	}
	if paymentMethod == "" {
		return errors.New("payment method cannot be empty")
	}

	// Update the expense with the createdAt field (now as a string)
	_, err = db.DB.Exec(
		"UPDATE expenses SET description = $1, amount = $2, category = $3, payment_method = $4, created_at = $5 WHERE id = $6 AND user_id = $7",
		description, amount, category, paymentMethod, createdAt, id, userID,
	)
	if err != nil {
		log.Printf("Error updating expense: %v", err)
		return err
	}

	log.Printf("Expense updated: ID=%d, UserID=%d, Description=%s, Amount=%.2f, Category=%s, PaymentMethod=%s, CreatedAt=%s",
		id, userID, description, amount, category, paymentMethod, createdAt)
	return nil
}
