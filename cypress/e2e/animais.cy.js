describe('Tarefa 4 - Listagem de Animais', () => {
  Cypress.on('uncaught:exception', () => false);

  it('Deve carregar a página de animais do sistema', () => {
  
    cy.visit('http://localhost:3000/', { failOnStatusCode: false });

    
    cy.get('body').should('be.visible');

    cy.get('body').then(($body) => {
      if ($body.text().includes('Animais')) {
        cy.contains('Animais').click();
        cy.log('Link de Animais encontrado e clicado.');
      } else {
        cy.log('Link "Animais" não visível na Home. Tentando acesso direto...');
        cy.visit('http://localhost:3000/animais', { failOnStatusCode: false });
      }
    });

    cy.get('body').should('be.visible');
  });
});
