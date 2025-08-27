describe('Login', () => {
  it('deve fazer login com sucesso', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').type('muzzeti@email.com');
    cy.get('input[name="password"]').type('senha123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/area_logada/animais_disponiveis');
  });
});
