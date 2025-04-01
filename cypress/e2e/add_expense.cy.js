describe('PennyFlow Add Expense Page', () => {
    beforeEach(() => {
      // Assuming the user is logged in and visiting the expenses page
      cy.visit('http://localhost:8080/login');      
      cy.get('#username').type('charchika349'); // Replace with valid username
      cy.get('#password').type('Viratkohli@18'); // Replace with valid password
      cy.get('.login-button').click();
      
      // Wait for the page to load and then click the 'Add New Expense' button
      cy.url().should('include', '/expenses');  // Ensure we're on the expenses page
      cy.get('.cta-button').contains('Add New Expense').click();  // Click the "Add New Expense" button
      
      // Wait for the page to redirect to the add expense page
      cy.url().should('include', '/add_expense');
    });
  
    it('should display the Add Expense header', () => {
      cy.get('header h1').should('contain', 'Add New Expense');
    });
  
    it('should display all form fields', () => {
      // Check if all necessary fields are present
      cy.get('input#description').should('be.visible');
      cy.get('input#amount').should('be.visible');
      cy.get('select#category').should('be.visible');
      cy.get('input#date').should('be.visible');
      cy.get('input#time').should('be.visible');
      cy.get('select#payment_method').should('be.visible');
      cy.get('textarea#notes').should('be.visible');
    });
  
    it('should submit the form with valid data', () => {
      // Fill out the form with valid data
      cy.get('#description').type('Lunch');
      cy.get('#amount').type('12.50');
      cy.get('#category').select('food');
      cy.get('#date').type('2025-03-31');
      cy.get('#time').type('12:30');
      cy.get('#payment_method').select('credit_card');
      cy.get('#notes').type('Paid via Visa card');
      
      // Submit the form
      cy.get('.cta-button').click();
  
      // Verify that the user is redirected to the expenses page
      cy.url().should('include', '/expenses');
    });
  
    it('should cancel the form and return to the expenses page', () => {
      // Click the cancel button and ensure the user is redirected to the expenses page
      cy.get('.secondary-button').click();
      cy.url().should('include', '/expenses');
    });
  
    it('should display footer with correct copyright text', () => {
      cy.get('footer').should('contain', '© 2025 PennyFlow. All Rights Reserved.');
    });
  });
  