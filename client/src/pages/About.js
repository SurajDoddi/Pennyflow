import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function About() {
  const [activeTab, setActiveTab] = useState('story');

  return (
    <div className="about-page">
      <nav className="navbar">
        <div className="logo-container">
          <Link to="/">
            <img src="/static/assets/logo_Penny_Flow.png" alt="Penny Flow Logo" className="logo" />
          </Link>
          <div className="title-container">
            <h1 className="page-title">Penny Flow</h1>
            <p className="page-subtitle">Track Every Penny, Flow Freely</p>
          </div>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </div>
      </nav>

      <header className="about-header">
        <div className="header-content">
          <h1>About PennyFlow</h1>
          <p>Redefining personal finance management for today's world</p>
        </div>
      </header>

      <div className="about-tabs">
        <button 
          className={`tab-button ${activeTab === 'story' ? 'active' : ''}`}
          onClick={() => setActiveTab('story')}
        >
          Our Story
        </button>
        <button 
          className={`tab-button ${activeTab === 'mission' ? 'active' : ''}`}
          onClick={() => setActiveTab('mission')}
        >
          Mission & Values
        </button>
        <button 
          className={`tab-button ${activeTab === 'team' ? 'active' : ''}`}
          onClick={() => setActiveTab('team')}
        >
          Our Team
        </button>
      </div>

      <main className="about-content">
        {activeTab === 'story' && (
          <section className="about-section" id="story">
            <h2>Our Journey</h2>
            <div className="story-container">
              <div className="story-image">
                <div className="journey-path">
                  <div className="path-point" data-year="2023">
                    <div className="path-dot"></div>
                    <div className="path-label">
                      <span className="path-year">Milestone 1</span>
                      <span className="path-event">Development Started</span>
                    </div>
                  </div>
                  <div className="path-point" data-year="January 2024">
                    <div className="path-dot"></div>
                    <div className="path-label">
                      <span className="path-year">Milestone 2</span>
                      <span className="path-event">Authentication Done</span>
                    </div>
                  </div>
                  <div className="path-point" data-year="2024Q1">
                    <div className="path-dot"></div>
                    <div className="path-label">
                      <span className="path-year">Milestone 3</span>
                      <span className="path-event">Functionality Added</span>
                    </div>
                  </div>
                  <div className="path-point" data-year="2024Q2">
                    <div className="path-dot"></div>
                    <div className="path-label">
                      <span className="path-year">Milestone 4</span>
                      <span className="path-event">React Execution</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="story-text">
                <h3>From Idea to Innovation</h3>
                <p>PennyFlow began in 2023 when our founding team noticed a gap in the market: most expense tracking apps were either too complex or too simplistic. We set out to create a solution that strikes the perfect balance—powerful enough for detailed financial insights, yet intuitive enough for everyday use.</p>
                
                <h3>The Evolution</h3>
                <p>What started as a simple expense tracker has evolved into a comprehensive financial management platform. Over time, we've refined our features based on user feedback, focusing on creating a seamless experience that empowers users to make smarter financial decisions.</p>
                
                <h3>Looking Forward</h3>
                <p>Today, PennyFlow continues to grow and innovate. We're constantly exploring new ways to enhance our platform, with upcoming features focused on predictive analytics, personalized financial advice, and expanded visualization tools.</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'mission' && (
          <section className="about-section" id="mission">
            <h2>Mission & Core Values</h2>
            
            <div className="mission-statement">
              <h3>Our Mission</h3>
              <p>At PennyFlow, we're on a mission to democratize financial management by providing intuitive, powerful tools that help everyone take control of their spending habits and achieve their financial goals.</p>
            </div>
            
            <div className="values-container">
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-lock"></i>
                </div>
                <h3>Security First</h3>
                <p>We prioritize the protection of your financial data with industry-leading security practices and transparent privacy policies.</p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-universal-access"></i>
                </div>
                <h3>Accessibility</h3>
                <p>We believe financial tools should be accessible to everyone, regardless of financial background or expertise.</p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <h3>Continuous Innovation</h3>
                <p>We constantly refine our platform based on user feedback and emerging technologies to deliver the best possible experience.</p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>User Empowerment</h3>
                <p>We design every feature with the goal of giving users greater control and insight into their financial lives.</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'team' && (
          <section className="about-section" id="team">
            <h2>The Team Behind PennyFlow</h2>
            <p className="team-intro">Meet our talented team of developers who bring PennyFlow to life with their expertise and passion.</p>
            
            <div className="team-grid">
              <div className="team-member">
                <div className="member-image">
                  <img src="/static/assets/kundana.jpg" alt="Kundana Gullipalli" />
                </div>
                <div className="member-info">
                  <h3>Kundana Gullipalli</h3>
                  <p className="member-title">Frontend Developer</p>
                  <p className="member-bio">As a frontend specialist, Kundana crafts PennyFlow's intuitive user interface, ensuring a smooth and engaging experience across all devices.</p>
                  <div className="member-skills">
                    <span>React</span>
                    <span>CSS</span>
                    <span>UI/UX</span>
                  </div>
                </div>
              </div>
              
              <div className="team-member">
                <div className="member-image">
                  <img src="/static/assets/charchika.jpg" alt="Charchika Mishra" />
                </div>
                <div className="member-info">
                  <h3>Charchika Mishra</h3>
                  <p className="member-title">Frontend Developer</p>
                  <p className="member-bio">Charchika focuses on creating polished, responsive interfaces and interactive visualizations that make financial data easy to understand.</p>
                  <div className="member-skills">
                    <span>React</span>
                    <span>JavaScript</span>
                    <span>Data Visualization</span>
                  </div>
                </div>
              </div>
              
              <div className="team-member">
                <div className="member-image">
                  <img src="/static/assets/suraj.jpg" alt="Suraj Doddi" />
                </div>
                <div className="member-info">
                  <h3>Suraj Doddi</h3>
                  <p className="member-title">Backend Developer</p>
                  <p className="member-bio">Suraj builds the robust server infrastructure that powers PennyFlow, ensuring secure, fast, and reliable performance.</p>
                  <div className="member-skills">
                    <span>Go</span>
                    <span>API Development</span>
                    <span>Database Design</span>
                  </div>
                </div>
              </div>
              
              <div className="team-member">
                <div className="member-image">
                  <img src="/static/assets/umesh.jpg" alt="Umesh Chandra" />
                </div>
                <div className="member-info">
                  <h3>Umesh Chandra</h3>
                  <p className="member-title">Backend Developer</p>
                  <p className="member-bio">A veteran engineer, Umesh specializes in optimizing system performance and implementing advanced features for data analysis.</p>
                  <div className="member-skills">
                    <span>Go</span>
                    <span>System Architecture</span>
                    <span>Performance Optimization</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <section className="cta-section">
        <h2>Ready to take control of your finances?</h2>
        <p>Join thousands of users who are already tracking their expenses with PennyFlow.</p>
        <div className="cta-buttons">
          <Link to="/register" className="cta-button primary">Get Started</Link>
          <Link to="/login" className="cta-button secondary">Log In</Link>
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <img src="/static/assets/logo_Penny_Flow.png" alt="Penny Flow Logo" className="footer-logo" />
            <h3>PennyFlow</h3>
            <p>Track Every Penny, Flow Freely</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" aria-label="GitHub"><i className="fab fa-github"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 PennyFlow | All Rights Reserved</p>
        </div>
      </footer>
      
      {/* Include Font Awesome for icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        integrity="sha512-..."
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      
      {/* Include the custom CSS */}
      <style jsx="true">{`
        /* Global styles */
        .about-page {
          font-family: 'Inter', -apple-system, sans-serif;
          color: #333;
          line-height: 1.6;
        }
        
        /* Navbar styles */
        .navbar {
          background-color: #2D3E50;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .logo-container {
          display: flex;
          align-items: center;
        }
        
        .logo {
          height: 50px;
          margin-right: 1rem;
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
        }
        
        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }
        
        .nav-link:hover {
          color: #FF7043;
        }
        
        /* Header styles */
        .about-header {
          background: linear-gradient(to right, #2D3E50, #3498db);
          color: white;
          padding: 6rem 2rem;
          text-align: center;
        }
        
        .header-content h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .header-content p {
          font-size: 1.2rem;
          max-width: 800px;
          margin: 0 auto;
        }
        
        /* Tab navigation */
        .about-tabs {
          display: flex;
          justify-content: center;
          padding: 2rem 1rem;
          background-color: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
        }
        
        .tab-button {
          padding: 0.8rem 1.5rem;
          margin: 0 0.5rem;
          border: none;
          background: none;
          font-size: 1rem;
          font-weight: 500;
          color: #495057;
          cursor: pointer;
          transition: all 0.3s;
          border-bottom: 2px solid transparent;
        }
        
        .tab-button:hover {
          color: #2D3E50;
        }
        
        .tab-button.active {
          color: #2D3E50;
          border-bottom: 2px solid #2D3E50;
        }
        
        /* Content sections */
        .about-content {
          padding: 3rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .about-section {
          margin-bottom: 3rem;
        }
        
        .about-section h2 {
          text-align: center;
          font-size: 2.2rem;
          color: #2D3E50;
          margin-bottom: 2rem;
        }
        
        /* Story section */
        .story-container {
          display: grid;
          grid-template-columns: 35% 65%;
          gap: 2rem;
          align-items: center;
          position: relative;
        }
        
        .story-image {
          position: relative;
          height: 400px;
          display: flex;
          align-items: center;
        }
        
        .story-image img {
          width: 100%;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        /* Journey Path styles */
        .journey-path {
          position: relative;
          top: 0;
          bottom: 0;
          width: 150px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0;
          height: 100%;
        }
        
        .path-line {
          position: absolute;
          left: 15px;
          top: 15px;
          bottom: 15px;
          width: 3px;
          background: linear-gradient(to bottom, #3498db, #2ecc71);
          border-radius: 4px;
          z-index: 1;
        }
        
        .path-point {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          margin-left: 4px;
        }
        
        .path-dot {
          width: 16px;
          height: 16px;
          background-color: #fff;
          border: 3px solid #3498db;
          border-radius: 50%;
          margin-right: 12px;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
          transition: all 0.3s;
          flex-shrink: 0;
        }
        
        .path-point:hover .path-dot {
          transform: scale(1.2);
          background-color: #3498db;
        }
        
        .path-label {
          background-color: white;
          border-radius: 5px;
          padding: 8px 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          min-width: 140px;
          transform: translateX(5px);
          transition: all 0.3s;
        }
        
        .path-point:hover .path-label {
          transform: translateX(10px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .path-year {
          font-weight: 600;
          color: #3498db;
          font-size: 0.85rem;
          margin-bottom: 3px;
        }
        
        .path-event {
          font-size: 0.8rem;
          color: #555;
          line-height: 1.3;
        }
        
        .story-text {
          width: 100%;
          padding-right: 2rem;
        }
        
        .story-text h3 {
          color: #2D3E50;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }
        
        .story-text p {
          margin-bottom: 1.5rem;
          color: #555;
          line-height: 1.8;
        }
        
        /* Mission & Values section */
        .mission-statement {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 3rem;
        }
        
        .mission-statement h3 {
          font-size: 1.8rem;
          color: #2D3E50;
          margin-bottom: 1rem;
        }
        
        .mission-statement p {
          font-size: 1.1rem;
          color: #555;
        }
        
        .values-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        
        .value-card {
          background-color: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          text-align: center;
          transition: transform 0.3s;
        }
        
        .value-card:hover {
          transform: translateY(-5px);
        }
        
        .value-icon {
          font-size: 2.5rem;
          color: #3498db;
          margin-bottom: 1rem;
        }
        
        .value-card h3 {
          font-size: 1.3rem;
          color: #2D3E50;
          margin-bottom: 1rem;
        }
        
        .value-card p {
          color: #555;
        }
        
        /* Team section */
        .team-intro {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 3rem;
          font-size: 1.1rem;
          color: #555;
        }
        
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
          gap: 2rem;
        }
        
        .team-member {
          display: flex;
          background-color: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        
        .member-image {
          flex: 0 0 150px;
          overflow: hidden;
        }
        
        .member-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .member-info {
          flex: 1;
          padding: 1.5rem;
        }
        
        .member-info h3 {
          font-size: 1.3rem;
          color: #2D3E50;
          margin-bottom: 0.5rem;
        }
        
        .member-title {
          color: #3498db;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        
        .member-bio {
          color: #555;
          margin-bottom: 1rem;
        }
        
        .member-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .member-skills span {
          background-color: #f0f4f8;
          color: #2D3E50;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        
        /* CTA section */
        .cta-section {
          background-color: #f0f4f8;
          padding: 4rem 2rem;
          text-align: center;
        }
        
        .cta-section h2 {
          font-size: 2rem;
          color: #2D3E50;
          margin-bottom: 1rem;
        }
        
        .cta-section p {
          font-size: 1.1rem;
          color: #555;
          max-width: 700px;
          margin: 0 auto 2rem;
        }
        
        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
        
        .cta-button {
          padding: 0.8rem 2rem;
          border-radius: 5px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s;
        }
        
        .cta-button.primary {
          background-color: #3498db;
          color: white;
        }
        
        .cta-button.primary:hover {
          background-color: #2980b9;
        }
        
        .cta-button.secondary {
          background-color: white;
          color: #2D3E50;
          border: 1px solid #2D3E50;
        }
        
        .cta-button.secondary:hover {
          background-color: #f8f9fa;
        }
        
        /* Footer styles */
        footer {
          background-color: #2D3E50;
          color: white;
          padding: 3rem 2rem 1rem;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
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
        
        .footer-section h3 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }
        
        .footer-section ul {
          list-style: none;
          padding: 0;
        }
        
        .footer-section ul li {
          margin-bottom: 0.5rem;
        }
        
        .footer-section a {
          color: #bdc3c7;
          text-decoration: none;
          transition: color 0.3s;
        }
        
        .footer-section a:hover {
          color: white;
        }
        
        .social-icons {
          display: flex;
          gap: 1rem;
        }
        
        .social-icons a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(255,255,255,0.1);
          color: white;
          transition: all 0.3s;
        }
        
        .social-icons a:hover {
          background-color: rgba(255,255,255,0.2);
          transform: translateY(-3px);
        }
        
        .footer-bottom {
          margin-top: 2rem;
          padding-top: 1rem;
          text-align: center;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .story-container {
            grid-template-columns: 1fr;
          }
          
          .journey-path {
            position: relative;
            width: 100%;
            height: 100px;
            flex-direction: row;
            margin: 80px 0;
            padding: 0;
          }
          
          .path-line {
            left: 0;
            right: 0;
            top: 25px;
            bottom: auto;
            width: 100%;
            height: 4px;
          }
          
          .path-point {
            flex-direction: column;
          }
          
          .path-dot {
            margin-right: 0;
            margin-bottom: 10px;
          }
          
          .path-label {
            transform: translateY(10px);
            text-align: center;
            min-width: auto;
          }
          
          .path-point:hover .path-label {
            transform: translateY(15px);
          }
          
          .team-grid {
            grid-template-columns: 1fr;
          }
          
          .team-member {
            flex-direction: column;
          }
          
          .member-image {
            flex: 0 0 200px;
          }
          
          .about-header {
            padding: 4rem 1rem;
          }
          
          .header-content h1 {
            font-size: 2.5rem;
          }
          
          .story-text {
            width: 100%;
            padding-right: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default About; 