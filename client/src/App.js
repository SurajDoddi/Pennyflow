import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import pages
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/add_expense" element={<AddExpense />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </Router>
  );
}

export default App;
