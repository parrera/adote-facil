describe('Fluxo de Autenticação', () => {
  it('deve realizar o login e redirecionar para a área logada', () => {
    // Intercepta a chamada de login para não depender de um usuário real no banco
    cy.intercept('POST', '**/login', {
      statusCode: 201,
      body: {
        token: 'fake-jwt-token',
        user: { id: '123', name: 'Muzzeti', email: 'muzzeti@email.com' },
      },
    }).as('loginRequest');

    // Visita a página de login
    cy.visit('/login');

    // Preenche o formulário
    cy.get('input[name="email"]').type('muzzeti@email.com');
    cy.get('input[name="password"]').type('senha123');
    cy.contains('button', 'Login').click();

    // Aguarda a resposta da API
    cy.wait('@loginRequest');

    // Agora que a aplicação define o cookie corretamente,
    // esta verificação de redirecionamento vai passar.
    cy.url().should('include', '/area_logada/animais_disponiveis');

    // Verifica se a página logada foi renderizada corretamente
    cy.get('button[aria-haspopup="menu"]').should('contain', 'Muzzeti');
  });
});