describe('Fluxo de Cadastro de Animal', () => {
  beforeEach(() => {
=    cy.intercept('POST', '**/login', {
      statusCode: 201,
      body: {
        token: 'fake-jwt-token',
        user: { id: '123', name: 'Muzzeti', email: 'muzzeti@email.com' },
      },
    }).as('loginRequest');

=    cy.intercept('POST', '**/animals', {
      statusCode: 201,
      body: { message: 'Animal cadastrado com sucesso!' },
    }).as('animalRegisterRequest');
  });

  it('faz o login e permite o cadastro de um novo animal', () => {

    cy.visit('/login');
    cy.get('input[name="email"]').type('muzzeti@email.com');
    cy.get('input[name="password"]').type('senha123');
    cy.contains('button', 'Login').click();
    
    cy.wait('@loginRequest');
    cy.get('.sc-a06d05ba-0')
    cy.click

    cy.visit('/area_logada/disponibilizar_animal');

    // Preenche os campos do formulário
    cy.get('input[name="name"]').type('Doguinho');
    

    cy.get('button[role="combobox"]').first().click(); // tipo
    cy.contains('Cachorro').click();

    cy.get('button[role="combobox"]').eq(1).click(); // gênero
    cy.contains('Macho').click();
    
    cy.get('input[name="race"]').type('SRD');
    cy.get('textarea[name="description"]').type('Um cachorro muito carinhoso');

    cy.get('input[type="file"]').selectFile('cypress/fixtures/cachorro.jpeg', { force: true });

    // Clica no botão para cadastrar
    cy.contains('button', 'Cadastrar').click();

    // Espera a requisição
    cy.wait('@animalRegisterRequest');

    // Verifica se foi redirecionado para a página "Meus Animais"
    cy.url().should('include', '/area_logada/meus_animais');
  });
});