import { appSelectors } from '../support/index';

describe("Drag and Drop Functionality", () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport(1400, 1000);
  });

  describe('Dragging ingredients into the constructor', () => {
    it('Dragging the bun', () => {
      // Wait for the first ingredient to load
      cy.wait(1000);

      // Найти первый элемент с атрибутом data-cy="burger-ingredient-bun"
      cy.get(appSelectors.ingredients.ingredientBun).first().trigger('dragstart');
      cy.get(appSelectors.constructor.constructorContainer).should('exist').trigger('drop');

      cy.get(appSelectors.constructor.topBun).should('exist');
      cy.get(appSelectors.constructor.bottomBun).should('exist');

      cy.get(appSelectors.ingredients.bun).first().trigger('dragstart'); // Пример использования другого типа ингредиента
      cy.get(appSelectors.constructor.constructorContainer).trigger('drop');
      cy.get(appSelectors.constructor.burgerItems).should('not.be.empty');
    });
  });
});
