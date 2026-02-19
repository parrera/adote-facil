describe('Navegação', () => {
  it('Deve encontrar o botão ou link de Login', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Login').should('exist');
  });
});
