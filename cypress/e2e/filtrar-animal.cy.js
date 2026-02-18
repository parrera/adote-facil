describe("template spec", () => {
  it("visualizar animais", () => {
    cy.visit("http://localhost:3000");

    cy.get('input[type="email"]').type("joaohenrique.gui13@gmail.com");
    cy.get('input[type="password"]').type("123456jhg");
    cy.get('button[type="submit"]').click();

    cy.contains("button", "Filtrar").click();
    cy.get('input[name="name"]').type("Megg");
    cy.get("select").eq(0).select("Cachorro", { force: true });
    cy.get("select").eq(1).select("Fêmea", { force: true });
    cy.get('button[type="submit"]').click();
  });
});
