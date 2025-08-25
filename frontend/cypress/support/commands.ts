/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
  const mockUser = { id: '123', name: 'Muzzeti', email: 'muzzeti@email.com' };
  const mockToken = 'fake-jwt-token';

  // Cria o cookie de autenticação no caminho raiz '/'
  // Isso garante que ele será enviado para QUALQUER página do site.
  cy.setCookie('token', mockToken, { path: '/' });

  // Cria o item no localStorage que a UI espera para mostrar o nome
  cy.window().then((win) => {
    win.localStorage.setItem('user', JSON.stringify(mockUser));
  });
});