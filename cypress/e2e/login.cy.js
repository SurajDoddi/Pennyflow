describe('Login Page Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/login');
  });

  it('should have the correct form elements and submit to the correct URL with POST', () => {
    cy.get('form').should('exist');
    cy.get('input[placeholder="Username"]').should('exist');
    cy.get('input[placeholder="Password"]').should('exist');
    cy.get('button[type="submit"]').should('exist').contains('Login');
    cy.get('form').should('have.attr', 'action', '/login');
    cy.get('form').should('have.attr', 'method', 'POST');
  });

  it('should have a link to the registration page', () => {
    cy.get('a').contains('Sign Up').should('have.attr', 'href', '/register');
  });

  it('should have a link back to the home page', () => {
    cy.get('a').contains('Back to Home').should('have.attr', 'href', '/');
  });

  it('should not submit the form with empty fields', () => {
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/login'); // Should stay on login page
  });

  it('should have password field of type "password"', () => {
    cy.get('input[placeholder="Password"]').should('have.attr', 'type', 'password');
  });

  it('should have required attribute on input fields', () => {
    cy.get('input[placeholder="Username"]').should('have.attr', 'required');
    cy.get('input[placeholder="Password"]').should('have.attr', 'required');
  });
});
