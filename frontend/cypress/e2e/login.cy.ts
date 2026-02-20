describe('Login do usuário', () => {
  
  beforeEach(() => {
    // Como definimos no config, basta usar o caminho relativo
    cy.visit('/login');
  });

  it('Cenário principal - login com credenciais válidas', () => {
    // 1. Monitorar a chamada de API antes de clicar
    cy.intercept('POST', '**/login').as('postLogin');

    cy.get('input[name="email"]').type('doador@doador.com');
    cy.get('input[name="password"]').type('doadoraf');
    cy.get('button[type="submit"]').click();

    // 2. Esperar a API responder (evita o erro de "content not found")
    cy.wait('@postLogin').its('response.statusCode').should('eq', 201);

    // 3. Valida se foi redirecionado para a área logada correta
    cy.url().should('include', '/area_logada/animais_disponiveis');
    
  });

  it('Cenário alternativo - login com senha inválida', () => {
    cy.intercept('POST', '**/login').as('postLoginError');

    cy.get('input[name="email"]').type('doador@doador.com');
    cy.get('input[name="password"]').type('senhaerrada');
    cy.get('button[type="submit"]').click();

    // Espera o erro 401 ou 400 da API
    cy.wait('@postLoginError');

    // Se o sistema usa alert do navegador (comum no Windows/Chrome):
    cy.on('window:alert', (str) => {
      expect(str).to.match(/inválid|erro|incorret/i);
    });

    // Se o sistema usa mensagem na tela:
    cy.get('body').should('contain.text', 'Erro');
  });
});