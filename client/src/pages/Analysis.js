import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { getExpenses, logout } from '../utils/api';
import './analysis.css';

function Analysis() {
  const navigate = useNavigate();
  const [expenseData, setExpenseData] = useState([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const categoryChartRef = useRef(null);
  const trendChartRef = useRef(null);
  const paymentChartRef = useRef(null);

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        setLoading(true);
        const data = await getExpenses();
        setExpenseData(data.expenses || []);
        setUserName(data.userName || 'User');
      } catch (error) {
        console.error('Error fetching expense data:', error);
        if (error.message && error.message.includes('401')) {
          navigate('/login');
          return;
        }
        setError('Network error. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenseData();

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
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      navigate('/');
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    if (categoryChartRef.current) categoryChartRef.current.destroy();
    if (trendChartRef.current) trendChartRef.current.destroy();
    if (paymentChartRef.current) paymentChartRef.current.destroy();

    if (expenseData.length > 0 && !loading && !error) {
      createCategoryChart();
      createTrendChart();
      createPaymentMethodChart();
    }

    return () => {
      if (categoryChartRef.current) categoryChartRef.current.destroy();
      if (trendChartRef.current) trendChartRef.current.destroy();
      if (paymentChartRef.current) paymentChartRef.current.destroy();
    };
  }, [expenseData, loading, error]);

  const createCategoryChart = () => {
    const categorySums = expenseData.reduce((acc, expense) => {
      const category = expense.Category || 'Other';
      acc[category] = (acc[category] || 0) + parseFloat(expense.Amount);
      return acc;
    }, {});

    const labels = Object.keys(categorySums);
    const amounts = Object.values(categorySums);
    const ctx = document.getElementById('categoryChart');
    if (ctx) {
      categoryChartRef.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            data: amounts,
            backgroundColor: [
              '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
              '#FF9F40', '#2ECC71', '#E74C3C', '#95A5A6', '#F39C12'
            ],
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'right' },
            title: {
              display: true,
              text: 'Expenses by Category',
              font: { size: 16 }
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.formattedValue;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((context.raw / total) * 100);
                  return `${label}: $${value} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }
  };

  const createTrendChart = () => {
    const monthlyData = {};
    expenseData.forEach(expense => {
      const date = new Date(expense.CreatedAt);
      const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      monthlyData[monthYear] = (monthlyData[monthYear] || 0) + parseFloat(expense.Amount);
    });

    const sortedMonths = Object.keys(monthlyData).sort();
    const formattedLabels = sortedMonths.map(month => {
      const [year, monthNum] = month.split('-');
      return new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleString('default', { month: 'short', year: 'numeric' });
    });

    const monthlySums = sortedMonths.map(month => monthlyData[month]);
    const ctx = document.getElementById('trendChart');
    if (ctx) {
      trendChartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: formattedLabels,
          datasets: [{
            label: 'Monthly Spending',
            data: monthlySums,
            backgroundColor: '#36A2EB',
            borderColor: '#2980B9',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: 'Amount ($)' },
              ticks: {
                callback: (value) => '$' + value
              }
            },
            x: { title: { display: true, text: 'Month' } }
          },
          plugins: {
            title: {
              display: true,
              text: 'Monthly Spending Trends',
              font: { size: 16 }
            },
            tooltip: {
              callbacks: {
                label: (context) => `$${context.formattedValue}`
              }
            }
          }
        }
      });
    }
  };

  const createPaymentMethodChart = () => {
    const paymentMethodSums = expenseData.reduce((acc, expense) => {
      const method = expense.PaymentMethod || 'Other';
      acc[method] = (acc[method] || 0) + parseFloat(expense.Amount);
      return acc;
    }, {});
    const labels = Object.keys(paymentMethodSums);
    const amounts = Object.values(paymentMethodSums);
    const ctx = document.getElementById('paymentChart');
    if (ctx) {
      paymentChartRef.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [{
            data: amounts,
            backgroundColor: [
              '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6',
              '#1abc9c', '#d35400', '#c0392b'
            ],
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'right' },
            title: {
              display: true,
              text: 'Expenses by Payment Method',
              font: { size: 16 }
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.formattedValue;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((context.raw / total) * 100);
                  return `${label}: $${value} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }
  };

  return (
    <div className="expenses-page">
      <header className="navbar">
        <div className="nav-left">
          <img src="/static/assets/logo_Penny_Flow.png" alt="Logo" className="logo" />
          <div className="title-container">
            <h1 className="page-title">Penny Flow</h1>
            <p className="page-subtitle">Track and Manage Your Expenses</p>
          </div>
        </div>

        <div className="nav-right">
          <div className="user-dropdown" ref={dropdownRef} onClick={toggleDropdown}>
            <span className="user-name">{userName}</span>
            <i className="fa fa-bars caret-icon"></i>
            <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
              <Link to="/analysis"><i className="fa fa-chart-bar"></i> Analysis</Link>
              <button onClick={handleLogout} className="logout-btn">
                <i className="fa fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="expenses-container">
        {loading ? (
          <div className="loading">Loading expense data...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : expenseData.length === 0 ? (
          <div className="no-expenses">
            No expense data available to analyze. <Link to="/add_expense">Add some expenses</Link> to see insights.
          </div>
        ) : (
          <div className="analysis-content">
            <div className="analysis-section">
              <h2 className="section-title">Key Metrics</h2>
              <div className="metrics-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '16px',
                marginBottom: '30px'
              }}>
                <div className="metric-card" style={{ backgroundColor: '#3498db', color: 'white' }}>
                  <h3>Total Expenses</h3>
                  <p className="metric-value">${expenseData.reduce((sum, e) => sum + parseFloat(e.Amount), 0).toFixed(2)}</p>
                </div>
                <div className="metric-card" style={{ backgroundColor: '#2ecc71', color: 'white' }}>
                  <h3>Number of Expenses</h3>
                  <p className="metric-value">{expenseData.length}</p>
                </div>
                <div className="metric-card" style={{ backgroundColor: '#e74c3c', color: 'white' }}>
                  <h3>Average Expense</h3>
                  <p className="metric-value">
                    ${(expenseData.reduce((sum, e) => sum + parseFloat(e.Amount), 0) / expenseData.length).toFixed(2)}
                  </p>
                </div>
                <div className="metric-card" style={{ backgroundColor: '#f39c12', color: 'white' }}>
                  <h3>Top Category</h3>
                  <p className="metric-value">
                    {(() => {
                      const categorySums = expenseData.reduce((acc, e) => {
                        const cat = e.Category || 'Other';
                        acc[cat] = (acc[cat] || 0) + parseFloat(e.Amount);
                        return acc;
                      }, {});
                      const top = Object.entries(categorySums).sort((a, b) => b[1] - a[1])[0];
                      return top ? top[0] : 'N/A';
                    })()}
                  </p>
                </div>
              </div>
            </div>

            <div className="analysis-section">
              <h2 className="section-title">Monthly Spending Trends</h2>
              <div className="chart-container">
                <canvas id="trendChart"></canvas>
              </div>
            </div>

            <div className="analysis-section">
              <h2 className="section-title">Expense Distribution</h2>
              <div className="charts-grid">
                <div className="chart-container">
                  <canvas id="categoryChart"></canvas>
                </div>
                <div className="chart-container">
                  <canvas id="paymentChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer>
        &copy; 2025 PennyFlow. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Analysis;
