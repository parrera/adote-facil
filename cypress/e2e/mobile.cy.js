describe('Tarefa 4 - Teste Mobile', () => {
  it('Deve renderizar a tela de login corretamente no iPhone XR', () => {
    cy.viewport('iphone-xr') 
    cy.visit('http://localhost:3000/login')
    cy.get('input').should('be.visible')
  })
})
