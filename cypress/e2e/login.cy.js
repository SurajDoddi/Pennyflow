describe('Login Page', () => {
  beforeEach(() => {
    // ✅ Mock login
    cy.intercept('POST', 'http://localhost:8080/login', {
      statusCode: 200,
      body: { success: true },
    }).as('loginRequest');

    // ✅ Mock expenses page load so redirect won't 401
    cy.intercept('GET', 'http://localhost:8080/expenses/', {
      statusCode: 200,
      body: {
        userName: 'Test User',
        expenses: [],
      }
    }).as('getExpenses');

    cy.visit('http://localhost:3000/login');
  });

  it('should successfully login and redirect to /expenses', () => {
    // Fill form
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('password123');

    // Submit form
    cy.get('button[type="submit"]').click();

    // Wait for mocked login and expense fetch
    cy.wait('@loginRequest');
    cy.wait('@getExpenses');

    // ✅ Check we're on /expenses
    cy.url().should('include', '/expenses');

    // ✅ Check header from expenses page
    cy.get('h2.section-title').should('contain', 'Your Expenses');
  });

  it('should show error on failed login', () => {
    // Override login to fail
    cy.intercept('POST', 'http://localhost:8080/login', {
      statusCode: 401,
      body: { error: 'Invalid credentials' }
    }).as('loginFail');

    // Enter wrong credentials
    cy.get('input[name="username"]').type('wronguser');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginFail');

    // ✅ Show error
    cy.get('.error-message').should('contain', 'Invalid credentials');
  });
});
