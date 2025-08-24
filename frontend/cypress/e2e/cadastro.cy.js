describe('Cadastro de Usuário', () => {
  it('Deve cadastrar novo usuário com sucesso', () => {
    cy.visit('/cadastro')
    cy.get('input[name="name"]').type('Novo')
    cy.get('input[name="email"]').type('novo@mail.com')
    cy.get('input[name="password"]').type('senhaSegura123')
    cy.get('input[name="confirmPassword"]').type('senhaSegura123')
    cy.get('button[type="submit"]').click()

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Cadastro efetuado com sucesso! Faça login para acessar nossa plataforma!')
    })
  })

  it('Deve exibir erro ao tentar cadastrar email já existente', () => {
    cy.visit('/cadastro')
    cy.get('input[name="name"]').type('Existente')
    cy.get('input[name="email"]').type('novo@mail.com')
    cy.get('input[name="password"]').type('senhaSegura123')
    cy.get('input[name="confirmPassword"]').type('senhaSegura123')
    cy.get('button[type="submit"]').click()

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Email já cadastrado.')
    })
  })

  it('Deve exibir erro quando o nome está vazio', () => {
    cy.visit('/cadastro')
    cy.get('input[name="email"]').type('teste@mail.com')
    cy.get('input[name="password"]').type('12345678')
    cy.get('button[type="submit"]').click()
    cy.contains('O nome é obrigatório')
  })
})
