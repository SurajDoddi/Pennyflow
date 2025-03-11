describe('Pennyflow Homepage Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080');
    });
  
    it('should display the navbar with logo, site title, and navigation links', () => {
      cy.get('.navbar').should('exist');
      cy.get('.logo-container .logo').should('contain', 'P');
      cy.get('.logo-container .site-title').should('contain', 'Pennyflow');
      cy.get('.nav-links a').contains('Login').should('have.attr', 'href', '/login');
      cy.get('.nav-links a').contains('Register').should('have.attr', 'href', '/register');
    });
  
    it('should display the hero section with correct content', () => {
      cy.get('.hero-section h1').should('contain', 'Intelligent Expense Tracking');
      cy.get('.hero-section p').should('contain', 'Simplify your financial management');
      cy.get('.hero-section h2').should('contain', 'Track Every Penny, Flow Freely!');
      cy.get('.cta-group a').contains('About Us').should('have.attr', 'href', '/about-us');
    });
  
    it('should display three feature sections with correct text', () => {
      cy.get('.features .feature').should('have.length', 3);
  
      cy.get('.features .feature').eq(0).within(() => {
        cy.get('h3').should('contain', 'Track Expenses');
        cy.get('p').should('contain', 'Effortlessly log and categorize');
      });
  
      cy.get('.features .feature').eq(1).within(() => {
        cy.get('h3').should('contain', 'Gain Insights');
        cy.get('p').should('contain', 'Understand your financial patterns');
      });
  
      cy.get('.features .feature').eq(2).within(() => {
        cy.get('h3').should('contain', 'Easy Budgeting');
        cy.get('p').should('contain', 'Set personalized budgets');
      });
    });
  
    it('should display the footer with correct copyright text', () => {
      cy.get('.footer p').should('contain', '© 2025 Pennyflow | All Rights Reserved');
    });
  });
  