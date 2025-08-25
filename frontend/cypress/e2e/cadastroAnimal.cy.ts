describe('Cadastro de Animal', () => {
  beforeEach(() => {
    //Simula um usuário logado
    cy.setCookie('token', 'fake-jwt-token');
    localStorage.setItem('user', JSON.stringify({ id: '123', name: 'Usuario Teste', email: 'teste@email.com' }));

    cy.intercept('POST', '**/animals', {
      statusCode: 201,
      body: { message: 'Animal cadastrado com sucesso!' },
    }).as('animalRegisterRequest');

    //Visita a página de cadastro de animal
    cy.visit('/area_logada/disponibilizar_animal');
  });

  it('deve permitir o cadastro de um novo animal', () => {
    //Preenche os campos
    cy.get('input[name="name"]').type('Doguinho');
    
    cy.get('button[role="combobox"]').first().click(); //Abre o select de Tipo
    cy.contains('Cachorro').click();

    cy.get('button[role="combobox"]').eq(1).click(); //Abre o select de Gênero
    cy.contains('Macho').click();
    
    cy.get('input[name="race"]').type('SRD');
    cy.get('textarea[name="description"]').type('Um doguinho muito amigável');

    //Faz o upload de uma imagem de fixture do Cypress
    cy.get('input[type="file"]').selectFile('cypress/fixtures/dog.jpg', { force: true });

    //Clica no botão para cadastrar
    cy.contains('button', 'Cadastrar').click();

    //Espera a requisição
    cy.wait('@animalRegisterRequest');

    //Verifica se foi redirecionado para a página "Meus Animais"
    cy.url().should('include', '/area_logada/meus_animais');
  });
});