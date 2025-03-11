describe('PennyFlow Expenses Page Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/expenses');
    });
  
    it('should display the header with title and description', () => {
      cy.get('header h1').should('contain', 'Expense Tracker');
      cy.get('header p').should('contain', 'Track and Manage Your Expenses');
    });
  
    it('should display the expense table if expenses exist', () => {
      cy.get('body').then($body => {
        if ($body.find('.expenses-table').length) {
          // If expenses exist, check the table structure
          cy.get('.expenses-table thead tr th').should('have.length', 4);
          cy.get('.expenses-table thead tr').within(() => {
            cy.get('th').eq(0).should('contain', 'ID');
            cy.get('th').eq(1).should('contain', 'Description');
            cy.get('th').eq(2).should('contain', 'Amount');
            cy.get('th').eq(3).should('contain', 'Date');
          });
  
          cy.get('.expenses-table tbody tr').should('have.length.greaterThan', 0);
        } else {
          // If no expenses, ensure the "no expenses" message is displayed
          cy.get('.no-expenses').should('contain', 'No expenses recorded yet. Start tracking your spending!');
        }
      });
    });
  
    it('should display total expenses only if expenses exist', () => {
      cy.get('body').then($body => {
        if ($body.find('.total-expenses').length) {
          cy.get('.total-expenses').should('contain', 'Total Expenses: $');
        } else {
          cy.log('No expenses found, skipping total expenses check.');
        }
      });
    });
  
    it('should display action buttons with correct links', () => {
      cy.get('.action-buttons a').contains('Add New Expense').should('have.attr', 'href', '/add-expense');
      cy.get('.action-buttons a').contains('Back to Home').should('have.attr', 'href', '/');
    });
  
    it('should display the footer with correct copyright text', () => {
      cy.get('footer').should('contain', '© 2025 PennyFlow. All Rights Reserved.');
    });
  });
  