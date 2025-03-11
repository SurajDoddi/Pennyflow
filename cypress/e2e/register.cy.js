describe('Sign-Up Page Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/register');
    });
  
    it('should have the correct form elements and submit to the correct URL with POST', () => {
      cy.get('form').should('exist');
      cy.get('#username').should('exist');
      cy.get('#email').should('exist');
      cy.get('#password').should('exist');
      cy.get('button[type="submit"]').should('exist').contains('Create Account');
      cy.get('form').should('have.attr', 'action', '/register');
      cy.get('form').should('have.attr', 'method', 'POST');
    });
  
    it('should have a link to the login page', () => {
      cy.get('a').contains('Login').should('have.attr', 'href', '/login');
    });
  
    it('should have a link back to the home page', () => {
      cy.get('a').contains('Back to Home').should('have.attr', 'href', '/');
    });
  
    it('should not submit the form with empty fields', () => {
      cy.get('button[type="submit"]').click();
      cy.get('#username:invalid').should('exist');
      cy.get('#email:invalid').should('exist');
      cy.get('#password:invalid').should('exist');
    });
  
    it('should enforce the email input type', () => {
      cy.get('#email').should('have.attr', 'type', 'email');
    });
  
    it('should have password field of type "password"', () => {
      cy.get('#password').should('have.attr', 'type', 'password');
    });
  
    it('should have required attribute on input fields', () => {
      cy.get('#username').should('have.attr', 'required');
      cy.get('#email').should('have.attr', 'required');
      cy.get('#password').should('have.attr', 'required');
    });
  });
  