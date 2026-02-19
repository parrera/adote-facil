describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('a').click()
    cy.get('[name="name"]').type('Temp')
    cy.get('[name="email"]').type('Temp@gmail.com')
    cy.get('[name="password"]').type('TempTemp')
    cy.get('[name="confirmPassword"]').type('TempTemp')
    cy.get('.sc-ea747762-0').click()
    
  })
})