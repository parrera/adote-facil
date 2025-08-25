describe('US02 — Fazer login', () => {

  // Esta variável guardará os dados do usuário que vamos criar
  let userData;

  beforeEach(() => {
    // --- PREPARAÇÃO DO TESTE ---
    const userName = 'Usuario Para Login';
    const email = `teste.login.${Date.now()}@email.com`;
    const password = 'SenhaForte123';
    
    userData = { name: userName, email, password };

    // Cria um usuário via API para garantir um ambiente limpo
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/users',
      body: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        confirm_password: userData.password
      }
    });
    cy.visit('/login');
  });

  /**
   * Cenário Principal: Login com sucesso
   */
  it('Então acesso a área logada e vejo meu nome no menu lateral', () => {
    cy.get('input[type="email"]').type(userData.email);
    cy.get('input[type="password"]').type(userData.password);

    // e clico em Login
    cy.get('button[type="submit"]').click();
    // Usamos o seletor exato encontrado pelo Selector Playground.
    cy.get(".sc-368028a3-5 > .sc-368028a3-6 > span") // Encontra o local exato
        .should('be.visible') // Verifica se está visível
        .and('contain', userData.name); // E verifica se contém o nome correto

    cy.url().should('not.include', '/login');
    });

  /**
   * Cenário Alternativo A — Credenciais inválidas
   */
  it('Então devo ver mensagem de erro e permanecer na tela de login', () => {
    // Dado que informei email ou senha incorretos
    cy.get('input[type="email"]').type(userData.email);
    cy.get('input[type="password"]').type('senha-errada');

    // Preparamos o Cypress para "ouvir" o alerta
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Email ou senha inválidos.');
    });
    cy.get('button[type="submit"]').click();
    // Então permaneço na tela de login
    cy.url().should('include', '/login');
  });

  /**
 * NOVO TESTE - Cenário Alternativo B — Campos vazios
 */
  it('Então o sistema sinaliza o campo e não autentica', () => {
  // Dado que deixei algum campo obrigatório vazio
  // Quando tento logar
   cy.get('button[type="submit"]').click();

  // Então o sistema sinaliza o campo e não autentica
  // Usamos agora o texto exato que aparece na tela, conforme a imagem.
   cy.contains('O email é obrigatório').should('be.visible');
   cy.contains('A senha é obrigatória').should('be.visible');
  
   cy.url().should('include', '/login');
   });
  /**
 * Teste: Link para Cadastro
 */
it('Deve navegar para a página de cadastro ao clicar no link "Cadastre-se"', () => {
  // Quando eu clico no link "Cadastre-se" 
  // depois verifica o texto dentro dele.
  cy.get('a').contains('Cadastre-se').click();

  // Então a URL deve mudar para a página de cadastro
  cy.url().should('include', '/cadastro');
  });
});