describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[name="email"]').type('Temp@gmail.com')
    cy.get('[name="password"]').type('TempTemp')
    cy.get('.sc-ea747762-0').click()
    cy.get('.sc-26506e6-5 > .sc-c7cdb42d-0 > [href="/area_logada/meus_animais"] > .sc-c7cdb42d-1').click()
    cy.get(':nth-child(1) > .sc-66a75d78-2 > .sc-66a75d78-4 > .sc-ea747762-0').click()
  })
})