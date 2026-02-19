describe('Cancelamento de Solicitação de Adoção', () => {

    beforeEach(() => {
        cy.visit('/login')
        cy.get('input[name=email]').type('adotante@test.com')
        cy.get('input[name=senha]').type('12345678')
        cy.contains('Entrar').click()

        cy.visit('/minhas-solicitacoes')
    })

    it('Cenário principal: Deve cancelar solicitação com sucesso', () => {
        cy.contains('Cancelar solicitação').first().click()
        cy.contains('Confirmar').click()

        cy.contains('Solicitação cancelada com sucesso')
    })

    it('Alternativo: Cancelar e desistir da confirmação', () => {
        cy.contains('Cancelar solicitação').first().click()
        cy.contains('Cancelar').click()

        cy.contains('Solicitação ativa')
    })

})
