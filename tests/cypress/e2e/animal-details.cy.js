describe("Detalhes de um Animal", () => {
  it("Deve permitir acessar detalhes de um animal", () => {
    cy.visit("/animals");

    cy.get(".animal-card").first().click();

    cy.url().should("include", "/animals/");
    cy.get(".animal-details").should("exist");
    cy.contains("Idade").should("exist");
    cy.contains("Raça").should("exist");
  });
});
