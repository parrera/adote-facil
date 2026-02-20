Cypress.on('uncaught:exception', (err) => {
  return false;
});

describe('Cadastro de Animal para Adoção', () => {
  // Mantemos o nome genérico Rex conforme sua preferência
  const nomeAnimal = `Rex ${Math.floor(Math.random() * 1000)}`;

  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('/login');
    cy.get('input[name="email"]').type('doador@doador.com');
    cy.get('input[name="password"]').type('doadoraf');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/area_logada');
  });

  it('Cenário 1: Cadastro com sucesso (Cachorro e Macho)', () => {
    cy.visit('/area_logada/disponibilizar_animal');
    cy.wait(3000); 

    // 1. Nome
    cy.get('input[name="name"], input[name="nome"]').first().type(nomeAnimal);

    // 2. SELECIONAR TIPO (Cachorro)
    cy.contains('Selecione um tipo').click({ force: true });
    cy.wait(500);
    cy.focused().type('{downarrow}{enter}'); 
    cy.contains('Cachorro').should('be.visible');

    // 3. SELECIONAR GÊNERO (Macho)
    cy.contains('Selecione um gênero').click({ force: true });
    cy.wait(500);
    cy.focused().type('{downarrow}{enter}');
    cy.contains('Macho').should('be.visible');

    // 4. FOTO
    cy.get('#animalPictures').selectFile('cypress/fixtures/foto.jpg', { force: true });
    cy.get('img', { timeout: 7000 }).should('be.visible');

    // 5. CADASTRAR
    cy.contains('button', 'Cadastrar').click({ force: true });

    // 6. VALIDAÇÃO FINAL
    cy.url({ timeout: 20000 }).should('not.include', '/disponibilizar_animal');
    cy.contains(nomeAnimal).should('exist');
  });

  it('Cenário 2: Validar bloqueio de campos obrigatórios', () => {
    cy.visit('/area_logada/disponibilizar_animal');
    cy.wait(2000);

    // Tenta cadastrar sem preencher nada
    cy.contains('button', 'Cadastrar').click({ force: true });

    // VALIDAÇÕES DE ERRO (Baseadas nos prints que você mandou)
    // O sistema deve exibir as mensagens em vermelho e não mudar de página
    cy.contains('O tipo é obrigatório').should('be.visible');
    cy.contains('O gênero é obrigatório').should('be.visible');
    
    // Garante que ainda estamos na página de cadastro
    cy.url().should('include', '/disponibilizar_animal');
  });
});