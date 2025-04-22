describe('PennyFlow Expenses Page', () => {
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
            Description: 'Uber Ride',
            Amount: '250.00',
            Category: 'Transport',
            PaymentMethod: 'Card',
            CreatedAt: '2025-04-02T15:30:00Z'
          }
        ]
      }
    }).as('getExpenses');

    cy.visit('http://localhost:3000/expenses');
  });

  it('should show header and user name', () => {
    cy.get('header').should('exist');
    cy.get('.user-name').should('contain', 'Test User');
  });

  it('should render the expenses table with data', () => {
    cy.get('.expenses-table tbody tr').should('have.length', 2);
    cy.contains('td', 'Lunch');
    cy.contains('td', 'Uber Ride');
  });

  it('should show total expenses correctly', () => {
    cy.get('.total-amount').should('contain', '₹400.00');
  });

  it('should have Edit and Delete buttons for each expense', () => {
    cy.get('.edit-button').should('have.length', 2);
    cy.get('.delete-button').should('have.length', 2);
  });

  it('should show Add New Expense button', () => {
    cy.contains('a', 'Add New Expense').should('exist');
  });
});
