describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[name="email"]').type('eduardo.gandra12@icloud.com')
    cy.get('[name="password"]').type('dudu1605')
    cy.get('.sc-a06d05ba-0').click() 
    cy.get('.sc-368028a3-5 > .sc-b85c88e3-0 > [href="/area_logada/disponibilizar_animal"] > .sc-b85c88e3-1 > span').click()
    cy.get('label > .sc-e38821d5-6 > span').type('Sinisterra')
    cy.get('.sc-e38821d5-8 > .sc-7ac7886a-0 > .sc-7ac7886a-2 > svg').click()
    cy.get('[aria-labelledby="radix-:re:"]').click()
    cy.get('.sc-e38821d5-9 > .sc-7ac7886a-0 > .sc-7ac7886a-2').click()
    cy.get('[aria-labelledby="radix-:rs:"]').click()
    cy.get('[name="race"]').type('Pinsher')
    cy.get('[name="description"]').type('Animal dócil e brincalhão')
    cy.get("[type='file']").selectFile("cypress/e2e/dog.jpg", { force: true });
    cy.get('.sc-a06d05ba-0').click()
    
    
  })
})
