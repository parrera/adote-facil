describe('US03 — Ver animais disponíveis para adoção (Versão Adaptada)', () => {
  
  beforeEach(() => {
    // --- PASSO 1: ADAPTE O LOGIN ---
    // Este bloco simula o login. Altere os seletores e credenciais
    // para corresponderem exatamente à sua tela de login.
    cy.visit('http://localhost:3000/login'); // Altere se sua URL de login for diferente
    cy.get('input[name="email"]').type('usuario@teste.com');
    cy.get('input[name="password"]').type('senha123');
    cy.get('button[type="submit"]').click();

    // Verifica se, após o login, o usuário foi redirecionado para a página correta
    cy.url().should('include', '/area_logada/animais_disponiveis');
  });

  context('Cenário Principal: Existem animais disponíveis', () => {
    it('Dado que existem animais cadastrados, quando acesso a página, então vejo a lista de animais', () => {
      // --- PASSO 2: ADAPTE A ROTA DA API ---
      // Intercepta a chamada da API que busca os animais.
      // Altere a rota ('/api/animais') se a sua for diferente.
      cy.intercept('GET', '/api/animais', {
        statusCode: 200,
        fixture: 'animais-disponiveis.json' // Mock de dados com uma lista de animais
      }).as('getAvailableAnimals');

      // Visita a página (o beforeEach já faz isso, mas podemos reforçar para clareza)
      cy.visit('http://localhost:3000/area_logada/animais_disponiveis');

      // Espera a chamada da API ser completada
      cy.wait('@getAvailableAnimals');
      
      // --- PASSO 3: ADAPTE OS SELETORES 'data-cy' ---
      // Verifique seu código HTML e adicione esses atributos para tornar o teste mais estável.
      
      // Verifica se a lista de animais é exibida
      cy.get('[data-cy="animal-list"]').should('be.visible');
      cy.get('[data-cy="animal-card"]').should('have.length.greaterThan', 0);

      // Verifica se as informações mínimas de um animal estão presentes
      cy.get('[data-cy="animal-card"]').first().within(() => {
        cy.get('[data-cy="animal-name"]').should('not.be.empty');
        cy.get('[data-cy="animal-attributes"]').should('not.be.empty');
      });
    });
  });

  context('Cenário Alternativo A: Estado Vazio', () => {
    it('Dado que não há animais disponíveis, quando acesso a página, então vejo a mensagem de estado vazio', () => {
      // --- PASSO 2 (alternativo): ADAPTE A ROTA DA API ---
      // Intercepta a chamada da API e retorna um array vazio.
      // Altere a rota ('/api/animais') se a sua for diferente.
      cy.intercept('GET', '/api/animais', {
        statusCode: 200,
        body: [] // Retorna uma lista vazia, simulando o estado vazio
      }).as('getNoAvailableAnimals');

      // Visita a página
      cy.visit('http://localhost:3000/area_logada/animais_disponiveis');

      // Espera a chamada da API ser completada
      cy.wait('@getNoAvailableAnimals');

      // --- PASSO 3 (alternativo): ADAPTE OS SELETORES 'data-cy' ---
      // Verifique seu código HTML para encontrar os seletores corretos.

      // Garante que a lista de animais não existe na página
      cy.get('[data-cy="animal-list"]').should('not.exist');

      // Verifica se o ícone de estado vazio está visível
      cy.get('[data-cy="empty-state-icon"]').should('be.visible');

      // Verifica se a mensagem de estado vazio é exibida com o texto correto da imagem
      cy.get('[data-cy="empty-state-message"]')
        .should('be.visible')
        .and('contain.text', 'Desculpe, no momento não temos nenhum animal disponível para adoção');
    });
  });
});