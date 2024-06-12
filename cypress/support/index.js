import './commands';

export const appSelectors = {
    ingredients: {
        bun: '[data-cy="burger-ingredient-bun"]',
        main: '[data-cy="burger-ingredient-main"]',
        sauce: '[data-cy="burger-ingredient-sauce"]',
      },
      constructor: {
        container: '[data-cy="constructor-ingredients-container"]',
        topBun: '[data-cy="constructor-bun-top"]',
        bottomBun: '[data-cy="constructor-bun-bottom"]',
        items: '[data-cy="constructor-ingredients-container"]',
      },
    login: {
        emailField: '[data-cy="email"]',
        passwordField: '[data-cy="password"]',
        loginButton: '[data-cy="login-button"]'
    },
    modal: {
       orderNumber: '[data-cy="order-number"]',
       close: '[data-cy="close-button"]',
       orderNumber: '[data-cy="order-number"]',
    }
};

Cypress.appSelectors = appSelectors;