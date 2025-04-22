describe('Register Page', () => {
  beforeEach(() => {
    // Default success mock for POST /register
    cy.intercept('POST', 'http://localhost:8080/register', {
      statusCode: 201,
      body: { success: true }
    }).as('registerUser');

    cy.visit('http://localhost:3000/register');
  });

  it('should render the registration form', () => {
    cy.contains('h2', 'Create Account').should('exist');
    cy.get('input[name="name"]').should('exist');
    cy.get('input[name="username"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('contain', 'Create Account');
  });

  it('should register successfully and redirect to /login', () => {
    // Fill out the form
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('strongpassword');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Wait for mocked response
    cy.wait('@registerUser');

    // Confirm redirect to /login
    cy.url().should('include', '/login');
  });

  it('should show an error if registration fails', () => {
    // Override intercept to simulate failure
    cy.intercept('POST', 'http://localhost:8080/register', {
      statusCode: 400,
      body: { error: 'Username already exists' }
    }).as('registerFail');

    // Fill form with duplicate username
    cy.get('input[name="name"]').type('Existing User');
    cy.get('input[name="username"]').type('existinguser');
    cy.get('input[name="email"]').type('exist@example.com');
    cy.get('input[name="password"]').type('securepass');

    cy.get('button[type="submit"]').click();

    cy.wait('@registerFail');

    // Check error message
    cy.get('.error-message').should('contain', 'Username already exists');
  });
});
