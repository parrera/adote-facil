const email = 'larissa@gmail.com';
const senha = '12345678';
const nomeAnimal = 'Zigo'
const tipoAnimal = 'Gato'
const generoAnimal = 'Macho'
const racaAnimal = 'Siamês'

Cypress.on('uncaught:exception', () => false);

describe('Cadastrar animal para adoção', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(senha);
    cy.contains('button', 'Login').click();
    cy.url().should('include', '/area_logada/animais_disponiveis');
    
    cy.get('a[href="/area_logada/disponibilizar_animal"]').filter(':visible').first().should('be.visible').click();
    cy.url().should('include', '/area_logada/disponibilizar_animal');
  });

  it('Cenário Principal: deve preencher o formulário e cadastrar com sucesso', () => {
    cy.contains('label', 'Nome').find('input').type(nomeAnimal)
    cy.contains('span', "Tipo").parent().parent().find('button[role="combobox"]').should('be.visible').click()
    cy.get('[role="option"]').contains(tipoAnimal).click()
    cy.contains('span', "Gênero").parent().parent().find('button[role="combobox"]').should('be.visible').click()
    cy.get('[role="option"]').contains(generoAnimal).click()
    cy.contains('label', 'Raça').find('input').type(racaAnimal);
    cy.get('textarea').type("Um gatinho magrinho, elegante...");    
    cy.get('input#animalPictures').selectFile('cypress/fixtures/gato.jpeg', { force: true });
    
    cy.contains('button', 'Cadastrar').click();
    
    cy.url().should('include', '/area_logada/meus_animais'); 
  });

  it('Cenário Alternativo 1: deve bloquear o cadastro se campos obrigatórios estiverem vazios', () => {
    cy.contains('button', 'Cadastrar').click();

    cy.contains('Nome é obrigatório').should('be.visible');
    
    cy.url().should('include', '/area_logada/disponibilizar_animal');
  });

  it('Cenário Alternativo 2: deve bloquear o cadastro se tentar enviar sem foto', () => {
    cy.contains('label', 'Nome').find('input').type(nomeAnimal)
    cy.contains('span', "Tipo").parent().parent().find('button[role="combobox"]').should('be.visible').click()
    cy.get('[role="option"]').contains(tipoAnimal).click()
    cy.contains('span', "Gênero").parent().parent().find('button[role="combobox"]').should('be.visible').click()
    cy.get('[role="option"]').contains(generoAnimal).click()
    cy.contains('label', 'Raça').find('input').type(racaAnimal);
    cy.get('textarea').type("Gatinho sem foto de teste...");  
    
    cy.contains('button', 'Cadastrar').click();

    cy.contains('Pelo menos uma foto é obrigatória').should('be.visible');
  });

});