describe("Cadastro de Usuário", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/cadastro");
  });

  it("Cenário Principal: Deve cadastrar um novo usuário com sucesso", () => {
    const email = `teste${Date.now()}@exemplo.com`;
    cy.get("input[name=name]").type("UsuarioTeste");
    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type("Senha@123");
    cy.get("input[name=confirmPassword]").type("Senha@123");
    cy.get("button[type=submit]").click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal(
        "Cadastro efetuado com sucesso! Faça login para acessar nossa plataforma!"
      );
    });

    cy.url().should("include", "/login");
  });

  it("Cenário Alternativo 1: Deve exibir erro ao tentar cadastrar com e-mail já existente", () => {
    // Cadastra um usuário primeiro para garantir que o e-mail exista
    const email = `existente${Date.now()}@exemplo.com`;
    cy.request("POST", "http://localhost:8080/users", {
      name: "Usuario Existente",
      email,
      password: "Password123",
    });

    cy.get("input[name=name]").type("Outro Usuário");
    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type("OutraSenha@123");
    cy.get("input[name=confirmPassword]").type("OutraSenha@123");
    cy.get("button[type=submit]").click();

    cy.on("window:alert", (str) => {
      expect(str).to.contain("Email já cadastrado"); // Ajuste a mensagem conforme a API retorna
    });
  });

  it("Cenário Alternativo 2: Deve exibir erro de senhas não conferem", () => {
    cy.get("input[name=name]").type("Usuário Teste");
    cy.get("input[name=email]").type(`teste3${Date.now()}@exemplo.com`);
    cy.get("input[name=password]").type("Senha@123");
    cy.get("input[name=confirmPassword]").type("Senha@456");
    cy.get("button[type=submit]").click();

    cy.contains("As senhas não coincidem").should("be.visible");
  });
});
