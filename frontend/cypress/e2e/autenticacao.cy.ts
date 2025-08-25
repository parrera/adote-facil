describe('Autenticação', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/login', {
      statusCode: 201,
      body: {
        token: 'fake-jwt-token',
        user: { id: '123', name: 'Usuario Teste', email: 'teste@email.com' },
      },
    }).as('loginRequest');

    //Visita a página de login
    cy.visit('/login');
  });

  it('deve permitir que um usuário faça login com sucesso', () => {
    // Preenche o formulário de login
    cy.get('input[name="email"]').type('teste@email.com');
    cy.get('input[name="password"]').type('senha123');

    //Clica no botão de login
    cy.contains('button', 'Login').click();

    cy.wait('@loginRequest');

    //Confere o redirecionamento para a área logada
    cy.url().should('include', '/area_logada/animais_disponiveis');

    //Verifica se o nome do usuario aparece no menu
    cy.contains('Usuario Teste').should('be.visible');
  });

  it('deve permitir que um usuário faça logout com sucesso', () => {
    //Simula o login para poder testar o logout
    cy.get('input[name="email"]').type('novousuario@teste.com');
    cy.get('input[name="password"]').type('senha123');
    cy.contains('button', 'Login').click();
    cy.wait('@loginRequest');

    //clica no botão de sair
    cy.contains('span', 'Sair').click();

    //Verifica se foi redirecionado pra página de login
    cy.url().should('include', '/login');
  });
});