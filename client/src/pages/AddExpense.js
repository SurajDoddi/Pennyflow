import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createExpense } from '../utils/api';

function AddExpense() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: today,
    time: currentTime,
    payment_method: 'cash',
    notes: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    
    try {
      // Format the data for the API
      const expenseData = {
        description: formData.description,
        amount: formData.amount,
        category: formData.category,
        payment_method: formData.payment_method,
        date: formData.date,
        time: formData.time
      };
      
      console.log('Sending expense data:', expenseData);
      
      // Call the API to create the expense
      const response = await createExpense(expenseData);
      
      console.log('Response:', response);
      
      // If we get here, it was successful
      navigate('/expenses');
    } catch (error) {
      console.error('Error adding expense:', error);
      setError(error.message || 'Failed to add expense. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-expense-page">
      <header>
        <h1>Add New Expense</h1>
      </header>

      <div className="expense-form-container">
        <div className="form">
          {error && (
            <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="expense-form">
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input 
                type="text" 
                id="description" 
                name="description" 
                required 
                placeholder="What did you spend on?" 
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount ($)</label>
              <input 
                type="number" 
                id="amount" 
                name="amount" 
                min="0" 
                step="0.01" 
                required 
                placeholder="0.00" 
                value={formData.amount}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select 
                id="category" 
                name="category" 
                required
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                <option value="food">Food & Dining</option>
                <option value="transport">Transportation</option>
                <option value="housing">Housing</option>
                <option value="utilities">Utilities</option>
                <option value="entertainment">Entertainment</option>
                <option value="shopping">Shopping</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input 
                type="date" 
                id="date" 
                name="date" 
                required 
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Select Time</label>
              <input 
                type="time" 
                id="time" 
                name="time" 
                required 
                value={formData.time}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="payment_method">Payment Method</label>
              <select 
                id="payment_method" 
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
              >
                <option value="cash">Cash</option>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="digital_wallet">Digital Wallet</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes (Optional)</label>
              <textarea 
                id="notes" 
                name="notes" 
                rows="3" 
                placeholder="Any additional details..."
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="submit" className="cta-button" disabled={submitting}>
                {submitting ? 'Saving...' : 'Save Expense'}
              </button>
              <Link to="/expenses" className="secondary-button">Cancel</Link>
            </div>
          </form>
        </div>
      </div>

      <footer>
        &copy; 2025 PennyFlow. All Rights Reserved.
      </footer>
      
      {/* Include the CSS */}
      <link rel="stylesheet" href="/static/css/add_expense.css" />
    </div>
  );
}

export default AddExpense; 