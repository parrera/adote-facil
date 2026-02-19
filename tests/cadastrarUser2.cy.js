describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('a').click()
    cy.get('[name="name"]').type('TempDois')
    cy.get('[name="email"]').type('Temp2@gmail.com')
    cy.get('[name="password"]').type('TempDois')
    cy.get('[name="confirmPassword"]').type('TempDois')
    cy.get('.sc-ea747762-0').click()
  })
})