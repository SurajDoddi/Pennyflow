// API utility functions for connecting to the Go backend

// Base URL for the API
const API_BASE_URL = 'http://localhost:8080'; // Update this to match your Go server port

// Authentication API calls
export const login = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials),
    credentials: 'include', // Important for cookies/session
  });
  
  return response;
};

export const register = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(userData),
    credentials: 'include',
  });
  
  return response;
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    },
    credentials: 'include',
  });
  
  return response;
};

// Expense API calls
export const getExpenses = async () => {
  const response = await fetch(`${API_BASE_URL}/expenses/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    },
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch expenses: ${response.status}`);
  }
  
  return await response.json();
};

export const getExpenseById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    },
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch expense: ${response.status}`);
  }
  
  return await response.json();
};

export const createExpense = async (expenseData) => {
  const response = await fetch(`${API_BASE_URL}/expenses/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(expenseData),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create expense: ${response.status}`);
  }
  
  return await response.json();
};

export const updateExpense = async (id, expenseData) => {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(expenseData),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update expense: ${response.status}`);
  }
  
  return await response.json();
};

export const deleteExpense = async (id) => {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json'
    },
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete expense: ${response.status}`);
  }
  
  return await response.json();
}; 