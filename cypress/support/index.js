import './commands';

export const appSelectors = {
    ingredients: {
        bun: '[data-cy=burger-ingredient-bun]',
        main: '[data-cy=burger-ingredient-main]',
        sauce: '[data-cy=burger-ingredient-sauce]',
      },
      constructor: {
        container: '[data-cy=constructor-ingredients-container]',
        topBun: '[data-cy=constructor-bun-top]',
        bottomBun: '[data-cy=constructor-bun-bottom]',
        items: '[data-cy=constructor-ingredients-container]',
        sendOrder:  '[data-cy=send-order]',
        ingredientBun: '[data-cy=burger-ingredient-bun]',
        ingredientMain: '[data-cy=burger-ingredient-main]',
        ingredientSauce: '[data-cy=burger-ingredient-sauce]',
      },
    login: {
        emailField: '[data-cy=email]',
        passwordField: '[data-cy=password]',
        loginButton: '[data-cy=login-button]'
    },
    modal: {
       orderNumber: '[data-cy=order-number]',
       close: '[data-cy=close-button]',
       orderNumber: '[data-cy=order-number]',
       ingredientName: '[data-cy=ingredient-name]'
    }
};

Cypress.appSelectors = appSelectors;
