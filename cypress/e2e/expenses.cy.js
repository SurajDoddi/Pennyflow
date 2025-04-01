describe('PennyFlow Expenses Page', () => {
  beforeEach(() => {
    // Log in before visiting the expenses page
    cy.visit('http://localhost:8080/login');
    cy.get('#username').type('charchika349'); // Replace with valid username
    cy.get('#password').type('Viratkohli@18'); // Replace with valid password
    cy.get('.login-button').click();

    // Wait for the page to redirect and load the expenses page
    cy.url().should('include', '/expenses');
  });

  it('should display the header with title and description', () => {
    cy.get('header h1').should('contain', 'Expense Tracker');
    cy.get('header p').should('contain', 'Track and Manage Your Expenses');
  });

  it('should display the expense table if expenses exist', () => {
    // Verify the table exists
    cy.get('.expenses-table').should('exist');
    cy.get('.expenses-table th').should('have.length', 4); // Check if there are 4 columns
    cy.get('.expenses-table tbody tr').should('have.length.greaterThan', 0); // Ensure there are rows
  });

  it('should display action buttons with correct links', () => {
    cy.get('.action-buttons a').contains('Add New Expense').should('have.attr', 'href', '/add_expense');
    cy.get('.action-buttons a').contains('Back to Home').should('have.attr', 'href', '/');
  });

  it('should display the footer with correct copyright text', () => {
    cy.get('footer').should('contain', '© 2025 PennyFlow. All Rights Reserved.');
  });
});
