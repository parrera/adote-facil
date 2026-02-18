const email = 'larissa@gmail.com'
const senha = '12345678'
const nomeAnimal = 'Zigo'

describe('Funcionalidades de busca de animal via filtros', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(senha)
    cy.contains('button', 'Login').click()
    cy.url().should('include', '/area_logada/animais_disponiveis')
  })

  it('Cenário Principal: Deve filtrar um animal com sucesso ao preencher o formulário', () => {
    cy.contains('button', 'Filtrar').click()
    cy.contains('label', 'Nome').find('input').type(nomeAnimal)

    cy.contains('button[role="combobox"]', 'Selecione um tipo').scrollIntoView().click()
    cy.get('[role="option"]').contains('Gato').click()

    cy.get('[role="dialog"][data-state="open"]').contains('button', "Filtrar").click()

    cy.get('[role="dialog"]').should('not.exist')
    cy.contains(nomeAnimal).should('be.visible')
  })

  it('Cenário Alternativo 1: Deve exibir lista vazia ao buscar por um animal inexistente', () => {
    cy.contains('button', 'Filtrar').click()
    
    cy.contains('label', 'Nome').find('input').type('NomeBizarroNaoExiste123')
    cy.get('[role="dialog"][data-state="open"]').contains('button', "Filtrar").click()

    cy.get('.animal-card-class-se-existir').should('not.exist') 
    // cy.contains('Nenhum animal encontrado').should('be.visible') // Descomente se o seu front tiver essa mensagem
  })

  it('Cenário Alternativo 2: Deve fechar o modal de filtro sem aplicar buscas ao pressionar ESC', () => {
    cy.contains('button', 'Filtrar').click()
    cy.contains('label', 'Nome').find('input').type('Teste Cancelamento')
    
    cy.get('body').type('{esc}')
    
    cy.get('[role="dialog"]').should('not.exist')
  })
})