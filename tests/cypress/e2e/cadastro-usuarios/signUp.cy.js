const nome = 'Larissa';
const senha = '12345678';

describe('Fluxo de Cadastro de Usuário', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/cadastro');
  });

  it('Cenário Principal: deve permitir que um novo usuário se cadastre com sucesso', () => {
    cy.contains('label', 'Nome').find('input').type(nome);
    
    const emailDinamico = `larissa${Date.now()}@gmail.com`; 
    cy.get('input[name="email"]').type(emailDinamico);
    cy.get('input[name="password"]').type(senha);
    cy.get('input[name="confirmPassword"]').type(senha);
    cy.contains('button', 'Cadastrar').click();
    
    cy.url().should('include', '/login');
  });

  it('Cenário Alternativo 1: deve bloquear o cadastro se as senhas não coincidirem', () => {
    cy.contains('label', 'Nome').find('input').type(nome);
    cy.get('input[name="email"]').type('larissa_teste@gmail.com');
    cy.get('input[name="password"]').type(senha);
    cy.get('input[name="confirmPassword"]').type('senhaerrada123'); 
    cy.contains('button', 'Cadastrar').click();

    cy.contains('As senhas não coincidem').should('be.visible'); 
    cy.url().should('include', '/cadastro'); 
  });

  it('Cenário Alternativo 2: deve bloquear o cadastro com formato de e-mail inválido', () => {
    cy.contains('label', 'Nome').find('input').type(nome);
    cy.get('input[name="email"]').type('email_sem_arroba.com'); 
    cy.get('input[name="password"]').type(senha);
    cy.get('input[name="confirmPassword"]').type(senha);
    cy.contains('button', 'Cadastrar').click();

    cy.contains('E-mail inválido').should('be.visible'); 
  });
});