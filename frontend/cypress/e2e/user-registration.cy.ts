/// <reference types="cypress" />

/**
 * Testes de Aceitação - Cadastro de Usuário
 *
 * Cenário Principal: Cadastro com sucesso usando dados válidos
 * Cenário Alternativo 1: Tentativa com email inválido
 * Cenário Alternativo 2: Senhas não coincidem
 */
describe("Cadastro de Usuário", () => {
  beforeEach(() => {
    cy.visit("/cadastro");
  });

  // Cenário Principal: Cadastro com sucesso
  it("deve cadastrar um novo usuário com dados válidos", () => {
    const timestamp = Date.now();

    cy.get('input[name="name"]').type("Maria Teste");
    cy.get('input[name="email"]').type(`maria${timestamp}@teste.com`);
    cy.get('input[name="password"]').type("12345678");
    cy.get('input[name="confirmPassword"]').type("12345678");

    cy.get('button[type="submit"]').click();

    // Verifica redirecionamento ou mensagem de sucesso
    cy.url().should("include", "/login");
  });

  // Cenário Alternativo 1: Email inválido
  it("deve exibir erro para email inválido", () => {
    cy.get('input[name="name"]').type("Maria Teste");
    cy.get('input[name="email"]').type("email-invalido");
    cy.get('input[name="password"]').type("12345678");
    cy.get('input[name="confirmPassword"]').type("12345678");

    cy.get('button[type="submit"]').click();

    // Verifica mensagem de erro de email
    cy.contains(/email.*inválido|invalid.*email/i).should("be.visible");
  });

  // Cenário Alternativo 2: Senhas não coincidem
  it("deve exibir erro quando senhas não coincidem", () => {
    cy.get('input[name="name"]').type("Maria Teste");
    cy.get('input[name="email"]').type("maria@teste.com");
    cy.get('input[name="password"]').type("12345678");
    cy.get('input[name="confirmPassword"]').type("87654321");

    cy.get('button[type="submit"]').click();

    // Verifica mensagem de erro de senha
    cy.contains(/senhas.*coincidem|passwords.*match/i).should("be.visible");
  });
});
