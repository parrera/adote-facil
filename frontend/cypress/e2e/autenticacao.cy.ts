describe('Fluxo de Autenticação', () => {
  it('realizar login', () => {
    cy.intercept('POST', '**/login', {
      statusCode: 201,
      body: {
        token: 'fake-jwt-token',
        user: { id: '123', name: 'Muzzeti', email: 'muzzeti@email.com' },
      },
    }).as('loginRequest');

    //visita a página de login
    cy.visit('/login');

    //preeenche o formulário
    cy.get('input[name="email"]').type('muzzeti@email.com');
    cy.get('input[name="password"]').type('senha123');
    cy.contains('button', 'Login').click();

    cy.wait('@loginRequest');

    cy.url().should('include', '/area_logada/animais_disponiveis');

    cy.get('button[aria-haspopup="menu"]').should('contain', 'Muzzeti');
  });
});