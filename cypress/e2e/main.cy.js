import { appSelectors } from '../support/index';

describe("Drag and Drop Функционал", () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');

    cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login', {
      success: true,
      body: { success: true, accessToken: 'fakeAccessToken', refreshToken: 'fakeRefreshToken' , "user": {
        "email": "drevan777@gmail.com",
        "name": "gfhfghfgh"
    }}
    }).as('postLogin');


    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
      success: true,
      body: { success: true, order: { number: '123456' } }
    }).as('postOrder');


    cy.visit('/');
    cy.viewport(1400, 1000);
  });

  describe('Тестирование создания заказа', () => {
    it('Создает заказ', () => {
      cy.wait('@getIngredients').its('response.statusCode').should('eq', 200);
      cy.get(appSelectors.ingredients.main).first().trigger('click');
      cy.wait(1000);
      cy.get(appSelectors.modal.ingredientName).should('not.be.empty');
      cy.get(appSelectors.modal.close).trigger('click');
      cy.get(appSelectors.ingredients.bun).first().trigger('dragstart');
      cy.get(appSelectors.constructor.container).should('exist').trigger('drop');



      cy.get(appSelectors.ingredients.main).first().trigger('dragstart');
      cy.get(appSelectors.constructor.container).trigger('drop');
      cy.get(appSelectors.ingredients.sauce).first().trigger('dragstart');
      cy.get(appSelectors.constructor.container).trigger('drop');
      cy.get(appSelectors.constructor.burgerItems).should('not.be.empty');
      cy.get(appSelectors.constructor.ingredientMain).should('exist');
      cy.get(appSelectors.constructor.ingredientSauce).should('exist');
      cy.get(appSelectors.constructor.sendOrder).trigger('click');
      cy.wait(1000);

      const email = 'drevan777@gmail.com';
      const password = 'Test123';

  
      cy.get(appSelectors.login.emailField)
        .should('be.visible')
        .type(email);

      cy.get(appSelectors.login.passwordField)
        .should('be.visible')
        .type(password);

      cy.get(appSelectors.login.loginButton)
        .should('be.visible')
        .click();
      cy.wait('@postLogin').its('response.statusCode').should('eq', 200);
      cy.get(appSelectors.constructor.sendOrder).trigger('click');
      cy.wait('@postOrder').its('response.statusCode').should('eq', 200);
      cy.get(appSelectors.modal.orderNumber).should('exist');
      cy.get(appSelectors.modal.close).trigger('click');
      cy.wait(5000);
    });
  });
});
