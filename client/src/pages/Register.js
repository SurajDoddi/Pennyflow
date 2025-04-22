import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../utils/api';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      console.log('Sending registration data:', formData);
      
      const response = await register(formData);
      
      // Log response details
      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response body:', responseData);
      
      if (response.ok) {
        navigate('/login');
      } else {
        let errorMsg = 'Registration failed. Please try again.';
        if (responseData && responseData.error) {
          errorMsg = responseData.error;
        }
        setError(errorMsg);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <div className="brand-container">
            <img src="/static/assets/logo_Penny_Flow.png" alt="Penny Flow Logo" className="auth-logo" />
            <h1>Penny Flow</h1>
          </div>
          <div className="auth-welcome">
            <h2>Join Us Today!</h2>
            <p>Create an account to start tracking your expenses and take control of your financial future.</p>
          </div>
          <div className="auth-image">
            <img src="/static/assets/register-illustration.svg" alt="Register Illustration" onError={(e) => {e.target.style.display='none'}} />
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-container">
            <h2>Create Account</h2>
            <p className="auth-subtitle">Fill in your information to get started</p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <div className="input-with-icon">
                  <i className="fas fa-user"></i>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Your full name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <div className="input-with-icon">
                  <i className="fas fa-at"></i>
                  <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    placeholder="Choose a username" 
                    value={formData.username}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-with-icon">
                  <i className="fas fa-envelope"></i>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Your email address" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <i className="fas fa-lock"></i>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Create a strong password" 
                    value={formData.password}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <p className="password-hint">Password should be at least 8 characters long</p>
              </div>

              {error && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                className={`auth-button ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <><i className="fas fa-spinner fa-spin"></i> Creating Account...</>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <p className="auth-redirect">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>

            <div className="home-link">
              <Link to="/"><i className="fas fa-arrow-left"></i> Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Include Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        integrity="sha512-..."
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      
      <style jsx="true">{`
        /* Modern Auth Page Styles */
        .auth-page {
          min-height: 100vh;
          background-color: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', -apple-system, sans-serif;
          padding: 2rem;
        }
        
        .auth-container {
          display: flex;
          max-width: 1000px;
          width: 100%;
          min-height: 600px;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }
        
        .auth-left {
          flex: 1;
          background: linear-gradient(135deg, #2D3E50, #34495e);
          color: white;
          padding: 3rem;
          display: flex;
          flex-direction: column;
        }
        
        .brand-container {
          display: flex;
          align-items: center;
          margin-bottom: 3rem;
        }
        
        .auth-logo {
          height: 50px;
          border: 1.5px solid white;
          border-radius: 50%;
          margin-right: 1rem;
        }
        
        .auth-welcome {
          margin-bottom: 3rem;
        }
        
        .auth-welcome h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .auth-welcome p {
          font-size: 1.1rem;
          line-height: 1.6;
          opacity: 0.9;
        }
        
        .auth-image {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .auth-image img {
          max-width: 100%;
          max-height: 300px;
        }
        
        .auth-right {
          flex: 1;
          padding: 3rem;
          display: flex;
          align-items: center;
          overflow-y: auto;
        }
        
        .auth-form-container {
          width: 100%;
        }
        
        .auth-form-container h2 {
          font-size: 2rem;
          color: #2D3E50;
          margin-bottom: 0.5rem;
        }
        
        .auth-subtitle {
          color: #64748b;
          margin-bottom: 2rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #2D3E50;
        }
        
        .password-hint {
          font-size: 0.8rem;
          color: #64748b;
          margin-top: 0.5rem;
        }
        
        .input-with-icon {
          position: relative;
        }
        
        .input-with-icon i {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }
        
        .input-with-icon input {
          width: 100%;
          padding: 12px 15px 12px 45px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s;
        }
        
        .input-with-icon input:focus {
          border-color: #FF7043;
          box-shadow: 0 0 0 3px rgba(255, 112, 67, 0.1);
          outline: none;
        }
        
        .error-message {
          background-color: #fee2e2;
          color: #ef4444;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .auth-button {
          width: 100%;
          padding: 14px;
          background-color: #FF7043;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        
        .auth-button:hover {
          background-color: #ff5722;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .auth-button.loading {
          opacity: 0.8;
          cursor: not-allowed;
        }
        
        .auth-redirect {
          text-align: center;
          font-size: 0.95rem;
          color: #64748b;
          margin-bottom: 2rem;
        }
        
        .auth-redirect a {
          color: #FF7043;
          font-weight: 500;
          text-decoration: none;
        }
        
        .auth-redirect a:hover {
          text-decoration: underline;
        }
        
        .home-link {
          text-align: center;
        }
        
        .home-link a {
          color: #64748b;
          text-decoration: none;
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        
        .home-link a:hover {
          color: #2D3E50;
        }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
          .auth-container {
            flex-direction: column;
          }
          
          .auth-left {
            padding: 2rem;
          }
          
          .auth-welcome {
            margin-bottom: 2rem;
          }
          
          .auth-welcome h2 {
            font-size: 2rem;
          }
          
          .auth-image {
            display: none;
          }
          
          .auth-right {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Register; 