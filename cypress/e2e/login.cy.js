describe('Login', () => {
  it('Deve realizar login com credenciais válidas', () => {
    cy.visit('http://localhost:3000/login')

    // preenche o login
    cy.get('input[name="email"]').type('teste@mail.com')
    cy.get('input[name="password"]').type('12345678')

    // clica no botão
    cy.get('button[type="submit"]').click()

    // valida url e texto na tela
    cy.url().should('include', '/area_logada')
    
    // Checa o título da página
    cy.get('h1').should('contain.text', 'Animais disponíveis para adoção')
  })

  // cenário alternativo 1
  it('Deve exibir uma mensagem de erro ao usar credenciais inválidas', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').type('teste@mail.com');
    cy.get('input[name="password"]').type('senha'); // Senha incorreta
    cy.get('button[type="submit"]').click();

    // a URL não deve mudar
    cy.url().should('include', '/login'); 

    // a mensagem de erro deve ser visível
    cy.contains('A senha deve conter no mínimo 8 caracteres').should('be.visible'); 
  });

  // cenário alternativo 2
  it('Deve exibir mensagens de validação ao tentar logar com campos vazios', () => {
    cy.visit('http://localhost:3000/login')

    // não preenche nada e tenta enviar
    cy.get('button[type="submit"]').click()

    // continua na página de login
    cy.url().should('include', '/login')

    // valida mensagens de erro
    cy.contains('O email é obrigatório').should('be.visible')
    cy.contains('A senha é obrigatória').should('be.visible')
  })
});