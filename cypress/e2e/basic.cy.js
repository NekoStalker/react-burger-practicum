import { appSelectors } from '../support/index';

describe("Drag and Drop Functionality", () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    
    cy.visit('/');
    cy.viewport(1400, 1000);
  });

  describe('Dragging ingredients into the constructor', () => {
    it('Dragging the bun', () => {
      cy.wait(5000);


      cy.get(appSelectors.ingredients.main).first().trigger('click');
      cy.wait(1000);
      cy.get(appSelectors.modal.ingredientName).should('not.be.empty');
      cy.get(appSelectors.modal.close).trigger('click');
      // Найти первый элемент с атрибутом data-cy="burger-ingredient-bun"
      cy.get(appSelectors.ingredients.bun).first().trigger('dragstart');
      cy.get(appSelectors.constructor.container).should('exist').trigger('drop');

      // cy.get(appSelectors.constructor.topBun).should('exist');
      // cy.get(appSelectors.constructor.bottomBun).should('exist');

      cy.get(appSelectors.ingredients.main).first().trigger('dragstart'); // Пример использования другого типа ингредиента
      cy.get(appSelectors.constructor.container).trigger('drop');
      cy.get(appSelectors.ingredients.sauce).first().trigger('dragstart'); 
      cy.get(appSelectors.constructor.container).trigger('drop');
      cy.get(appSelectors.constructor.burgerItems).should('not.be.empty');

      cy.get(appSelectors.constructor.sendOrder).trigger('click');
      cy.wait(1000);
      const email = 'drevan777@gmail.com';
      const password = 'Avatar007';

      // Получение поля ввода email и ввод email
      cy.get(appSelectors.login.emailField)
        .should('be.visible')
        .type(email);

      // Получение поля ввода пароля и ввод пароля
      cy.get(appSelectors.login.passwordField)
        .should('be.visible')
        .type(password);

      // Нажатие на кнопку входа
      cy.get(appSelectors.login.loginButton)
        .should('be.visible')
        .click();
      cy.wait(1000);
      cy.get(appSelectors.constructor.sendOrder).trigger('click');
      cy.wait(16000);
      cy.get(appSelectors.modal.orderNumber).should('exist');
      cy.get(appSelectors.modal.close).trigger('click');
    });
  });
});
