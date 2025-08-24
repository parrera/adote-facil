describe('Login de Usuário', () => {
  it('Deve autenticar usuário válido', () => {
    cy.visit('/login')
    cy.get('input[name="email"]').type('novo@mail.com')
    cy.get('input[name="password"]').type('senhaSegura123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/area_logada')
  })

  it('Deve exibir erro em credenciais inválidas', () => {
    cy.visit('/login')
    cy.get('input[name="email"]').type('novo@mail.com')
    cy.get('input[name="password"]').type('senhaErrada')
    cy.get('button[type="submit"]').click()
    
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Email ou senha inválidos.')
    })
  })

  it('Deve exibir erro quando o email não é preenchido', () => {
    cy.visit('/login')
    cy.get('input[name="password"]').type('12345678')
    cy.get('button[type="submit"]').click()
    cy.contains('O email é obrigatório')
  })
})