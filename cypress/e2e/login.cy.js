import { appSelectors } from '../support/index';

describe('UI тесты', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.viewport(1400, 1000);
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login', {
      success: true,
      body: { success: true, accessToken: 'fakeAccessToken', refreshToken: 'fakeRefreshToken',  "user": {
        "email": "drevan777@gmail.com",
        "name": "gfhfghfgh"
    } }
    }).as('postLogin');
  });

  it('Должен авторизоваться в системе', () => {
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
  });

});
