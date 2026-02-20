describe('Login do usuário', () => {
  const baseUrl = 'http://localhost:3001'

  it('Cenário principal - login com credenciais válidas', () => {
    cy.visit(`${baseUrl}/login`)

    cy.get('input[name="email"]').type('doador@doador.com')
    cy.get('input[name="password"]').type('doadoraf')
    cy.get('button[type="submit"]').click()

    cy.url().then((url) => cy.log(`URL depois do clique: ${url}`))
cy.get('body').then(($b) => cy.log(`Texto da página: ${$b.text().slice(0, 200)}`))

    // validação simples: depois do login, deve aparecer alguma opção da área logada
    cy.contains('Disponibilizar animal para adoção').should('be.visible')
  })

  it('Cenário alternativo - login com senha inválida', () => {
    cy.visit(`${baseUrl}/login`)

    cy.get('input[name="email"]').type('doador@doador.com')
    cy.get('input[name="password"]').type('senhaerrada')
    cy.get('button[type="submit"]').click()

    // validação: deve mostrar mensagem de erro (pode variar o texto)
    cy.contains(/inválid|erro|incorret/i).should('be.visible')
  })
})