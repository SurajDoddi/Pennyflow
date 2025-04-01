describe('PennyFlow Analysis Page', () => {
    beforeEach(() => {
      // Assuming the user is logged in and visiting the expenses page
      cy.visit('http://localhost:8080/login');
      cy.get('#username').type('charchika349'); // Replace with valid username
      cy.get('#password').type('Viratkohli@18'); // Replace with valid password
      cy.get('.login-button').click();
      
      // Wait for the page to load and then click the "Analyze" option from the dropdown menu
      cy.url().should('include', '/expenses');  // Ensure we're on the expenses page
      
      // Click on the dropdown menu in the top-right and select 'Analysis'
      cy.get('.user-dropdown').click();
      cy.get('.user-dropdown a').contains('Analysis').click();
      
      // Wait for the page to redirect to the analysis page
    });
  
    it('should display the Analysis header', () => {
      cy.get('h2').should('contain', 'Expense Breakdown by Category');
    });
  
    it('should navigate back to the Expenses page when clicking "Back Home"', () => {
      cy.get('.back-home').click();
      cy.url().should('include', '/expenses');
    });
  });
  