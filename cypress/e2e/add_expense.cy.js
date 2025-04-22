describe('Add Expense Page', () => {
  it('just checks the page and one field', () => {
    cy.visit('http://localhost:3000/add_expense'); // Make sure this is correct!

    // ✅ Check one visible element exists
    cy.get('input[name="description"]').should('exist');
  });
});
