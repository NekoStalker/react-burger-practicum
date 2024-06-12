import { selectors } from '../support/index';

describe('UI тесты', () => {
  it('Должно отображаться имя пользователя после логина', () => {
    const email = 'karvraburcar@kpjprd.rs';
    const password = 'beograd';
    cy.viewport(1400, 1000);
    cy.visit('/login');
    cy.get(selectors.login.emailField).type(email);
    cy.get(selectors.login.passwordField).type(password);
    cy.get(selectors.login.loginButton).click();

  });
});
