describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[name="email"]').type('Temp@gmail.com')
    cy.get('[name="password"]').type('TempTemp')
    cy.get('.sc-ea747762-0').click()
    cy.get('.sc-26506e6-5 > .sc-c7cdb42d-0 > [href="/area_logada/conversas"] > .sc-c7cdb42d-1').click()
    cy.get('.sc-de6d9b2f-2').click()
    cy.get('.sc-6ec77ae5-7').type('Beleza te encontro na rua tal tal tal no horario tal tal tal').type('{enter}')
  })
})