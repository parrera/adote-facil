describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[name="email"]').type('cruzeiro@gmail.com')
    cy.get('[name="password"]').type('cruzeiro1')
    cy.get('.sc-a06d05ba-0').click()
    cy.get('a > .sc-a06d05ba-0').click()
    
    





      })
})