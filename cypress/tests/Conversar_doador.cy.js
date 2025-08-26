describe('Filtrando Animais', () => {
  it('deve filtrar animais na área logada', () => {
    cy.visit('http://localhost:3000/login')  
    cy.get('[name="email"]').type('luisgoncalves@aluno.ufop.edu.br')
    cy.get('[name="password"]').type('12344321')
    cy.get('.sc-a06d05ba-0').click()
    cy.wait(1000)
    cy.get(':nth-child(1) > .sc-d13fbcaf-2 > a > .sc-a06d05ba-0').click()
    cy.wait(1000)
    cy.get('.sc-a06d05ba-0').first().click()
    cy.wait(1000)
    cy.get('.sc-679b4dca-7').should('exist').type('Olá, gostaria de saber mais informaçoes')
    cy.get('.sc-679b4dca-8 > svg > path').click({ force: true })
    cy.get('.sc-368028a3-5 > .sc-b85c88e3-0 > :nth-child(6)').click()

    cy.get('[name="email"]').type('luisgustavo.b.g.216@gmail.com')
    cy.get('[name="password"]').type('12344321')
    cy.get('.sc-a06d05ba-0').click()
    cy.get('.sc-368028a3-5 > .sc-b85c88e3-0 > [href="/area_logada/conversas"] > .sc-b85c88e3-1').click()
    cy.get('.sc-ed493da-3').click()
    cy.get('.sc-679b4dca-7').type('Ok, o que voce quer saber?')
    cy.get('.sc-679b4dca-8 > svg > path').click({force: true})

    
  })
})