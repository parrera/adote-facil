Cypress.on('uncaught:exception', (err) => {
  console.error('Uncaught exception:', err.message)
  return false
})

describe('HU04 - Listar Animais Disponíveis', () => {

  const senha = '12345678'
  let email
  let token

  beforeEach(() => {
    email = `listar_${Date.now()}_${Math.random()}@email.com`

    cy.request('POST', 'http://localhost:8080/users', {
      name: 'UsuarioTeste',
      email,
      password: senha
    })

    cy.request('POST', 'http://localhost:8080/login', {
      email,
      password: senha
    }).then((res) => {
      token = res.body.token
    })
  })

  it('Deve exibir lista de animais disponíveis se existirem', () => {
    cy.visit('/login')

    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(senha)
    cy.contains('Login').click()

    cy.url().should('include', '/area_logada/animais_disponiveis')

    cy.get('body').should('not.contain', 'Nenhum animal disponível')
  })

  it('Deve exibir aviso quando não houver animais disponíveis', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/animals/available',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.body.length > 0) {
        res.body.forEach((animal) => {
          cy.request({
            method: 'DELETE',
            url: `http://localhost:8080/animals/${animal.id}`,
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        })
      }
    })

    cy.visit('/login')

    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(senha)
    cy.contains('Login').click()

    cy.url().should('include', '/area_logada/animais_disponiveis')

    cy.reload()

    cy.get('body').should('contain', 'Desculpe, no momento não temos nenhum animal disponível para adoção')
    cy.get('body').should('not.contain', 'Saiba mais')
  })

  it('Não deve permitir acesso sem autenticação', () => {
    cy.visit('/area_logada/animais_disponiveis')

    cy.url().should('include', '/login')
  })

})
