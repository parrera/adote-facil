describe('Cadastro de Animal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').should('be.enabled').type('muzzeti@email.com');
    cy.get('input[name="password"]').should('be.enabled').type('senha123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/area_logada/animais_disponiveis');
  });

  it('deve cadastrar um novo animal com uma abordagem de espera e clique no corpo', () => {
    cy.visit('http://localhost:3000/area_logada/disponibilizar_animal');
    
    cy.get('button[type="submit"]').should('be.visible').and('be.enabled');

    cy.get('input[name="name"]').type('Picanha');

    cy.get('button[role="combobox"]').first().click();
    
    cy.wait(500); 

    cy.contains('Cachorro').click({ force: true });
    
    cy.get('button[role="combobox"]').eq(1).click();
    cy.wait(500);
    cy.contains('Macho').click({ force: true });


    cy.get('input[name="race"]').type('Vira-lata');
    cy.get('textarea[name="description"]').type('Um cachorrinho muito amigável.');

    cy.get('input[type="file"]').selectFile('cypress/fixtures/cachorro.jpg', { force: true });

    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Animal cadastrado com sucesso!');
    });
    cy.url().should('include', '/area_logada/meus_animais');
  });
});