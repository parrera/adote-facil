describe("Teste de Login Específico", () => {
  it("deve fazer login com sucesso com o usuário 'Carla Mendes'", () => {
    cy.visit("http://localhost:3000/login");

    cy.get('input[name="email"]').type("carla.mendes1756144202467@teste.com");

    cy.get('input[name="password"]').type("senhaSegura123");

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/area_logada/animais_disponiveis");

    cy.get("h1")
      .contains("Animais disponíveis para adoção")
      .should("be.visible");
  });
});
