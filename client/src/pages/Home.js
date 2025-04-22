import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="logo-container">
          <img src="/static/assets/logo_Penny_Flow.png" alt="Penny Flow Logo" className="logo" />
          <div className="title-container">
            <h1 className="page-title">Penny Flow</h1>
            <p className="page-subtitle">Track and Manage Your Expenses</p>
          </div>
        </div>
        <div className="nav-links">
          <Link to="/about-us" className="nav-link">About</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link register-btn">Get Started</Link>
        </div>
      </nav>

      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <h1>Take Control of Your <span className="highlight">Finances</span></h1>
              <p className="hero-subtitle">Simplify your expense tracking, gain valuable insights, and make smarter financial decisions with PennyFlow.</p>
              <div className="hero-cta">
                <Link to="/register" className="cta-button primary">Start for Free</Link>
                <Link to="/about-us" className="cta-button secondary">Learn More</Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="image-container">
                <img src="/static/assets/hero-dashboard.png" alt="PennyFlow Dashboard" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    document.querySelector('.mockup-fallback').style.display = 'block';
                  }}
                />
                <div className="mockup-fallback">
                  <div className="mockup-header">
                    <div className="mockup-circle"></div>
                    <div className="mockup-circle"></div>
                    <div className="mockup-circle"></div>
                  </div>
                  <div className="mockup-chart"></div>
                  <div className="mockup-stats">
                    <div className="mockup-stat-item"></div>
                    <div className="mockup-stat-item"></div>
                    <div className="mockup-stat-item"></div>
                  </div>
                  <div className="mockup-table">
                    <div className="mockup-row"></div>
                    <div className="mockup-row"></div>
                    <div className="mockup-row"></div>
                  </div>
                </div>
              </div>
              <div className="shape-1"></div>
              <div className="shape-2"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="section-header">
            <h2>Why Choose PennyFlow?</h2>
            <p>Powerful features designed to make expense tracking simple and insightful</p>
          </div>

          <div className="features">
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="feature-content">
                <h3>Smart Expense Tracking</h3>
                <p>Effortlessly log and categorize your spending in real-time with our intuitive interface and smart categorization.</p>
              </div>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-chart-pie"></i>
              </div>
              <div className="feature-content">
                <h3>Insightful Analytics</h3>
                <p>Understand your financial patterns with comprehensive visualizations and reports that help identify spending trends.</p>
              </div>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-bell"></i>
              </div>
              <div className="feature-content">
                <h3>Budget Alerts</h3>
                <p>Set personalized budget goals and receive timely notifications to help you stay on track and avoid overspending.</p>
              </div>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-lock"></i>
              </div>
              <div className="feature-content">
                <h3>Bank-Level Security</h3>
                <p>Your financial data is protected with enterprise-grade encryption and secure authentication protocols.</p>
              </div>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-sync"></i>
              </div>
              <div className="feature-content">
                <h3>Sync Across Devices</h3>
                <p>Access your expense data from anywhere, with seamless synchronization between all your devices.</p>
              </div>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-file-export"></i>
              </div>
              <div className="feature-content">
                <h3>Easy Exports</h3>
                <p>Export your financial data in multiple formats for tax preparation, accounting, or personal records.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works">
          <div className="section-header">
            <h2>How PennyFlow Works</h2>
            <p>Start tracking your expenses in three simple steps</p>
          </div>
          
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create Your Account</h3>
              <p>Sign up in less than a minute with just your email address. No credit card required.</p>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <h3>Track Your Expenses</h3>
              <p>Easily log your expenses with our simple interface. Categorize and add details as needed.</p>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <h3>Gain Financial Insights</h3>
              <p>View detailed reports and visualizations to understand your spending habits and save money.</p>
            </div>
          </div>
          
          <div className="cta-container">
            <Link to="/register" className="cta-button primary large">Get Started Today</Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/static/assets/logo_Penny_Flow.png" alt="PennyFlow Logo" className="footer-logo" />
            <h3>PennyFlow</h3>
            <p>Track Every Penny, Flow Freely</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Security</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about-us">About Us</Link></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Support</a></li>
                <li><a href="#">FAQs</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 PennyFlow | All Rights Reserved</p>
          <div className="social-links">
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </footer>
      
      {/* Include Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        integrity="sha512-..."
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      
      <style jsx="true">{`
        /* Modern CSS Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .home-page {
          font-family: 'Inter', -apple-system, sans-serif;
          color: #2D3E50;
          overflow-x: hidden;
        }
        
        /* Navbar */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 5%;
          background-color: #2D3E50;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .logo {
          height: 100px;
          margin-right: 1rem;
          border: 1.5px solid white;
          border-radius: 50%;
        }
        
        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .title-container {
          display: flex;
          flex-direction: column;
        }
        
        .page-title {
          margin: 0;
          font-size: 1.8em;
          color: #fff;
        }
        
        .page-subtitle {
          margin: 0;
          font-size: 0.9em;
          color: #bdc3c7;
        }
        
        .nav-links {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }
        
        .nav-link {
          color: white;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .nav-link:hover {
          color: #FF7043;
        }
        
        .register-btn {
          background-color: #FF7043;
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        
        .register-btn:hover {
          background-color: #ff5722;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        /* Hero Section */
        .hero-section {
          background-color: #f8fafc;
          padding: 5rem 5%;
          position: relative;
          overflow: hidden;
        }
        
        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 4rem;
        }
        
        .hero-content {
          flex: 1;
          max-width: 600px;
        }
        
        .hero-content h1 {
          font-size: 3.5rem;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          color: #2D3E50;
        }
        
        .highlight {
          color: #FF7043;
          position: relative;
          display: inline-block;
        }
        
        .highlight:after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 0;
          right: 0;
          height: 8px;
          background-color: rgba(255, 112, 67, 0.2);
          z-index: -1;
          border-radius: 4px;
        }
        
        .hero-subtitle {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #64748b;
          margin-bottom: 2rem;
        }
        
        .hero-cta {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
        }
        
        .cta-button {
          display: inline-block;
          padding: 0.9rem 1.8rem;
          border-radius: 6px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1rem;
        }
        
        .cta-button.primary {
          background-color: #FF7043;
          color: white;
          box-shadow: 0 4px 10px rgba(255, 112, 67, 0.3);
        }
        
        .cta-button.primary:hover {
          background-color: #ff5722;
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(255, 112, 67, 0.4);
        }
        
        .cta-button.secondary {
          background-color: transparent;
          color: white;
          border: 1px solid white;
        }
        
        .cta-button.secondary:hover {
          background-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-3px);
          box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
          color: white;
        }
        
        .cta-button.large {
          padding: 1rem 2rem;
          font-size: 1.1rem;
        }
        
        .hero-image {
          flex: 1;
          position: relative;
        }
        
        .image-container {
          position: relative;
          z-index: 2;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 20px 30px rgba(0,0,0,0.1);
          transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
          transition: all 0.3s ease;
        }
        
        .image-container:hover {
          transform: perspective(1000px) rotateY(-2deg) rotateX(2deg) translateY(-10px);
          box-shadow: 0 30px 40px rgba(0,0,0,0.15);
        }
        
        .image-container img {
          width: 100%;
          display: block;
        }
        
        .mockup-fallback {
          display: none;
          height: 350px;
          background: white;
          padding: 20px;
        }
        
        .mockup-header {
          height: 40px;
          background: #f1f5f9;
          border-radius: 6px;
          display: flex;
          align-items: center;
          padding: 0 15px;
          margin-bottom: 20px;
        }
        
        .mockup-circle {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #e2e8f0;
          margin-right: 10px;
        }
        
        .mockup-chart {
          height: 120px;
          background: linear-gradient(90deg, #3498db, #2ecc71);
          border-radius: 6px;
          margin-bottom: 20px;
        }
        
        .mockup-stats {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .mockup-stat-item {
          flex: 1;
          height: 50px;
          background: #f1f5f9;
          border-radius: 6px;
        }
        
        .mockup-table {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .mockup-row {
          height: 20px;
          background: #f1f5f9;
          border-radius: 4px;
        }
        
        .shape-1, .shape-2 {
          position: absolute;
          border-radius: 50%;
          z-index: 1;
        }
        
        .shape-1 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, rgba(52, 152, 219, 0.3), rgba(46, 204, 113, 0.3));
          top: -100px;
          right: -100px;
        }
        
        .shape-2 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, rgba(255, 112, 67, 0.2), rgba(255, 159, 67, 0.2));
          bottom: -50px;
          left: -50px;
        }
        
        /* Features Section */
        .features-section {
          padding: 5rem 5%;
          background-color: #f8fafc;
        }
        
        .section-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 4rem;
        }
        
        .section-header h2 {
          font-size: 2.5rem;
          color: #2D3E50;
          margin-bottom: 1rem;
        }
        
        .section-header p {
          font-size: 1.1rem;
          color: #64748b;
        }
        
        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .feature {
          background: white;
          border-radius: 10px;
          padding: 2rem;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
        }
        
        .feature:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }
        
        .feature-icon {
          background-color: rgba(255, 112, 67, 0.1);
          color: #FF7043;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        
        .feature-content h3 {
          font-size: 1.3rem;
          margin-bottom: 0.8rem;
          color: #2D3E50;
        }
        
        .feature-content p {
          color: #64748b;
          line-height: 1.6;
        }
        
        /* How It Works Section */
        .how-it-works {
          padding: 5rem 5%;
          background-color: white;
        }
        
        .steps {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto 4rem;
        }
        
        .step {
          flex: 1;
          min-width: 250px;
          max-width: 350px;
          text-align: center;
          padding: 1rem;
        }
        
        .step-number {
          width: 60px;
          height: 60px;
          background-color: #f1f5f9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: #FF7043;
          position: relative;
        }
        
        .step-number:after {
          content: '';
          position: absolute;
          top: 50%;
          left: 100%;
          width: 100%;
          height: 2px;
          background: #e2e8f0;
          transform: translateY(-50%);
        }
        
        .step:last-child .step-number:after {
          display: none;
        }
        
        .step h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #2D3E50;
        }
        
        .step p {
          color: #64748b;
          line-height: 1.6;
        }
        
        .cta-container {
          text-align: center;
        }
        
        /* Footer */
        .footer {
          background-color: #2D3E50;
          color: white;
          padding-top: 4rem;
        }
        
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          gap: 4rem;
          padding: 0 5% 3rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .footer-brand {
          flex: 1;
          min-width: 250px;
        }
        
        .footer-logo {
          width: 100px;
          height: 100px;
          margin-bottom: 1rem;
          border: 1.5px solid white;
          border-radius: 50%;
          padding: 10px;
          box-sizing: border-box;
        }
        
        .footer-brand h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        
        .footer-brand p {
          color: #bdc3c7;
        }
        
        .footer-links {
          flex: 2;
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
        }
        
        .footer-column {
          flex: 1;
          min-width: 150px;
        }
        
        .footer-column h4 {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          position: relative;
        }
        
        .footer-column h4:after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 30px;
          height: 2px;
          background-color: #FF7043;
        }
        
        .footer-column ul {
          list-style: none;
        }
        
        .footer-column li {
          margin-bottom: 0.8rem;
        }
        
        .footer-column a {
          color: #bdc3c7;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .footer-column a:hover {
          color: white;
        }
        
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 5%;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .social-links {
          display: flex;
          gap: 1rem;
        }
        
        .social-links a {
          color: #bdc3c7;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }
        
        .social-links a:hover {
          color: white;
          transform: translateY(-3px);
        }
        
        /* Responsive Styles */
        @media (max-width: 992px) {
          .hero-container {
            flex-direction: column;
            gap: 3rem;
          }
          
          .hero-content {
            text-align: center;
            max-width: 100%;
          }
          
          .hero-content h1 {
            font-size: 2.8rem;
          }
          
          .hero-cta {
            justify-content: center;
          }
          
          .image-container {
            max-width: 500px;
            margin: 0 auto;
            transform: none;
          }
          
          .step-number:after {
            display: none;
          }
        }
        
        @media (max-width: 768px) {
          .navbar {
            padding: 1rem;
            flex-direction: column;
          }
          
          .logo-container {
            margin-bottom: 1rem;
          }
          
          .hero-section {
            padding: 3rem 1rem;
          }
          
          .hero-content h1 {
            font-size: 2.3rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .footer-content {
            gap: 2rem;
          }
          
          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Home; 