describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should enter the page and display the title', () => {
    cy.get('h2').should('have.text', 'Bienvenido a Magneto!');
  });

  it('should display errors when submitting the form without filling all the fields', () => {
    cy.get('button').click();
    cy.get('#nameError').should('be.visible');
    cy.get('#emailError').should('be.visible');
    cy.get('#birthdateError').should('be.visible');
    cy.get('#categoryError').should('be.visible');
  });

  it('should submit the form with valid data', () => {
    cy.fillBasicForm();
    cy.get('h2').should('contain.text', '¡Descubre tu perfil ideal!');
  });

  it('should show the profiles Form', () => {
    cy.fillBasicForm();
    cy.get('button').should('be.disabled');

    cy.wait(6000);
    cy.get('button').should('not.be.disabled');
    cy.get('button').click();
    cy.get('p').first().should('have.text', 'Haz click y desliza!');
    cy.get('small').should('be.visible');
  });

  it('should fetch the profiles and show them ', () => {
    cy.intercept({
      method: 'GET',
      url: /\/users\/categories\?category=.*/,
    }).as('getUsersOfCategory');

    cy.fillBasicForm();
    cy.wait(5002);
    cy.get('button').click();
    cy.get('article').should('not.exist');
    cy.wait('@getUsersOfCategory');
    cy.wait(500);
    cy.get('article').should('be.visible');
    for (let i = 0; i < 6; i++) {
      cy.get('#arrowUp').click();
    }
    cy.get('#arrowRight').click();
    cy.get('#arrowLeft').click();
    cy.get('').should('not.exist');
    cy.get('#counter').should('have.text', '7');
    cy.get('#continueBtn').should('be.visible');
  });

  it('should complete the profile form and show the occupation form', () => {
    cy.intercept({
      method: 'POST',
      url: '*generate',
    }).as('postGenerate');
    cy.fillBasicForm();
    cy.fillProfileForm();
    cy.wait('@postGenerate'); //validar response
    cy.get('h2').should('contain.text', 'Un ultimo paso');
  });

  it('should display error message when submitting the form without selecting any occupation', () => {
    cy.fillBasicForm();
    cy.fillProfileForm();
    cy.get('#occupationError').should('not.exist');
    cy.get('button').eq(1).click();
    cy.get('#occupationError').should('be.visible');
  });

  it('should complete the profession form ', () => {
    cy.fillBasicForm();
    cy.fillProfileForm();
    cy.get('.grid div')
      .should('be.visible')
      .each(($div) => {
        cy.wrap($div).click();
      });
    cy.get('button').eq(1).click();
  });

  it('should show the editing panel and finish the process', () => {
    cy.fillBasicForm();
    cy.fillProfileForm();
    cy.fillProfessionForm();
    cy.get('button').eq(2).click();
  });
});

