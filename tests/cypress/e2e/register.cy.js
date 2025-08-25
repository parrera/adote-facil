describe("Cadastro de Usuário", () => {
  beforeEach(() => {
    cy.fixture("user").as("userData");
  });

  it("Deve permitir registrar um novo usuário", function () {
    cy.visit("/register");
    cy.get("input[name=name]").type(this.userData.name);
    cy.get("input[name=email]").type(this.userData.email);
    cy.get("input[name=password]").type(this.userData.password);
    cy.get("input[name=confirmPassword]").type(this.userData.password);
    cy.get("button[type=submit]").click();

    cy.contains("Cadastro realizado com sucesso").should("exist");
  });
});
