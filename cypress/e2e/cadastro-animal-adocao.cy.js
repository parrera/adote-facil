describe("template spec", () => {
  it("cadastrar animal", () => {
    cy.visit("http://localhost:3000");

    cy.get('input[type="email"]').type("joaohenrique.gui13@gmail.com");
    cy.get('input[type="password"]').type("123456jhg");
    cy.get('button[type="submit"]').click();

    cy.contains("Disponibilizar animal para adoção").click({ force: true });
    cy.get('input[name="name"]').type("Teste");
    cy.get("select").eq(0).select("Gato", { force: true });
    cy.get("select").eq(1).select("Macho", { force: true });
    cy.get('input[name="race"]').type("Teste");
    cy.get('textarea[name="description"]').type("Teste");
    cy.get("#animalPictures").selectFile("cypress/fixtures/testee.jpeg", {
      force: true,
    });
    cy.get('button[type="submit"]').click();
  });
});
