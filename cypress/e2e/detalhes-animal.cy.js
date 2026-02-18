describe("Visualizar detalhes de um animal", () => {
  it.only("descricao completa", () => {
    cy.visit("http://localhost:3000/login");
    cy.get(".sc-a9636757-5 > :nth-child(1) > input").type(
      "joaohenrique.gui13@gmail.com",
    );
    cy.get(".sc-9b13d2ce-0 > input").type("123456jhg");
    cy.get(".sc-a06d05ba-0").click();
    cy.get(":nth-child(2) > .sc-d13fbcaf-2 > a > .sc-a06d05ba-0")
      .contains("Saiba mais")
      .click();
  });

  it("descricao incompleta", () => {
    cy.visit("http://localhost:3000/login");
    cy.get(".sc-a9636757-5 > :nth-child(1) > input").type(
      "joaohenrique.gui13@gmail.com",
    );
    cy.get(".sc-9b13d2ce-0 > input").type("123456jhg");
    cy.get(".sc-a06d05ba-0").click();
    cy.get("a > .sc-a06d05ba-0").contains("Saiba mais").click();
  });
});
