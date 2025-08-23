describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[name="email"]').type('eduardo.gandra12@icloud.com')
    cy.get('[name="password"]').type('dudu1605')
    cy.get('.sc-a06d05ba-0').click() 
    cy.get('.sc-368028a3-5 > .sc-b85c88e3-0 > [href="/area_logada/editar_dados"] > .sc-b85c88e3-1 > span').click()
    cy.get('[name="name"]').clear().type('Felipe')
    cy.get('.sc-b8d6d357-3 > .sc-a06d05ba-0').click()







             })
})