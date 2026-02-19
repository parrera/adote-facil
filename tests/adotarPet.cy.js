describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[name="email"]').type('Temp2@gmail.com')
    cy.get('[name="password"]').type('TempDois')
    cy.get('.sc-ea747762-0').click()
    cy.get(':nth-child(1) > .sc-66a75d78-2 > a > .sc-ea747762-0').click()
    cy.wait(200)
    cy.get('.sc-ea747762-0').click()
    cy.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
    })
    cy.get('.sc-6ec77ae5-7').type('Ola, tenho interesse em adotar esse pet').type('{enter}')
  })

})
