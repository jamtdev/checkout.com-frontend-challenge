Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Error page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('navigating to an invalid route displays an error page', () => {
    cy.visit('/invalid', { failOnStatusCode: false });

    cy.request({ url: '/invalid', failOnStatusCode: false })
      .its('status')
      .should('equal', 404);
  });

  it('user can navigate back to index page', () => {
    cy.visit('/invalid', { failOnStatusCode: false });

    cy.get('button[data-testid="Error__Button"]').click();

    cy.url().should('contain', 'http://localhost:3000/');

    cy.get('h1').should('contain', 'Products');
  });
});

export {};
