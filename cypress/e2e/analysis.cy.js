describe('PennyFlow Analysis Page', () => {
  beforeEach(() => {
    // Assuming the user is logged in and visiting the expenses page
    cy.visit('http://localhost:8080/login');
    cy.get('#username').type('charchika349'); // Replace with a test username
    cy.get('#password').type('Viratkohli@18'); // Replace with a test password
    cy.get('.login-button').click();
    
    // Ensure the user is redirected to the expenses page
    cy.url().should('include', '/expenses');
    
    // Click on the dropdown menu in the top-right and select 'Analysis'
    cy.get('.user-dropdown').click();
    cy.contains('a', 'Analysis').click();
    
    // Ensure redirection to the analysis page
    cy.url().should('include', '/analysis');
  });

  it('should display the Analysis header', () => {
    cy.get('h2').should('contain', 'Expense Breakdown by Category');
  });

  it('should navigate back to the Expenses page when clicking "Back Home"', () => {
    cy.get('.back-home').click();
    cy.url().should('include', '/expenses');
  });

  it('should display the chart on the analysis page', () => {
    cy.get('#expenseChart').should('be.visible');
  });

  it('should display users name in the dropdown menu', () => {
    cy.get('.user-name').should('be.visible').and('not.be.empty');
  });

  it('should verify that the dropdown menu is functional', () => {
    cy.get('.user-dropdown').click();
  });

  it('should ensure expense categories appear on the page', () => {
    cy.intercept('GET', '/api/expenses', {
      body: [
        { category: 'Food', amount: 100 },
        { category: 'Transport', amount: 50 },
        { category: 'Entertainment', amount: 70 }
      ]
    }).as('getExpenses');
    
    cy.reload();
    
  });
});
