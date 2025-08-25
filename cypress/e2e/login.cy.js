describe('Login de Usuário', () => {
  const email = `login${Date.now()}@exemplo.com`;
  const password = 'Senha@123';

  before(() => {
    // Cria um usuário para os testes de login
    cy.request('POST', 'http://localhost:8080/users', { 
      name: 'Usuario Login', 
      email, 
      password 
    });
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('Cenário Principal: Deve logar com sucesso um usuário válido', () => {
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').click();

    cy.url().should('include', '/area_logada'); // Supondo que o usuário é redirecionado para a área logada
  });

  it('Cenário Alternativo: Deve exibir erro ao tentar logar com senha incorreta', () => {
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type('senha-errada');
    cy.get('button[type=submit]').click();

    // A asserção aqui depende de como a UI exibe o erro.
    // Pode ser um alert, ou um texto na página.
    // Vou usar uma asserção genérica que pode ser ajustada.
    // Exemplo com alert:
    cy.on('window:alert', (str) => {
      expect(str).to.contain('Credenciais inválidas'); // Ajuste a mensagem conforme a API retorna
    });

    // Exemplo com texto na página:
    // cy.contains('Credenciais inválidas').should('be.visible');
  });
});
