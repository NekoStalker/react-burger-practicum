import { selectors } from '../support/index';

describe('UI тесты', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.viewport(1400, 1000);
  });

  it('Должно отображаться имя пользователя после логина', () => {
    const email = 'karvraburcar@kpjprd.rs';
    const password = 'beograd';
    cy.get(selectors.login.emailField).type(email);
    cy.get(selectors.login.passwordField).type(password);
    cy.get(selectors.login.loginButton).click();

  });
});
