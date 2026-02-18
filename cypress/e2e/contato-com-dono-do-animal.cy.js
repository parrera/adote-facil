describe("Entrar em contato com o dono do animal", () => {
  it("Entrar em contato", () => {
    cy.visit("http://localhost:3000/login");
    cy.get(".sc-a9636757-5 > :nth-child(1) > input").type(
      "joaohenrique.gui13@gmail.com",
    );
    cy.get(".sc-9b13d2ce-0 > input").type("123456jhg");
    cy.get(".sc-a06d05ba-0").click();
    cy.get(":nth-child(2) > .sc-d13fbcaf-2 > a > .sc-a06d05ba-0").click();
    cy.get(".sc-a06d05ba-0").contains("Entrar em contato com o dono").click();
  });
});
