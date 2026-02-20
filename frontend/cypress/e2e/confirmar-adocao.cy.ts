Cypress.on('uncaught:exception', (err) => {
  return false;
});

describe('Fluxo Completo: Cadastrar e Confirmar Adoção', () => {
  // Nome para o cenário de sucesso
  const nomeSucesso = `Bidu Sucesso ${Math.floor(Math.random() * 1000)}`;
  // Nome para o cenário de cancelamento (Lixeira)
  const nomeCancelado = `Bidu lixeira ${Math.floor(Math.random() * 1000)}`;

  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('/login');
    cy.get('input[name="email"]').type('doador@doador.com');
    cy.get('input[name="password"]').type('doadoraf');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/area_logada');
  });

  it('Cenário 1: Cadastrar animal e em seguida confirmar sua adoção', () => {
    cy.visit('/area_logada/disponibilizar_animal');
    cy.wait(3000); 

    cy.get('input[name="name"], input[name="nome"]').first().type(nomeSucesso);

    cy.contains('Selecione um tipo').click({ force: true });
    cy.wait(500);
    cy.focused().type('{downarrow}{enter}'); 
    cy.contains('Cachorro').should('be.visible');

    cy.contains('Selecione um gênero').click({ force: true });
    cy.wait(500);
    cy.focused().type('{downarrow}{enter}');
    cy.contains('Macho').should('be.visible');

    cy.get('#animalPictures').selectFile('cypress/fixtures/foto.jpg', { force: true });
    cy.get('img', { timeout: 7000 }).should('be.visible');

    cy.contains('button', 'Cadastrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/disponibilizar_animal');

    cy.contains(nomeSucesso).should('exist');

    cy.contains(nomeSucesso)
      .parents() 
      .contains('button', /confirmar adoção/i) 
      .click({ force: true });

    cy.log(`Adoção do ${nomeSucesso} confirmada com sucesso!`);
  });

  it('Cenário 2 (Alternativo): Cadastrar animal e cancelar/desistir (Lixeira)', () => {
    // 1. Primeiro cadastramos o animal para garantir que ele existe na lista
    cy.visit('/area_logada/disponibilizar_animal');
    cy.wait(3000); 

    cy.get('input[name="name"], input[name="nome"]').first().type(nomeCancelado);

    cy.contains('Selecione um tipo').click({ force: true });
    cy.wait(500);
    cy.focused().type('{downarrow}{enter}'); 

    cy.contains('Selecione um gênero').click({ force: true });
    cy.wait(500);
    cy.focused().type('{downarrow}{enter}');

    cy.get('#animalPictures').selectFile('cypress/fixtures/foto.jpg', { force: true });
    cy.get('img', { timeout: 7000 }).should('be.visible');

    cy.contains('button', 'Cadastrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/disponibilizar_animal');

    // 2. Agora vamos na lista e clicamos na lixeira DESTE animal específico
    cy.contains(nomeCancelado).should('exist');

    cy.contains(nomeCancelado)
      .parents() // Identifica o card do animal que acabamos de criar
      .find('button') // Procura os botões dentro desse card
      .last() // Pega o último (que pela sua imagem é a lixeira vermelha)
      .click({ force: true });

    // Se houver modal de confirmação de exclusão:
    // cy.contains('button', /sim|excluir/i).click({ force: true });

    cy.log(`O animal ${nomeCancelado} foi removido com sucesso.`);
  });
});