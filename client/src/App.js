import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import AddExpense from './pages/AddExpense';
import Analysis from './pages/Analysis';
import Expenses from './pages/Expenses';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/add_expense" element={<AddExpense />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </Router>
  );
}

export default App;
