describe('Alteração de dados e senha', () => {
  const senha = '12345678'

  beforeEach(() => {
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('418') || err.message.includes('Hydration')) {
        return false
      }
      return true
    })

    cy.clearLocalStorage()
    cy.clearCookies()

    const timestamp = Date.now()
    const email = usuario${timestamp}@test.com

    cy.visit('/cadastro')
    cy.get('input[name="name"]').type('Usuario')
    cy.get('input[type="email"]').type(email)
    cy.get('input[name="password"]').type(senha)
    cy.get('input[name="confirmPassword"]').type(senha)
    cy.get('button[type="submit"]').click()

    cy.url({ timeout: 10000 }).should('include', '/login')

    cy.get('input[type="email"]').type(email)
    cy.get('input[name="password"]').type(senha)
    cy.contains('Login').click()

    cy.url({ timeout: 10000 }).should('include', '/area_logada')

    cy.visit('/area_logada/editar_dados')
  })

  it('Cenário principal: Deve alterar senha com sucesso', () => {
    cy.contains('button', 'Alterar senha').click()

    cy.get('input[name="password"]', { timeout: 5000 }).should('be.visible').type('novaSenha123')
    cy.get('input[name="confirmPassword"]').type('novaSenha123')

    cy.window().then((win) => {
      cy.stub(win, 'alert').callsFake((msg) => {
        expect(msg).to.include('Dados editados com sucesso')
      })
    })

    cy.contains('Salvar alterações').click()
  })

  it('Alternativo: Não deve alterar se confirmação for diferente', () => {
    cy.contains('button', 'Alterar senha').click()

    cy.get('input[name="password"]', { timeout: 5000 }).should('be.visible').type('novaSenha123')
    cy.get('input[name="confirmPassword"]').type('outraSenha')

    cy.contains('Salvar alterações').click()

    cy.contains('As senhas não coincidem').should('be.visible')
  })

  it('Alternativo: Deve validar senha com menos de 8 caracteres', () => {
    cy.contains('button', 'Alterar senha').click()

    cy.get('input[name="password"]', { timeout: 5000 }).should('be.visible').type('1234567')
    cy.get('input[name="confirmPassword"]').type('1234567')

    cy.contains('Salvar alterações').click()

    cy.contains('A senha deve conter no mínimo 8 caracteres').should('be.visible')
  })
})