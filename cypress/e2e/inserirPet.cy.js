Cypress.on('uncaught:exception', (err, runnable) => {
  return false // impede que o Cypress falhe o teste por causa de erros da aplicação
})

describe('Cadastro de pet para adoção', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[type="email"]').type('teste@mail.com')
    cy.get('input[type="password"]').type('12345678')
    cy.contains('button', 'Login').click()
  })

    it('Deve cadastrar um animal para adoção', () => {
        cy.contains('Disponibilizar animal para adoção').click({ force: true }) // forçar clique se necessário

        cy.get('input[name="name"]').type('Garfield') 

        cy.get('button[role="combobox"]').filter(':contains("Selecione um tipo")').click();

        cy.get('div[role="option"]').contains('Gato').click();

        cy.get('button[role="combobox"]').filter(':contains("Selecione um gênero")').click();
            
        cy.get('div[role="option"]').contains('Macho').click();

        cy.get('input[name="race"]').type('Persa')

        cy.get('textarea[name="description"]').type('Gato atencioso e brincalhão, adora companhia')

        cy.get('input[type="file"]').selectFile('cypress/fixtures/cat1.jpg', { force: true });

        cy.contains('button', 'Cadastrar').click();

        cy.contains('Meus animais disponíveis para adoção').click({ force: true })
        cy.contains('Garfield').should('be.visible')
    })

    // cenário alternativo 1 (nome vazio)
    it('Não deve permitir cadastro sem informar o nome do animal', () => {
        cy.contains('Disponibilizar animal para adoção').click({ force: true })

        // preenche os outros campos
        cy.get('button[role="combobox"]').filter(':contains("Selecione um tipo")').click()
        cy.get('div[role="option"]').contains('Gato').click()

        cy.get('button[role="combobox"]').filter(':contains("Selecione um gênero")').click()
        cy.get('div[role="option"]').contains('Macho').click()

        cy.get('input[name="race"]').type('Persa')
        cy.get('textarea[name="description"]').type('Descrição teste')

        // tenta cadastrar
        cy.contains('button', 'Cadastrar').click()

        // valida erro
        cy.contains('O nome é obrigatório').should('be.visible')

        // garante que continua na página
        cy.url().should('include', '/area_logada/disponibilizar_animal')
    })

    // cenário alternativo 2 (sem imagem)
    it('Deve exibir erro ao tentar cadastrar animal sem enviar imagem', () => {
        cy.contains('Disponibilizar animal para adoção').click({ force: true })

        cy.get('input[name="name"]').type('Garfield')

        cy.get('button[role="combobox"]').filter(':contains("Selecione um tipo")').click()
        cy.get('div[role="option"]').contains('Gato').click()

        cy.get('button[role="combobox"]').filter(':contains("Selecione um gênero")').click()
        cy.get('div[role="option"]').contains('Macho').click()

        cy.get('input[name="race"]').type('Persa')
        cy.get('textarea[name="description"]').type('Gato dócil e tranquilo')

        // não envia imagem

        cy.contains('button', 'Cadastrar').click()

        // valida mensagem
        cy.contains('Adicione ao menos uma foto do animal').should('be.visible')

        // continua na mesma página
        cy.url().should('include', '/area_logada/disponibilizar_animal')
    })
})
