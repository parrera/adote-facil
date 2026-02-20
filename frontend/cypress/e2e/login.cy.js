describe('HU02 - Login de Usuário', () => {

  const senha = '12345678'
  const email = `login_${Date.now()}@email.com`

  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/users',
      body: {
        name: 'UsuarioTeste',
        email: email,
        password: senha
      },
      failOnStatusCode: false
    })

    cy.visit('/login')
  })

  it('Deve autenticar usuário válido', () => {
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(senha)

    cy.contains('Login').click()

    cy.url().should('include', '/area_logada/animais_disponiveis')
  })

  it('Não deve permitir senha com menos de 8 caracteres', () => {
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type('123456')

    cy.contains('Login').click()

    cy.contains('A senha deve conter no mínimo 8 caracteres')
      .should('exist')
  })

  it('Não deve autenticar com credenciais inválidas', () => {
    cy.on('window:alert', (msg) => {
      expect(msg).to.contain('Email ou senha inválidos')
    })

    cy.get('input[name="email"]').type('naoexiste@email.com')
    cy.get('input[name="password"]').type('12345678')

    cy.contains('Login').click()

    cy.url().should('include', '/login')
  })

})
