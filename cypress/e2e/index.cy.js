describe('Expenses Page Loads', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8080/expenses/', {
      statusCode: 200,
      body: {
        userName: 'Test User',
        expenses: [
          {
            ID: 1,
            Description: 'Lunch',
            Amount: '150.00',
            Category: 'Food',
            PaymentMethod: 'Cash',
            CreatedAt: '2025-04-01T12:00:00Z'
          },
          {
            ID: 2,
            Description: 'Uber',
            Amount: '250.00',
            Category: 'Transport',
            PaymentMethod: 'Card',
            CreatedAt: '2025-04-02T08:30:00Z'
          }
        ]
      }
    }).as('mockExpenses');

    cy.visit('http://localhost:3000/expenses');
  });

  it('should show the expenses page header', () => {
    cy.get('h2.section-title').should('contain', 'Your Expenses');
  });

  it('should show user name in the top right', () => {
    cy.get('.user-name').should('contain', 'Test User');
  });

  it('should render a row for each expense', () => {
    cy.get('.expenses-table tbody tr').should('have.length', 2);
    cy.contains('td', 'Lunch');
    cy.contains('td', 'Uber');
  });

  it('should show the correct total', () => {
    cy.get('.total-amount').should('contain', '₹400.00');
  });

  it('should have edit and delete buttons', () => {
    cy.get('.edit-button').should('have.length', 2);
    cy.get('.delete-button').should('have.length', 2);
  });
});
