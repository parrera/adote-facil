describe('Cadastro de usuario', () => {
  it('teste de efetuar cadastro de um novo usuario', () => {
    cy.visit('http://localhost:3000/cadastro');
    cy.get('input[name="name"]').type('novoUSER');
    cy.get('input[name="email"]').type('novousuario@email.com');
    cy.get('input[name="password"]').type('senha123');
    cy.get('input[name="confirmPassword"]').type('senha123');
    cy.get('button[type="submit"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Cadastro efetuado com sucesso. Faça login para acessar');
    });
    cy.url().should('include', '/login');
  });
});