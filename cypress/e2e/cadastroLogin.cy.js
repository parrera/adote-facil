describe("Autenticação de Usuário", () => {
  const user = {
    name: "Claudia",
    email: "fulano.tal2@example.com",
    password: "12345678",
  };

  // Cenário 1: Criação de Usuário
  it("Deve permitir criar um novo usuário com sucesso", () => {
    // Acesse a página de cadastro
    cy.visit("/cadastro");

    // Preenche o formulário
    cy.get('input[name="name"]').type(user.name);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('input[name="confirmPassword"]').type(user.password);

    // Submete o formulário
    cy.get('button[type="submit"]').click();

    // Verifica se houve redirecionamento para login ou dashboard
    cy.url().should("include", "/login");
    cy.contains("h1", "Faça login em nossa plataforma").should("be.visible");
  });

  // Cenário 2: Login de Usuário
  it("Deve permitir logar com usuário existente", () => {
    // Acesse a página de login
    cy.visit("/login");

    // Preenche credenciais
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);

    // Submete o formulário
    cy.get('button[type="submit"]').click();

    // Verifica se login foi bem sucedido (vai para a página principal)
    cy.url().should("not.include", "login");
    cy.get("h1").should("contain.text", "Animais disponíveis para adoção");
  });

  // Cenário 3: Tentativa de login com senha incorreta
  it("Deve exibir mensagem de erro ao tentar logar com senha incorreta", () => {
    cy.visit("/login");

    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type("senhaErrada");

    cy.get('button[type="submit"]').click();

    // Verifica mensagem de erro
    cy.contains("Credenciais inválidas").should("be.visible");
  });
});
