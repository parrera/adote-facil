describe('Cadastro de Usuário', () => {
  it('deve permitir que um novo usuário se cadastre com sucesso', () => {
    cy.intercept('POST', '**/users', {
      statusCode: 201,
      body: { message: 'Cadastro efetuado com sucesso!' },
    }).as('registerRequest');

    //Entra na página de cadastro
    cy.visit('/cadastro');

    //Preenche o formulário de cadastro
    cy.get('input[name="name"]').type('Muzzeti');
    cy.get('input[name="email"]').type('muzzeti@email.com');
    cy.get('input[name="password"]').type('senha123');
    cy.get('input[name="confirmPassword"]').type('senha123');

    //Clica no botão de cadastrar
    cy.contains('button', 'Cadastrar').click();

    //Espera o processo ser completado
    cy.wait('@registerRequest');

    //Verifica se foi para a página de login
    cy.url().should('include', '/login');
  });
});