describe('Pennyflow About Us Page Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/about-us');
    });
  
    it('should display the header with title and description', () => {
      cy.get('header h1').should('contain', 'Pennyflow');
      cy.get('header p').should('contain', 'Meet the team behind your favorite financial tracking app.');
    });
  
    it('should display the mission statement', () => {
      cy.get('.content h2').contains('Our Mission').should('exist');
      cy.get('.content p').should('contain', 'At Pennyflow, we believe in making financial tracking easy');
    });
  
    it('should display all team members with correct details', () => {
      const teamMembers = [
        { name: 'Kundana Gullipalli', role: 'Frontend developer' },
        { name: 'Charchika Mishra', role: 'Frontend developer' },
        { name: 'Suraj Doddi', role: 'Backend developer' },
        { name: 'Umesh Chandra', role: 'Backend developer' }
      ];
  
      cy.get('.team > div').should('have.length', 4);
  
      teamMembers.forEach((member, index) => {
        cy.get('.team > div').eq(index).within(() => {
          cy.get('h3').should('contain', member.name);
          cy.get('p').first().should('contain', member.role);
          cy.get('img').should('have.attr', 'alt').and('include', 'Team Member');
        });
      });
    });
  
    it('should display team member images with correct source paths', () => {
      cy.get('.team img').each(($img) => {
        cy.wrap($img).should('have.attr', 'src').and('match', /static\/assets\/.*\.jpg/);
      });
    });
  
    it('should display the footer with correct copyright text', () => {
      cy.get('footer p').should('contain', '© 2025 Pennyflow | All rights reserved.');
    });
  });
  