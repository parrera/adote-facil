describe('Lista de Pets', () => {
  it('Deve exibir a listagem de animais', () => {
    cy.visit('http://localhost:3000');

    cy.get('img').should('have.length.at.least', 1); 
  });
});
