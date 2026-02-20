describe('HU01 - Cadastro de Usuário', () => {

  beforeEach(() => {
    cy.visit('/cadastro')
  })

  it('Deve cadastrar usuário válido', () => {
    const email = `teste_${Date.now()}@email.com`

    cy.get('input[name="name"]').type('UsuarioTeste')
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type('12345678')
    cy.get('input[name="confirmPassword"]').type('12345678')

    cy.contains('Cadastrar').click()

    cy.url().should('include', '/login')
  })

  it('Não deve permitir nome com número', () => {
    cy.get('input[name="name"]').type('Usuario1')
    cy.contains('Cadastrar').click()

    cy.contains('O nome deve conter apenas letras').should('exist')
  })

  it('Não deve permitir nome com espaço', () => {
    cy.get('input[name="name"]').type('Usuario Teste')
    cy.contains('Cadastrar').click()

    cy.contains('O nome deve conter apenas letras').should('exist')
  })

  it('Não deve permitir senha com menos de 8 caracteres', () => {
    cy.get('input[name="name"]').type('UsuarioTeste')
    cy.get('input[name="email"]').type('teste@email.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('input[name="confirmPassword"]').type('123456')

    cy.contains('Cadastrar').click()

    cy.contains('A senha deve conter no mínimo 8 caracteres').should('exist')
  })

  it('Não deve permitir senhas diferentes', () => {
    cy.get('input[name="name"]').type('UsuarioTeste')
    cy.get('input[name="email"]').type('teste@email.com')
    cy.get('input[name="password"]').type('12345678')
    cy.get('input[name="confirmPassword"]').type('87654321')

    cy.contains('Cadastrar').click()

    cy.contains('As senhas não coincidem').should('exist')
  })

  it('Não deve permitir campos obrigatórios em branco', () => {
    cy.contains('Cadastrar').click()

    cy.url().should('include', '/cadastro')
  })

  it('Não deve permitir email já cadastrado', () => {
    const email = `teste_${Date.now()}@email.com`

    cy.get('input[name="name"]').type('UsuarioTeste')
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type('12345678')
    cy.get('input[name="confirmPassword"]').type('12345678')

    cy.contains('Cadastrar').click()

    cy.url().should('include', '/login')

    cy.visit('/cadastro')

    cy.get('input[name="name"]').type('OutroUsuario')
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type('12345678')
    cy.get('input[name="confirmPassword"]').type('12345678')

    cy.contains('Cadastrar').click()

    cy.url().should('include', '/cadastro')
  })

})
