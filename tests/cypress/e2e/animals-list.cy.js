describe("Listagem de Animais", () => {
  it("Deve exibir a lista de animais disponíveis", () => {
    cy.visit("/animals");

    cy.get(".animal-card").should("have.length.greaterThan", 0);
    cy.contains("Adote").should("exist");
  });
});
