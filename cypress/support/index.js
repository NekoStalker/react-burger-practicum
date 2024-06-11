<<<<<<< HEAD
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
=======
// cypress/support/index.js


import './commands';

export const appSelectors = {
    ingredientCards: '.ingredient-card', // Замените на ваш актуальный селектор
    constructorContainer: '.constructor-container', // Замените на ваш актуальный селектор
    topBun: '.constructor-bun-top', // Замените на ваш актуальный селектор
    bottomBun: '.constructor-bun-bottom', // Замените на ваш актуальный селектор
    innerItems: '.constructor-inner-items' // Замените на ваш актуальный селектор
};

// Добавьте селекторы в глобальную область видимости Cypress, если это необходимо
Cypress.appSelectors = appSelectors;
>>>>>>> f3b7673 (minor)
