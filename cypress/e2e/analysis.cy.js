describe('PennyFlow Analysis Page', () => {
  beforeEach(() => {
    // ✅ Intercept the expenses API to avoid backend auth issues
    cy.intercept('GET', 'http://localhost:8080/expenses/', {
      statusCode: 200,
      body: {
        userName: 'Test User',
        expenses: [
          {
            Amount: '20.00',
            Category: 'Food',
            CreatedAt: '2025-04-01',
            PaymentMethod: 'Cash',
          },
          {
            Amount: '50.00',
            Category: 'Transport',
            CreatedAt: '2025-04-03',
            PaymentMethod: 'Card',
          },
        ],
      },
    }).as('getExpenses');

    // ✅ Visit the analysis page
    cy.visit('http://localhost:3000/analysis');
  });

  it('should display the header and navbar', () => {
    cy.get('header').should('exist');
    cy.get('.page-title').should('contain', 'Penny Flow');
    cy.get('.page-subtitle').should(
      'contain',
      'Track and Manage Your Expenses'
    );
  });

  it('should display key metrics and user name', () => {
    cy.get('.metrics-grid').should('exist');
    cy.get('.metric-card').should('have.length.at.least', 1);
    cy.get('.user-name').should('contain', 'Test User');
  });

  it('should display all charts', () => {
    cy.get('#trendChart').should('exist');
    cy.get('#categoryChart').should('exist');
    cy.get('#paymentChart').should('exist');
  });

  it('should show dropdown and logout button on user icon click', () => {
    cy.get('.user-dropdown').click();
    cy.get('.dropdown-menu.show').should('exist');
    cy.get('.logout-btn').should('contain', 'Logout');
  });

  it('should not redirect to login if mock is in place', () => {
    cy.url().should('include', '/analysis');
  });
});
