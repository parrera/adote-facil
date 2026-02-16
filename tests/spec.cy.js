describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[name="email"]').type('Temp@gmail.com')
    cy.get('[name="password"]').type('TempTemp')
    cy.get('.sc-ea747762-0').click()
    cy.get('.sc-26506e6-5 > .sc-c7cdb42d-0 > [href="/area_logada/disponibilizar_animal"] > .sc-c7cdb42d-1').click()
    cy.get('[name="name"]').type('Barioth')
    cy.get('.sc-b77a2f6d-8 > .sc-43ec2adf-0').click()
    cy.get('[aria-labelledby="radix-:rh:"]').click()
    cy.get('.sc-b77a2f6d-9 > .sc-43ec2adf-0').click()
    cy.get('[aria-labelledby="radix-:rt:"]').click()
    cy.get('[name="race"]').type('Flying wyvern')
    cy.get('[name="description"]').type('Weird Ice Squirrel')
    //imagem tem que estar na pasta de "usuarios"
    const imageName = 'Barioth.png';
    cy.get('.sc-b77a2f6d-16').selectFile(imageName)
    cy.get('.sc-ea747762-0').click()


  })
})
