describe('Filtrar animais', () => {
    beforeEach(() => {
        cy.on('uncaught:exception', (err) => {
            if (err.message.includes('#418')) return false;
        });
    });

    it('Cenário principal - Filtrar animais', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('[name="email"]').type('adotante@adotante.com')
        cy.get('[name="password"]').type('adotanteaf')
        cy.get('button[type="submit"]').click()
        cy.get('.sc-16ab8f2-2 > .sc-ea747762-0').click()
        cy.get('.sc-6a06b215-6 > .sc-43ec2adf-0 > .sc-43ec2adf-2').click()
        cy.get('[aria-labelledby="radix-:ri:"]').click()
        cy.get('.sc-6a06b215-2 > .sc-ea747762-0').click()
        cy.contains('Pássaro').should('be.visible')
    })

    it('Cenário alternativo - Filtrar animais pelo nome errado', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('[name="email"]').type('adotante@adotante.com')
        cy.get('[name="password"]').type('adotanteaf')
        cy.get('button[type="submit"]').click()
        cy.get('.sc-16ab8f2-2 > .sc-ea747762-0').click()
        cy.get('[name="name"]').type("Keflla")
        cy.get('.sc-6a06b215-2 > .sc-ea747762-0').click()
        cy.contains('Desculpe, no momento não temos nenhum animal disponível para adoção').should('be.visible')
    })

    it('Cenário alternativo - Filtrar animais pelo tipo de animal errado', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('[name="email"]').type('adotante@adotante.com')
        cy.get('[name="password"]').type('adotanteaf')
        cy.get('button[type="submit"]').click()
        cy.get('.sc-16ab8f2-2 > .sc-ea747762-0').click()
        cy.get('.sc-6a06b215-6 > .sc-43ec2adf-0 > .sc-43ec2adf-2').click()
        cy.get('[aria-labelledby="radix-:rf:"]').click()
        cy.get('.sc-6a06b215-2 > .sc-ea747762-0').click()
        cy.contains('Desculpe, no momento não temos nenhum animal disponível para adoção').should('be.visible')
    })
});