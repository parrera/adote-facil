Cypress.on('uncaught:exception', () => false)

describe('HU03 - Disponibilizar Animal para Adoção', () => {

  const senha = '12345678'
  let email

  beforeEach(() => {
    email = `animal_${Date.now()}_${Math.random()}@email.com`

    cy.request('POST', 'http://localhost:8080/users', {
      name: 'Dono Teste',
      email,
      password: senha
    })
  })

  it('Deve cadastrar animal válido', () => {
    cy.visit('/login')

    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(senha)
    cy.contains('Login').click()

    cy.url().should('include', '/area_logada/animais_disponiveis')

    cy.visit('/area_logada/disponibilizar_animal')

    cy.get('form').should('exist')

    cy.get('input[name="name"]').type('Rex')

    cy.get('textarea[name="description"]')
      .type('Cachorro muito amigável')

    cy.get('[role="combobox"]').eq(0).click({ force: true })

    cy.contains('[role="option"]', 'Cachorro')
      .should('be.visible')
      .click({ force: true })

    cy.wait(500)

    cy.get('[role="combobox"]').eq(1)
      .click({ force: true })

    cy.contains('[role="option"]', 'Macho')
      .should('be.visible')
      .click({ force: true })

    cy.wait(500)

    cy.get('input[name="race"]').type('Vira-lata')

    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/dog.jpg', { force: true })

    cy.contains('Cadastrar').click({ force: true })

    cy.on('window:alert', (text) => {
      expect(text).to.equal('Animal cadastrado com sucesso!')
    })
  })

  it('Não deve permitir acesso sem autenticação', () => {
    cy.visit('/area_logada/disponibilizar_animal')

    cy.url().should('include', '/login')
  })

  it('Não deve permitir campos obrigatórios em branco', () => {
    cy.visit('/login')

    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(senha)
    cy.contains('Login').click()

    cy.url().should('include', '/area_logada/animais_disponiveis')

    cy.visit('/area_logada/disponibilizar_animal')

    cy.get('form').should('exist')

    cy.contains('Cadastrar').click({ force: true })

    cy.url().should('include', '/area_logada/disponibilizar_animal')
  })

})
