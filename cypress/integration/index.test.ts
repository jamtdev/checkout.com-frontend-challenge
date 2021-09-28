Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Index page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('clicking a product navigates to its feedback page', () => {
    cy.get('div[data-testid*="ProductItem__"]').first().click();

    cy.url().should('contain', '/feedback/');

    cy.get('h1').should('contain', 'Customer Feedback');
  });
});

export {};
