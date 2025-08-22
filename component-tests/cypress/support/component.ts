import { mount } from 'cypress/react';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount);

beforeEach(() => {
  cy.window().then(win => {
    win.localStorage.clear();
    win.sessionStorage.clear();
  });
});
