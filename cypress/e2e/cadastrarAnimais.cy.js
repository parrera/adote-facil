describe('Cadastro de animal', () => {
    beforeEach(() => {
        cy.on('uncaught:exception', (err) => {
            if (err.message.includes('#418')) return false;
        });
    });

    it('Cenario principal - Cadastrar animal', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('[name="email"]').type('doador@doador.com')
        cy.get('[name="password"]').type('doadoraf')
        cy.get('button[type="submit"]').click()
        cy.get('.sc-26506e6-5 > .sc-c7cdb42d-0 > [href="/area_logada/disponibilizar_animal"] > .sc-c7cdb42d-1 > span').click()
        cy.get('[name="name"]').type('Chico')
        cy.get('.sc-b77a2f6d-8 > .sc-43ec2adf-0 > .sc-43ec2adf-2').click()
        cy.get('[aria-labelledby="radix-:ri:"]').click()
        cy.get('.sc-b77a2f6d-9 > .sc-43ec2adf-0 > .sc-43ec2adf-2').click()
        cy.get('[aria-labelledby="radix-:rs:"]').click()
        cy.get('[name="race"]').type("Periquito")
        cy.get('[name="description"]').type("Animal dócil e brincalhão.")
        cy.get('.sc-b77a2f6d-16').click()
        cy.get('input[type="file"]').selectFile('cypress/fixtures/images/chicoPeriquito.jpg', { force: true })
        cy.get('.sc-ea747762-0').click()
    })

    it('Cenario alternativo - Cadastrar animal sem nome', () =>{
        cy.visit('http://localhost:3000/login')
        cy.get('[name="email"]').type('doador@doador.com')
        cy.get('[name="password"]').type('doadoraf')
        cy.get('button[type="submit"]').click()
        cy.get('.sc-26506e6-5 > .sc-c7cdb42d-0 > [href="/area_logada/disponibilizar_animal"] > .sc-c7cdb42d-1 > span').click()
        cy.get('.sc-b77a2f6d-8 > .sc-43ec2adf-0 > .sc-43ec2adf-2').click()
        cy.get('[aria-labelledby="radix-:rg:"]').click()
        cy.get('.sc-b77a2f6d-9 > .sc-43ec2adf-0 > .sc-43ec2adf-2').click()
        cy.get('[aria-labelledby="radix-:rs:"]').click()
        cy.get('[name="race"]').type("Gato")
        cy.get('[name="description"]').type("Adora dormir e ronronar.")
        cy.get('.sc-b77a2f6d-16').click()
        cy.get('input[type="file"]').selectFile('cypress/fixtures/images/gatoSemNome.jpg', { force: true })
        cy.get('.sc-ea747762-0').click()
        cy.contains('O nome é obrigatório').should('be.visible')
    })

    it('Cenário alternativo - Cadastrar animal sem foto de perfil', () =>{
        cy.visit('http://localhost:3000/login')
        cy.get('[name="email"]').type('doador@doador.com')
        cy.get('[name="password"]').type('doadoraf')
        cy.get('button[type="submit"]').click()
        cy.get('.sc-26506e6-5 > .sc-c7cdb42d-0 > [href="/area_logada/disponibilizar_animal"] > .sc-c7cdb42d-1 > span').click()
        cy.get('[name="name"]').type('Fenrir')
        cy.get('.sc-b77a2f6d-8 > .sc-43ec2adf-0 > .sc-43ec2adf-2').click()
        cy.get('[aria-labelledby="radix-:re:"]').click()
        cy.get('.sc-b77a2f6d-9 > .sc-43ec2adf-0 > .sc-43ec2adf-2').click()
        cy.get('[aria-labelledby="radix-:rs:"]').click()
        cy.get('[name="race"]').type("Rusky Siberiano")
        cy.get('[name="description"]').type("Adora passear e uivar para a lua.")
        cy.get('.sc-ea747762-0').click()
        cy.contains('Adicione ao menos uma foto do animal').should('be.visible')
    })

});