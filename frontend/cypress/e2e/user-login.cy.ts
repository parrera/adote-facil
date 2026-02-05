/// <reference types="cypress" />

/**
 * Testes de Aceitação - Login de Usuário
 *
 * Cenário Principal: Login com credenciais válidas
 * Cenário Alternativo 1: Credenciais inválidas
 * Cenário Alternativo 2: Campos obrigatórios vazios
 */
describe("Login de Usuário", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  // Cenário Principal: Login com sucesso
  it("deve fazer login com credenciais válidas", () => {
    // Usa credenciais de um usuário existente no sistema
    cy.get('input[type="email"]').type("usuario@teste.com");
    cy.get('input[name="password"]').type("12345678");

    cy.get('button[type="submit"]').click();

    // Verifica redirecionamento para área logada
    cy.url().should("include", "/area_logada");
  });

  // Cenário Alternativo 1: Credenciais inválidas
  it("deve exibir erro para credenciais inválidas", () => {
    cy.get('input[type="email"]').type("inexistente@teste.com");
    cy.get('input[name="password"]').type("senhaerrada");

    cy.get('button[type="submit"]').click();

    // Verifica mensagem de erro
    cy.on("window:alert", (text) => {
      expect(text.toLowerCase()).to.match(/inválid|invalid|incorret/);
    });
  });

  // Cenário Alternativo 2: Campos obrigatórios vazios
  it("deve exibir erro para campos vazios", () => {
    cy.get('button[type="submit"]').click();

    // Verifica mensagens de campos obrigatórios
    cy.contains(/obrigatório|required/i).should("be.visible");
  });
});
