/// <reference types="cypress" />

/**
 * Testes de Aceitação - Cadastro de Animal
 *
 * Cenário Principal: Cadastro de animal com dados válidos e foto
 * Cenário Alternativo 1: Cadastro sem foto (deve falhar)
 * Cenário Alternativo 2: Tentativa de adicionar mais de 5 fotos
 */
describe("Cadastro de Animal", () => {
  beforeEach(() => {
    // Simula autenticação antes de acessar área logada
    cy.setCookie("token", "token-de-teste-valido");
    cy.visit("/area_logada/disponibilizar_animal");
  });

  // Cenário Principal: Cadastro de animal com sucesso
  it("deve cadastrar animal com dados válidos e foto", () => {
    cy.get('input[name="name"]').type("Rex");

    // Seleciona tipo do animal
    cy.get('[data-testid="type-select"]').click();
    cy.contains("Cachorro").click();

    // Seleciona gênero
    cy.get('[data-testid="gender-select"]').click();
    cy.contains("Macho").click();

    // Upload de imagem
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/animal-test.jpg",
      { force: true },
    );

    cy.get('button[type="submit"]').click();

    // Verifica sucesso
    cy.on("window:alert", (text) => {
      expect(text.toLowerCase()).to.match(/sucesso|success/);
    });
  });

  // Cenário Alternativo 1: Sem foto
  it("deve exibir erro ao cadastrar sem foto", () => {
    cy.get('input[name="name"]').type("Rex");

    cy.get('[data-testid="type-select"]').click();
    cy.contains("Cachorro").click();

    cy.get('[data-testid="gender-select"]').click();
    cy.contains("Macho").click();

    // Não adiciona foto
    cy.get('button[type="submit"]').click();

    // Verifica mensagem de erro sobre foto
    cy.contains(/foto|image|imagem/i).should("be.visible");
  });

  // Cenário Alternativo 2: Exceder limite de fotos
  it("deve alertar ao tentar adicionar mais de 5 fotos", () => {
    cy.get('input[name="name"]').type("Rex");

    // Tenta adicionar 6 arquivos
    const files = [
      "cypress/fixtures/animal-test.jpg",
      "cypress/fixtures/animal-test.jpg",
      "cypress/fixtures/animal-test.jpg",
      "cypress/fixtures/animal-test.jpg",
      "cypress/fixtures/animal-test.jpg",
      "cypress/fixtures/animal-test.jpg",
    ];

    cy.get('input[type="file"]').selectFile(files, { force: true });

    // Verifica mensagem de limite
    cy.contains(/máximo|limit|5/i).should("be.visible");
  });
});
