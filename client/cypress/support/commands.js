// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
Cypress.Commands.add('fillBasicForm', () => {
  cy.get('input[name="name"]').type('John Doe');
  cy.get('input[name="email"]').type('q6k9V@example.com');
  cy.get('input[name="birthdate"]').type('1990-01-01');
  cy.get('select').select('Ciencias e Investigación');
  cy.get('button').click();
});

Cypress.Commands.add('fillProfileForm', () => {
  cy.intercept({
    method: 'GET',
    url: /\/users\/categories\?category=.*/,
  }).as('getUsersOfCategory');
  cy.wait(5002);
  cy.get('button').click();
  cy.wait('@getUsersOfCategory');
  cy.wait(500);
  cy.get('article').should('be.visible');
  for (let i = 0; i < 6; i++) {
    cy.get('#arrowUp').click();
  }
  cy.get('#arrowRight').click();
  cy.get('#arrowLeft').click();
  cy.get('').should('not.exist');
  cy.get('#continueBtn').should('be.visible');
  cy.get('#continueBtn').click();
});

Cypress.Commands.add('fillProfessionForm', () => {
  cy.get('.grid div')
    .should('be.visible')
    .each(($div) => {
      cy.wrap($div).click();
    });
  cy.get('button').eq(1).click();
});
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
