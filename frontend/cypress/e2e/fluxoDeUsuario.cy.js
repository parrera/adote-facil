// fluxoDeUsuario.cy.js

describe("Fluxo de Cadastro e Login de Usuário", () => {
  it("deve cadastrar um novo usuário com sucesso e depois logar na conta", () => {
    cy.intercept("POST", "**/api/users").as("createUserRequest");

    cy.visit("http://localhost:3000/cadastro");

    const nomeUsuario = "Carla";
    // Usar timestamp continua sendo uma boa prática para garantir um e-mail único
    const emailUsuario = `carla.mendes${Date.now()}@teste.com`;

    cy.get('input[name="name"]').type(nomeUsuario);
    cy.get('input[name="email"]').type(emailUsuario);
    cy.get('input[name="password"]').type("senhaSegura123");
    cy.get('input[name="confirmPassword"]').type("senhaSegura123");
    cy.get('button[type="submit"]').click();

    // **MELHORIA PRINCIPAL AQUI**
    // Agora esperamos a requisição e verificamos se o status code dela foi 201 (Created).
    // Se o backend der um erro 500, o teste vai falhar aqui com uma mensagem explícita.
    cy.wait("@createUserRequest").then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
    });

    // A verificação do alerta e da URL continua como antes
    cy.on("window:alert", (texto) => {
      expect(texto).to.equal(
        "Cadastro efetuado com sucesso! Faça login para acessar nossa plataforma!"
      );
    });
    cy.url().should("include", "/login");

    // Continuação do fluxo de login
    cy.get('input[name="email"]').type(emailUsuario);
    cy.get('input[name="password"]').type("senhaSegura123");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/area_logada/animais_disponiveis");
    // Corrigindo também o título final para corresponder exatamente ao que está na página
    cy.contains("Animais disponíveis para adoção").should("be.visible");
  });

  it("deve mostrar um erro ao tentar cadastrar com senhas diferentes", () => {
    cy.visit("http://localhost:3000/cadastro");

    cy.get('input[name="name"]').type("Mariana Lima");
    cy.get('input[name="email"]').type(`mari.lima${Date.now()}@teste.com`);
    cy.get('input[name="password"]').type("senha123");
    cy.get('input[name="confirmPassword"]').type("outraSenha456");
    cy.get('button[type="submit"]').click();

    cy.contains("As senhas não coincidem").should("be.visible");
    cy.url().should("include", "/cadastro");
  });
});
