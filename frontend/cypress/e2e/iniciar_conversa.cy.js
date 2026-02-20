Cypress.on('uncaught:exception', () => false)

describe('HU05 - Iniciar Conversa', () => {

  const senha = '12345678'
  let emailDono
  let emailInteressado
  let tokenDono

  beforeEach(() => {
    emailDono = `dono_${Date.now()}_${Math.random()}@email.com`
    emailInteressado = `interessado_${Date.now()}_${Math.random()}@email.com`

    cy.request('POST', 'http://localhost:8080/users', {
      name: 'Dono Animal',
      email: emailDono,
      password: senha
    }).then(() => {
      cy.request('POST', 'http://localhost:8080/login', {
        email: emailDono,
        password: senha
      }).then((res) => {
        tokenDono = res.body.token

        const formData = new FormData()
        formData.append('name', 'Rex')
        formData.append('type', 'Cachorro')
        formData.append('gender', 'macho')
        formData.append('race', 'Vira-lata')
        formData.append('description', 'Cachorro amigável')

        cy.fixture('dog.jpg').then((fileContent) => {
          const blob = Cypress.Blob.base64StringToBlob(fileContent, 'image/jpeg')
          formData.append('pictures', blob, 'dog.jpg')
        })

        cy.request({
          method: 'POST',
          url: 'http://localhost:8080/animals',
          body: formData,
          headers: {
            Authorization: `Bearer ${tokenDono}`,
            'Content-Type': 'multipart/form-data'
          },
          failOnStatusCode: false
        })
      })
    })

    cy.request('POST', 'http://localhost:8080/users', {
      name: 'Interessado',
      email: emailInteressado,
      password: senha
    })
  })

  it('Deve iniciar conversa com o dono do animal', () => {
    cy.visit('/login')

    cy.get('input[name="email"]').type(emailInteressado)
    cy.get('input[name="password"]').type(senha)
    cy.contains('Login').click()

    cy.url().should('include', '/area_logada/animais_disponiveis')

    cy.get('a').contains('Saiba mais').first().click()

    cy.url().should('include', '/area_logada/animais_disponiveis/')

    cy.contains('Entrar em contato com o dono').click()

    cy.url().should('include', '/area_logada/conversas/')
  })

  it('Não deve permitir iniciar conversa sem autenticação', () => {
    cy.visit('/area_logada/animais_disponiveis')

    cy.url().should('include', '/login')
  })

})