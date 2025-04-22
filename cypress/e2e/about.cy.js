// cypress/e2e/about_us.cy.js

describe('PennyFlow About Us Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/about-us'); // adjust URL if needed
  });

  it('displays the logo, title and subtitle', () => {
    cy.get('.logo').should('be.visible');
    cy.get('.page-title').should('contain', 'Penny Flow');
    cy.get('.page-subtitle').should('contain', 'Track Every Penny, Flow Freely');
  });

  it('displays the header content', () => {
    cy.get('.about-header h1').should('contain', 'About PennyFlow');
    cy.get('.about-header p').should('contain', 'Redefining personal finance management');
  });

  it('displays "Our Story" by default', () => {
    cy.get('#story').should('exist');
    cy.get('#story').within(() => {
      cy.contains('Our Journey').should('exist');
      cy.contains('From Idea to Innovation').should('exist');
    });
  });

  it('switches to Mission & Values tab', () => {
    cy.contains('Mission & Values').click();
    cy.get('#mission').should('exist');
    cy.get('#mission').within(() => {
      cy.contains('Our Mission').should('exist');
      cy.contains('Security First').should('exist');
    });
  });

  it('switches to Our Team tab and validates team member details', () => {
    cy.contains('Our Team').click();
    cy.get('#team').should('exist');
    cy.get('#team').within(() => {
      cy.contains('Kundana Gullipalli').should('exist');
      cy.contains('Charchika Mishra').should('exist');
      cy.contains('Suraj Doddi').should('exist');
      cy.contains('Umesh Chandra').should('exist');
    });
  });

  it('displays the CTA section', () => {
    cy.contains('Ready to take control of your finances?').should('exist');
    cy.contains('Get Started').should('have.attr', 'href', '/register');
    cy.contains('Log In').should('have.attr', 'href', '/login');
  });

  it('displays footer with links and social icons', () => {
    cy.get('footer').within(() => {
      cy.contains('Quick Links').should('exist');
      cy.contains('Connect With Us').should('exist');
      cy.get('.social-icons a').should('have.length.at.least', 3);
    });
  });
});
