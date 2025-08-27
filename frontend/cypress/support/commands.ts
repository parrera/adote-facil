/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
  const mockUser = { id: '123', name: 'Muzzeti', email: 'muzzeti@email.com' };
  const mockToken = 'fake-jwt-token';

  cy.setCookie('token', mockToken, { path: '/' });

  cy.window().then((win) => {
    win.localStorage.setItem('user', JSON.stringify(mockUser));
  });
});

