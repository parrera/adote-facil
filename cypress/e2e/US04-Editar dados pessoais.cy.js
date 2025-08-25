describe('US04 — Editar dados pessoais (Teste E2E Real)', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // O React Error #418 é um problema conhecido de hidratação.
    // Estamos dizendo ao Cypress para ignorá-lo e não falhar o teste.
    if (err.message.includes('Minified React error #418')) {
      return false; // Retornar 'false' impede que o Cypress falhe o teste
    }
    // Deixa que outros erros inesperados ainda falhem o teste
    return true;
  });

  beforeEach(() => {
    // --- PASSO 1: LOGIN E NAVEGAÇÃO (REAL) ---
    cy.viewport(1280, 780);
    // O login, usando um usuário que existe no seu banco de dados
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').type('teste.valido.1756136796682@email.com'); 
    cy.get('input[name="password"]').type('Senha@123');
    cy.get('button[type="submit"]').click();

    cy.contains('a', 'Editar dados pessoais').click({ force: true });

    cy.url().should('include', '/area_logada/editar_dados');
    cy.contains('button', 'Salvar alterações').should('be.visible');
  });

  context('Cenário Principal: Atualização com sucesso', () => {
    it('Dado que alterei os dados com valores válidos, quando clico em Salvar, então os dados são persistidos no backend', () => {
      // --- PASSO 2: AÇÃO DO USUÁRIO ---

      const nomeUnico = `NomeTeste`;

      // Limpa o campo de nome e digita o novo valor.
      cy.get('input[name="name"]').clear().type(nomeUnico);

      cy.contains('button', 'Salvar alterações').click();

      // --- PASSO 3: VERIFICAÇÃO (CORRIGIDA) ---
      cy.on('window:alert', (textoDoAlerta) => {
        expect(textoDoAlerta).to.equal('Dados editados com sucesso!');
      });
      cy.reload();

      cy.get('input[name="name"]').should('have.value', nomeUnico);
    });
  });

  context('Cenário Alternativo A: Email inválido', () => {
    it('Dado que informei um e-mail inválido, quando salvo, então devo ver uma mensagem de validação na tela', () => {
      // --- AÇÃO DO USUÁRIO ---
      cy.get('input[name="email"]').clear().type('email-invalido');
      cy.contains('button', 'Salvar alterações').click();

      cy.contains('Email inválido').should('be.visible');

    });
  });
});