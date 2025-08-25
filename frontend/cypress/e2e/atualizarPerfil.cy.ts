describe('Atualização de Perfil', () => {
  beforeEach(() => {

    //PRESUMINDO que o usuario já esteja logado

    cy.setCookie('token', 'fake-jwt-token');
    localStorage.setItem('user', JSON.stringify({ id: '123', name: 'Usuario Teste', email: 'teste@email.com' }));

    //visita a area de editar dados
    cy.visit('/area_logada/editar_dados');
  });

  it('deve permitir que o usuário atualize seu nome com sucesso', () => {
    cy.intercept('PATCH', '**/users', {
      statusCode: 200, // OK
      body: { message: 'Dados atualizados com sucesso!' },
    }).as('updateUserRequest');

    //Encontra o campo de nome, limpa o valor antigo e digita um novo
    cy.get('input[name="name"]')
      .clear()
      .type('Nome Atualizado');

    //salva as alteracões
    cy.contains('button', 'Salvar').click();

    //Espera a requisição para a API ser completada
    cy.wait('@updateUserRequest');

    cy.url().should('include', '/area_logada/editar_dados');
  });
});