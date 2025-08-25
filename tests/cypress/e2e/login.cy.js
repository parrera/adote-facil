describe("Login", () => {
  beforeEach(() => {
    cy.fixture("user").as("userData");
  });

  it("Deve permitir login com credenciais válidas", function () {
    cy.login(this.userData.email, this.userData.password);

    cy.url().should("include", "/dashboard");
    cy.contains("Bem-vindo").should("exist");
  });
});
