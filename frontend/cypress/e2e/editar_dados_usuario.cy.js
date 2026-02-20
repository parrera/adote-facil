Cypress.on('uncaught:exception', () => false)

describe('HU06 - Editar Dados do Usuário', () => {

  const senha = '12345678'
  let email

  beforeEach(() => {
    email = `editar_${Date.now()}_${Math.random()}@email.com`

    cy.request('POST', 'http://localhost:8080/users', {
      name: 'Usuario Original',
      email,
      password: senha
    })

    cy.visit('/login')

    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(senha)
    cy.contains('Login').click()

    cy.url().should('include', '/area_logada/animais_disponiveis')

    cy.visit('/area_logada/editar_dados')
  })

  it('Deve editar nome e email com sucesso', () => {
    const novoNome = 'Usuario Editado'
    const novoEmail = `editado_${Date.now()}@email.com`

    cy.get('input[name="name"]').clear()
    cy.get('input[name="name"]').type(novoNome)
    cy.get('input[name="email"]').clear()
    cy.get('input[name="email"]').type(novoEmail)

    cy.contains('Salvar alterações').click()

    cy.on('window:alert', (text) => {
      expect(text).to.equal('Dados editados com sucesso!')
    })
  })

  it('Deve editar senha com sucesso', () => {
    const novaSenha = '87654321'

    cy.contains('Alterar senha').click()

    cy.get('input[name="password"]').type(novaSenha)
    cy.get('input[name="confirmPassword"]').type(novaSenha)

    cy.contains('Salvar alterações').click()

    cy.on('window:alert', (text) => {
      expect(text).to.equal('Dados editados com sucesso!')
    })
  })

  it('Não deve permitir nome com números', () => {
    cy.get('input[name="name"]').clear()
    cy.get('input[name="name"]').type('Usuario123')

    cy.contains('Salvar alterações').click()

    cy.contains('O nome deve conter apenas letras').should('exist')
  })

  it('Não deve permitir senhas diferentes', () => {
    cy.contains('Alterar senha').click()

    cy.get('input[name="password"]').type('87654321')
    cy.get('input[name="confirmPassword"]').type('12345678')

    cy.contains('Salvar alterações').click()

    cy.contains('As senhas não coincidem').should('exist')
  })

})