describe('Fluxo de Cadastro de Animal', () => {
  beforeEach(() => {
    // Intercepta a chamada de API de login para simular a resposta do backend
    cy.intercept('POST', '**/login', {
      statusCode: 201,
      body: {
        token: 'fake-jwt-token',
        user: { id: '123', name: 'Muzzeti', email: 'muzzeti@email.com' },
      },
    }).as('loginRequest');

    // Intercepta a chamada de API de cadastro de animal
    cy.intercept('POST', '**/animals', {
      statusCode: 201,
      body: { message: 'Animal cadastrado com sucesso!' },
    }).as('animalRegisterRequest');
  });

  it('deve fazer login e permitir o cadastro de um novo animal', () => {
    // --- PARTE 1: LOGIN DO USUÁRIO ---
    cy.visit('/login');
    cy.get('input[name="email"]').type('muzzeti@email.com');
    cy.get('input[name="password"]').type('senha123');
    cy.contains('button', 'Login').click();
    
    // Aguarda a resposta da API e o redirecionamento implícito
    cy.wait('@loginRequest');
    cy.get('.sc-a06d05ba-0')
    cy.click

    // --- PARTE 2: CADASTRO DO ANIMAL ---
    cy.visit('/area_logada/disponibilizar_animal');

    // Preenche os campos do formulário
    cy.get('input[name="name"]').type('Doguinho');
    
    cy.get('button[role="combobox"]').first().click(); // Abre o Tipo
    cy.contains('Cachorro').click();

    cy.get('button[role="combobox"]').eq(1).click(); // Abre o Gênero
    cy.contains('Macho').click();
    
    cy.get('input[name="race"]').type('SRD');
    cy.get('textarea[name="description"]').type('Um cachorro muito carinhoso');

    // Faz o upload de uma imagem (lembre-se de ter este arquivo na pasta cypress/fixtures/)
    cy.get('input[type="file"]').selectFile('cypress/fixtures/cachorro.jpeg', { force: true });

    // Clica no botão para cadastrar
    cy.contains('button', 'Cadastrar').click();

    // Espera a requisição da API de cadastro
    cy.wait('@animalRegisterRequest');

    // Verifica se foi redirecionado para a página "Meus Animais"
    cy.url().should('include', '/area_logada/meus_animais');
  });
});