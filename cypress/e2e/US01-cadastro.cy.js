describe('US01 — Cadastrar conta', () => {

  // Executa antes de cada teste, garantindo que estamos na página correta.
  beforeEach(() => {
    cy.visit('/cadastro');
  });
/**
 * Cenário Principal: Cadastro com sucesso
 */
it('Então o sistema registra a conta, exibe um alerta e redireciona para a tela de login', () => {
  // Preenche os campos do formulário
  cy.get('input[name="name"]').type('UsuarioTesteValido');
  
  const emailUnico = `teste.valido.${Date.now()}@email.com`;
  cy.get('input[name="email"]').type(emailUnico);

  cy.get('input[name="password"]').type('Senha@123');
  
  // Certifique-se de que este é o seletor correto para o campo "Confirme a senha"
  cy.get('input[name="confirmPassword"]').type('Senha@123');
  
  // --- CORREÇÃO FINAL E COMPLETA ---

  // 1. Preparamos o Cypress para "ouvir" o alerta de sucesso.
  // O texto foi copiado EXATAMENTE do log de erro.
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal('Cadastro efetuado com sucesso! Faça login para acessar nossa plataforma!');
  });
  
  // 2. Clicamos no botão que dispara o alerta e o redirecionamento.
  cy.get('button[type="submit"]').click();

  // 3. Por fim, verificamos se fomos redirecionados para a página de login correta.
  cy.url().should('include', '/login');
});
  /**
   * Cenário Alternativo A — Senhas diferentes
   */
  it('Então devo ver mensagem de validação informando que as senhas não coincidem', () => {
    cy.get('input[name="name"]').type('Usuário Senha Divergente');
    cy.get('input[name="email"]').type('senhas.diferentes@email.com');
    cy.get('input[name="password"]').type('Senha@123');
    
    // NOTA: Certifique-se de que 'input[name="confirmPassword"]' é o seletor correto.
    cy.get('input[name="confirmPassword"]').type('OutraSenha@456');

    cy.get('button[type="submit"]').click();
    
    // NOTA: Verifique na sua tela qual é a mensagem exata para senhas diferentes e ajuste se necessário.
    cy.contains('As senhas não coincidem').should('be.visible');

    cy.url().should('not.include', '/login');
  });

  /**
   * Cenário Alternativo B — Campos obrigatórios vazios
   */
  it('Então devo ver mensagens de obrigatoriedade ao deixar campos vazios', () => {
    cy.get('button[type="submit"]').click();

    // Textos já corrigidos com base na sua captura de tela.
    cy.contains('O nome é obrigatório').should('be.visible');
    cy.contains('O email é obrigatório').should('be.visible');
    cy.contains('A senha é obrigatória').should('be.visible');
    cy.contains('A confirmação da senha é obrigatória').should('be.visible');
  });
/**
 * Cenário Alternativo C — Email inválido
 */
it('Então devo ver mensagem de erro para e-mail em formato inválido', () => {
  // Dado que informo um e-mail em formato inválido
  const invalidEmail = 'email-invalido';
  cy.get('input[name="email"]').type(invalidEmail);
  
  // e preencho os outros campos
  cy.get('input[name="name"]').type('Usuário Email Inválido');
  cy.get('input[name="password"]').type('Senha@123');
  cy.get('input[name="confirmPassword"]').type('Senha@123');

  // Quando clico em Cadastrar
  cy.get('button[type="submit"]').click();

  // --- INÍCIO DA CORREÇÃO ---
  
  // Construímos a mensagem esperada
  const expectedMessage = `Inclua um "@" no endereço de e-mail. "${invalidEmail}" está com um "@" faltando.`;

  cy.get('input[name="email"]').then(($input) => {
    // Acessamos a propriedade de validação do elemento do navegador
    const actualMessage = $input[0].validationMessage;

    // "Normalizamos" as duas strings, removendo espaços múltiplos ou
    // caracteres de espaço diferentes, para garantir uma comparação correta.
    const normalize = (str) => str.replace(/\s+/g, ' ').trim();
    
    expect(normalize(actualMessage)).to.equal(normalize(expectedMessage));
  });
});
});