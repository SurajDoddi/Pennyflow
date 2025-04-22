import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getExpenses, logout, deleteExpense, updateExpense } from '../utils/api';

function Expenses() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userName, setUserName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const dropdownRef = useRef(null);
  const [deleteInProgress, setDeleteInProgress] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState('');
  const [deleteError, setDeleteError] = useState('');
  
  // New state variables for editing
  const [editingExpense, setEditingExpense] = useState(null);
  const [editFormData, setEditFormData] = useState({
    description: '',
    amount: '',
    category: '',
    payment_method: '',
    date: '',
    time: ''
  });
  const [editSuccess, setEditSuccess] = useState('');
  const [editError, setEditError] = useState('');
  const [submittingEdit, setSubmittingEdit] = useState(false);
  
  useEffect(() => {
    // Fetch expense data
    const fetchExpensesData = async () => {
      try {
        setLoading(true);
        const data = await getExpenses();
        
        setExpenses(data.expenses || []);
        setUserName(data.userName || 'User');
        
        // Calculate total amount
        const total = (data.expenses || []).reduce(
          (sum, expense) => sum + parseFloat(expense.Amount || 0), 
          0
        );
        setTotalAmount(total);
      } catch (error) {
        console.error('Error fetching expenses:', error);
        // If not authorized, redirect to login
        if (error.message && error.message.includes('401')) {
          navigate('/login');
          return;
        }
        setError('Network error. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchExpensesData();
    
    // Handle click outside of dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate]);
  
  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to home page after logout
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      // If logout fails, still try to redirect to home
      navigate('/');
    }
  };
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  const handleDeleteNavigation = () => {
    navigate('/delete_expense');
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense? This action cannot be undone.')) {
      setDeleteInProgress(id);
      setDeleteError('');
      setDeleteSuccess('');
      
      try {
        await deleteExpense(id);
        setDeleteSuccess('Expense deleted successfully!');
        
        // Remove the deleted expense from the state
        setExpenses(expenses.filter(expense => expense.ID !== id));
        
        // Recalculate total
        const newTotal = expenses
          .filter(expense => expense.ID !== id)
          .reduce((sum, expense) => sum + parseFloat(expense.Amount || 0), 0);
        setTotalAmount(newTotal);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setDeleteSuccess('');
        }, 3000);
      } catch (error) {
        console.error('Error deleting expense:', error);
        setDeleteError(`Failed to delete expense: ${error.message}`);
        
        // Clear error message after 3 seconds
        setTimeout(() => {
          setDeleteError('');
        }, 3000);
      } finally {
        setDeleteInProgress(null);
      }
    }
  };
  
  const handleEditClick = (expense) => {
    // Parse the date and time from CreatedAt
    const createdDate = new Date(expense.CreatedAt);
    const date = createdDate.toISOString().split('T')[0]; // YYYY-MM-DD
    const time = createdDate.toTimeString().substring(0, 5); // HH:MM
    
    setEditingExpense(expense.ID);
    setEditFormData({
      description: expense.Description,
      amount: expense.Amount.toString(),
      category: expense.Category,
      payment_method: expense.PaymentMethod,
      date: date,
      time: time
    });
  };
  
  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleEditCancel = () => {
    setEditingExpense(null);
    setEditError('');
  };
  
  const handleEditSubmit = async (id) => {
    setSubmittingEdit(true);
    setEditError('');
    setEditSuccess('');
    
    try {
      await updateExpense(id, editFormData);
      setEditSuccess('Expense updated successfully!');
      
      // Update the expense in the local state
      const updatedExpenses = expenses.map(expense => {
        if (expense.ID === id) {
          // Create a new date object from the form data
          const updatedDate = new Date(`${editFormData.date}T${editFormData.time}`);
          
          return {
            ...expense,
            Description: editFormData.description,
            Amount: parseFloat(editFormData.amount),
            Category: editFormData.category,
            PaymentMethod: editFormData.payment_method,
            CreatedAt: updatedDate.toISOString()
          };
        }
        return expense;
      });
      
      setExpenses(updatedExpenses);
      
      // Recalculate total
      const newTotal = updatedExpenses.reduce(
        (sum, expense) => sum + parseFloat(expense.Amount || 0), 
        0
      );
      setTotalAmount(newTotal);
      
      // Exit edit mode
      setEditingExpense(null);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setEditSuccess('');
      }, 3000);
    } catch (error) {
      console.error('Error updating expense:', error);
      setEditError(`Failed to update expense: ${error.message}`);
    } finally {
      setSubmittingEdit(false);
    }
  };
  
  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="expenses-page">
      <header className="navbar">
        <div className="nav-left">
          <img src="/static/assets/logo_Penny_Flow.png" alt="PennyFlow Logo" className="logo" />
          <div className="title-container">
            <h1 className="page-title">Penny Flow</h1>
            <p className="page-subtitle">Track and Manage Your Expenses</p>
          </div>
        </div>

        <div className="nav-right">
          <div className="user-dropdown" ref={dropdownRef}>
            <button className="user-button" onClick={toggleDropdown}>
              <i className="fa fa-user-circle"></i>
              <span className="user-name">{userName}</span>
              <i className="fa fa-chevron-down"></i>
            </button>

            <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
              <Link to="/analysis" className="dropdown-item">
                <i className="fa fa-chart-bar"></i> Analysis
              </Link>
              <button onClick={handleLogout} className="dropdown-item">
                <i className="fa fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="expenses-header">
          <h2 className="section-title">Your Expenses</h2>
          <div className="action-buttons">
            <Link to="/add_expense" className="cta-button">
              <i className="fa fa-plus"></i> Add New Expense
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <i className="fa fa-spinner fa-spin"></i>
            <span>Loading expenses...</span>
          </div>
        ) : error ? (
          <div className="error-message">
            <i className="fa fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        ) : expenses.length === 0 ? (
          <div className="no-expenses">
            <i className="fa fa-receipt fa-3x"></i>
            <h3>No expenses found</h3>
            <p>Start tracking your expenses by adding a new one!</p>
            <Link to="/add_expense" className="cta-button">Add Your First Expense</Link>
          </div>
        ) : (
          <div className="expenses-container">
            <div className="table-container">
              <table className="expenses-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Payment Method</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense.ID}>
                      {editingExpense === expense.ID ? (
                        // Edit form row
                        <>
                          <td>
                            <input
                              type="text"
                              name="description"
                              value={editFormData.description}
                              onChange={handleEditChange}
                              className="edit-input"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="amount"
                              value={editFormData.amount}
                              onChange={handleEditChange}
                              className="edit-input"
                              step="0.01"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="category"
                              value={editFormData.category}
                              onChange={handleEditChange}
                              className="edit-input"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="payment_method"
                              value={editFormData.payment_method}
                              onChange={handleEditChange}
                              className="edit-input"
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              name="date"
                              value={editFormData.date}
                              onChange={handleEditChange}
                              className="edit-input"
                            />
                            <input
                              type="time"
                              name="time"
                              value={editFormData.time}
                              onChange={handleEditChange}
                              className="edit-input"
                            />
                          </td>
                          <td className="action-cell">
                            <div className="edit-actions">
                              <button
                                onClick={() => handleEditSubmit(expense.ID)}
                                disabled={submittingEdit}
                                className="save-button"
                              >
                                <i className="fa fa-save"></i>
                              </button>
                              <button
                                onClick={handleEditCancel}
                                className="cancel-button"
                              >
                                <i className="fa fa-times"></i>
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        // Display row
                        <>
                          <td>{expense.Description}</td>
                          <td className="amount-cell">₹{parseFloat(expense.Amount).toFixed(2)}</td>
                          <td>{expense.Category}</td>
                          <td>{expense.PaymentMethod}</td>
                          <td>{formatDate(expense.CreatedAt)}</td>
                          <td className="action-cell">
                            <div className="row-actions">
                              <button
                                onClick={() => handleEditClick(expense)}
                                className="action-button edit-button"
                                title="Edit"
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                onClick={() => handleDelete(expense.ID)}
                                className="action-button delete-button"
                                disabled={deleteInProgress === expense.ID}
                                title="Delete"
                              >
                                {deleteInProgress === expense.ID ? (
                                  <i className="fa fa-spinner fa-spin"></i>
                                ) : (
                                  <i className="fa fa-trash"></i>
                                )}
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="summary-section">
              <div className="total-expenses">
                <span className="total-label">Total Expenses:</span>
                <span className="total-amount">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {(deleteSuccess || deleteError || editSuccess || editError) && (
              <div className={`alert ${deleteSuccess || editSuccess ? 'alert-success' : 'alert-error'}`}>
                {deleteSuccess || editSuccess || deleteError || editError}
              </div>
            )}
          </div>
        )}
      </main>

      <footer>
        &copy; 2025 PennyFlow. All Rights Reserved.
      </footer>
      
      {/* Include the CSS */}
      <link rel="stylesheet" href="/static/css/expenses.css" />
      
      {/* Include Font Awesome via React Helmet or similar */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        integrity="sha512-..."
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
    </div>
  );
}

export default Expenses; 