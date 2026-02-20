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

})
