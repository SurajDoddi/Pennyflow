describe('Pennyflow Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/login');
  });

  it('should display the site logo and title', () => {
    cy.get('.logo').should('be.visible');
    cy.get('.page-title').should('contain', 'Penny Flow');
    cy.get('.page-subtitle').should('contain', 'Track and Manage Your Expenses');
  });

  it('should have a login form with username and password fields', () => {
    cy.get('#username').should('exist');
    cy.get('#password').should('exist');
    cy.get('.login-button').should('exist');
  });

  it('should require both username and password fields', () => {
    cy.get('.login-button').click();
    cy.get('#username:invalid').should('exist');
    
    cy.get('#username').type('testuser');
    cy.get('.login-button').click();
    cy.get('#password:invalid').should('exist');
  });

  it('should submit the form with valid credentials', () => {
    cy.intercept('POST', '/login').as('loginRequest');
    
    cy.get('#username').type('testuser');
    cy.get('#password').type('password123');
    cy.get('.login-button').click();
    
    cy.wait('@loginRequest');
  });

  it('should navigate to registration page when Sign Up is clicked', () => {
    cy.contains('Sign Up').click();
    cy.url().should('include', '/register');
  });

  it('should navigate to home page when Back to Home is clicked', () => {
    cy.contains('Back to Home').click();
    cy.url().should('not.include', '/login');
  });
});