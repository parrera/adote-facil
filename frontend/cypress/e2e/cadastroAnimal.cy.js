Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("Minified React error #418")) {
    return false;
  }
  return true;
});

describe("Cadastro de Animal para Adoção", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");

    cy.get('input[name="email"]').type("carla.mendes1756144202467@teste.com");
    cy.get('input[name="password"]').type("senhaSegura123");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/area_logada/animais_disponiveis");
  });

  it("deve permitir que um usuário logado cadastre um novo pet", () => {
    cy.visit("http://localhost:3000/area_logada/disponibilizar_animal");

    cy.get('input[name="name"]').type("teste2");

    cy.get('button[role="combobox"]').eq(0).click();
    cy.get('div[role="option"]').contains("Cachorro").click();

    cy.get('button[role="combobox"]').eq(1).click();
    cy.get('div[role="option"]').contains("Fêmea").click();

    cy.get('input[name="race"]').type("SRD (Vira-lata)");
    cy.get('textarea[name="description"]').type(
      "Uma cachorrinha muito esperta e brincalhona. Adora correr atrás de bolinhas!"
    );

    cy.get('input[type="file"]').selectFile("cypress/fixtures/teste.png", {
      force: true,
    });

    cy.get('button[type="submit"]').contains("Cadastrar").click();

    cy.on("window:alert", (texto) => {
      expect(texto).to.equal("Animal cadastrado com sucesso!");
    });
    cy.url().should("include", "/area_logada/meus_animais");
    cy.get("h1")
      .contains("Meus animais disponíveis para adoção")
      .should("be.visible");
  });
});
