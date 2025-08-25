describe('Atualização de Perfil', () => {
  beforeEach(() => {

    //SIMULANDO que o usuario já esteja logado...

    cy.setCookie('token', 'fake-jwt-token');
    localStorage.setItem('user', JSON.stringify({ id: '123', name: 'Usuario Teste', email: 'teste@email.com' }));

    //visita a area de editar dados
    cy.visit('/area_logada/editar_dados');
  });

  it('deve permitir que o usuário atualize seu nome com sucesso', () => {
    // Intercepta a chamada de API para simular uma resposta de sucesso
    // Isso garante que o teste não dependa do backend estar funcionando
    cy.intercept('PATCH', '**/users', {
      statusCode: 200, // OK
      body: { message: 'Dados atualizados com sucesso!' },
    }).as('updateUserRequest');

    // Encontra o campo de nome, limpa o valor antigo e digita um novo
    cy.get('input[name="name"]')
      .clear()
      .type('Nome Atualizado');

    // Clica no botão para salvar as alterações
    cy.contains('button', 'Salvar').click();

    // Espera a requisição para a API ser completada
    cy.wait('@updateUserRequest');

    // Aqui, poderíamos verificar uma mensagem de sucesso na tela.
    // Como o projeto não exibe uma, vamos apenas garantir que a URL
    // permanece a mesma após a atualização bem-sucedida.
    cy.url().should('include', '/area_logada/editar_dados');
  });
});