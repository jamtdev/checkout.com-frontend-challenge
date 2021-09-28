Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Feedback page', () => {
  beforeEach(() => {
    cy.visit('/feedback/6');
  });

  it('user cannot create review with missing fields', () => {
    cy.get('button[data-testid="FeedbackForm__Submit"]').click();

    cy.get('div[role="alert"]').contains('Please enter your name.');
    cy.get('div[role="alert"]').contains('Please enter a valid email address.');
    cy.get('div[role="alert"]').contains('Please give the product a rating');
  });

  it('user can create review with valid fields', () => {
    cy.get('input[id="feedback_name').type('Cypress');

    cy.get('input[id="feedback_email').type('cypress@testing.com');

    cy.get('div[data-testid="FeedbackForm__Rating"]')
      .get('.ant-rate-star > div[role="radio"]')
      .eq(Math.floor(Math.random() * 4))
      .click();

    cy.get('textarea[id="feedback_comment"]').type(
      'This is an auto-generated review by Cypress.'
    );

    cy.get('button[data-testid="FeedbackForm__Submit"]').click();

    cy.get('div[class="ant-result ant-result-success"]').contains(
      'Review submitted'
    );
  });

  it('user can navigate back to the index page', () => {
    cy.get('a[href="/"]').contains('Products').click();

    cy.url().should('equal', 'http://localhost:3000/');
  });
});

export {};
