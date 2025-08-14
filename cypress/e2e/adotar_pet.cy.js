describe("Fluxo de Adoção de Pet", () => {
  beforeEach(() => {
    // Visita a página inicial, que deve redirecionar para /login
    cy.visit("/");

    // Insere as credenciais nos campos de login
    cy.get('input[name="email"]').type("luiseduardobastos5446@gmail.com");
    cy.get('input[name="password"]').type("12345678");

    // Clica no botão para submeter o formulário de login
    cy.get('button[type="submit"]').click();

    // Após o login, o Cypress deve ser redirecionado para a página principal.
    // Adicionamos uma verificação para garantir que o login foi bem-sucedido
    // e os cards de pets estão visíveis.
    cy.url().should("not.include", "login");
    cy.get('[data-testid="pet-card"]').should("be.visible");
  });

  // Cenário 1: Principal - Sucesso na Adoção de um Pet
  it("Deve permitir que um usuário, após logado, adote um pet com sucesso", () => {
    // O login já foi feito no `beforeEach`

    // Clica no primeiro pet da lista
    cy.get('[data-testid="pet-card"]').first().click();

    // Verifica se a URL mudou para a página de detalhes do pet
    cy.url().should("include", "/pets/");

    // Verifica se o título "Que tal adotar seu novo amigo hoje?" está visível
    cy.contains("h1", "Que tal adotar seu novo amigo hoje?").should(
      "be.visible"
    );

    // Preenche os campos do formulário
    cy.get('input[name="name"]').type("Fulano de Tal");
    cy.get('input[name="email"]').type("fulano.tal@example.com");
    cy.get('input[name="phone"]').type("11987654321");
    cy.get('textarea[name="message"]').type(
      "Tenho muito interesse em adotar este amiguinho!"
    );

    // Clica no botão de enviar
    cy.contains("button", "Quero Adotar").click();

    // Verifica a mensagem de sucesso
    cy.contains("h2", "Solicitação enviada!").should("be.visible");
    cy.contains(
      "p",
      "Sua solicitação de adoção foi enviada com sucesso. Em breve a ONG responsável entrará em contato."
    ).should("be.visible");
  });

  // Cenário 2: Alternativo - Tentativa de envio do formulário com campos vazios
  it("Deve exibir mensagens de erro ao tentar enviar o formulário com campos obrigatórios vazios", () => {
    // Visita a página de um pet específico (assumindo que o pet com ID 1 existe)
    cy.visit("/pets/1");

    // Garante que a página carregou
    cy.contains("h1", "Que tal adotar seu novo amigo hoje?").should(
      "be.visible"
    );

    // Clica no botão de enviar sem preencher nada
    cy.contains("button", "Quero Adotar").click();

    // Verifica se a validação do navegador impede o envio para o primeiro campo
    cy.get('input[name="name"]:invalid').should("have.length", 1);

    // Preenche apenas o nome e tenta enviar novamente
    cy.get('input[name="name"]').type("Ciclano");
    cy.contains("button", "Quero Adotar").click();
    cy.get('input[name="email"]:invalid').should("have.length", 1);
  });

  // Cenário 3: Alternativo - Acesso a uma página de pet inexistente
  it("Deve exibir uma mensagem de erro ao tentar acessar a página de um pet que não existe", () => {
    // O login já foi feito no `beforeEach`

    // Tenta visitar a página de um pet com um ID improvável
    cy.visit("/pets/99999", { failOnStatusCode: false }); // Evita que o Cypress falhe por um status 404

    // Verifica se a mensagem de pet não encontrado é exibida
    // NOTA: Ajuste o seletor e a mensagem se sua aplicação exibir algo diferente.
    cy.contains("h2", "Pet não encontrado").should("be.visible");
  });
});
