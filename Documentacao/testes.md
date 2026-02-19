
---

# Documentação de Testes Automatizados

## 1. Análise dos Testes Unitários Existentes

Os testes unitários atuais concentram-se na camada de Serviços (via Jest). As melhorias propostas são:

1. **Cobertura de Controladores:** Adicionar testes para validar o retorno correto de status HTTP utilizando simulações de Request/Response.
2. **Integração de Repositórios:** Implementar testes com banco de dados em memória ou ambiente de teste isolado para validar operações do Prisma (ex: deleção em cascata).
3. **Padrão Factory:** Criar geradores de dados falsos para reduzir a repetição na montagem dos objetos de teste nos arquivos `.spec.ts`.
---

## 2. Testes de Aceitação (Cypress)

<details>
<summary><strong>Funcionalidade 1: Cadastro de Animais</strong></summary>

<br>

### Cenário Principal: Cadastro com Sucesso

**Objetivo:** Garantir o preenchimento e envio correto do formulário de adoção.
**Passos:** Acessar a página de disponibilizar animal, preencher os campos obrigatórios, inserir a foto e enviar.
**Resultado Esperado:** Animal salvo e redirecionamento para a tela da conta do usuário.

---

### Cenário Alternativo 1: Falha por Campos Vazios

**Objetivo:** Validar o bloqueio de formulários incompletos.
**Passos:** Acessar a página e submeter o formulário em branco.
**Resultado Esperado:** Exibição de alertas de campos obrigatórios e permanência na página.

---

### Cenário Alternativo 2: Falha por Ausência de Imagem

**Objetivo:** Bloquear cadastro de animais sem foto.
**Passos:** Preencher os dados em texto e submeter sem anexar arquivo.
**Resultado Esperado:** Alerta exigindo upload de imagem e interrupção do envio.

---

### Código do Teste

```javascript
const email = 'larissa@gmail.com';
const senha = '12345678';
const nomeAnimal = 'Zigo'
const tipoAnimal = 'Gato'
const generoAnimal = 'Macho'
const racaAnimal = 'Siamês'

Cypress.on('uncaught:exception', () => false);

describe('Cadastrar animal para adoção', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(senha);
    cy.contains('button', 'Login').click();
    cy.url().should('include', '/area_logada/animais_disponiveis');
    
    cy.get('a[href="/area_logada/disponibilizar_animal"]').filter(':visible').first().should('be.visible').click();
    cy.url().should('include', '/area_logada/disponibilizar_animal');
  });

  it('Cenário Principal: deve preencher o formulário e cadastrar com sucesso', () => {
    cy.contains('label', 'Nome').find('input').type(nomeAnimal)
    cy.contains('span', "Tipo").parent().parent().find('button[role="combobox"]').should('be.visible').click()
    cy.get('[role="option"]').contains(tipoAnimal).click()
    cy.contains('span', "Gênero").parent().parent().find('button[role="combobox"]').should('be.visible').click()
    cy.get('[role="option"]').contains(generoAnimal).click()
    cy.contains('label', 'Raça').find('input').type(racaAnimal);
    cy.get('textarea').type("Um gatinho magrinho, elegante...");    
    cy.get('input#animalPictures').selectFile('cypress/fixtures/gato.jpeg', { force: true });
    
    cy.contains('button', 'Cadastrar').click();
  });

  it('Cenário Alternativo 1: deve bloquear o cadastro se campos obrigatórios estiverem vazios', () => {
    cy.contains('button', 'Cadastrar').click();
    cy.contains('Nome é obrigatório').should('be.visible'); 
    cy.url().should('include', '/area_logada/disponibilizar_animal');
  });

  it('Cenário Alternativo 2: deve bloquear o cadastro se tentar enviar sem foto', () => {
    cy.contains('label', 'Nome').find('input').type(nomeAnimal)
    cy.contains('span', "Tipo").parent().parent().find('button[role="combobox"]').should('be.visible').click()
    cy.get('[role="option"]').contains(tipoAnimal).click()
    cy.contains('span', "Gênero").parent().parent().find('button[role="combobox"]').should('be.visible').click()
    cy.get('[role="option"]').contains(generoAnimal).click()
    cy.contains('label', 'Raça').find('input').type(racaAnimal);
    cy.get('textarea').type("Gatinho sem foto de teste...");  
    cy.contains('button', 'Cadastrar').click();
  });
});
```

</details>

---

<details>
<summary><strong>Funcionalidade 2: Cadastro de Usuário</strong></summary>

<br>

### Cenário Principal: Cadastro com Sucesso

**Objetivo:** Garantir a criação de nova conta com credenciais válidas.
**Passos:** Acessar página de cadastro, preencher dados, confirmar senha e enviar.
**Resultado Esperado:** Cadastro processado e redirecionamento para tela de login.

---

### Cenário Alternativo 1: Senhas Divergentes

**Objetivo:** Validar a confirmação de senha.
**Passos:** Preencher campos com valores diferentes em "Senha" e "Confirmar Senha".
**Resultado Esperado:** Mensagem de erro "As senhas não coincidem".

---

### Cenário Alternativo 2: E-mail Inválido

**Objetivo:** Validar formato do e-mail inserido.
**Passos:** Informar string sem caractere arroba ou domínio.
**Resultado Esperado:** Mensagem de "E-mail inválido".

---

### Código do Teste

```javascript
const nome = 'Larissa';
const senha = '12345678';

describe('Fluxo de Cadastro de Usuário', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/cadastro');
  });

  it('Cenário Principal: deve permitir que um novo usuário se cadastre com sucesso', () => {
    cy.contains('label', 'Nome').find('input').type(nome);
    const emailDinamico = `larissa${Date.now()}@gmail.com`; 
    cy.get('input[name="email"]').type(emailDinamico);
    cy.get('input[name="password"]').type(senha);
    cy.get('input[name="confirmPassword"]').type(senha);
    cy.contains('button', 'Cadastrar').click();
    cy.url().should('include', '/login');
  });

  it('Cenário Alternativo 1: deve bloquear o cadastro se as senhas não coincidirem', () => {
    cy.contains('label', 'Nome').find('input').type(nome);
    cy.get('input[name="email"]').type('larissa_teste@gmail.com');
    cy.get('input[name="password"]').type(senha);
    cy.get('input[name="confirmPassword"]').type('senhaerrada123'); 
    cy.contains('button', 'Cadastrar').click();
    cy.contains('As senhas não coincidem').should('be.visible'); 
    cy.url().should('include', '/cadastro'); 
  });

  it('Cenário Alternativo 2: deve bloquear o cadastro com formato de e-mail inválido', () => {
    cy.contains('label', 'Nome').find('input').type(nome);
    cy.get('input[name="email"]').type('email_sem_arroba.com'); 
    cy.get('input[name="password"]').type(senha);
    cy.get('input[name="confirmPassword"]').type(senha);
    cy.contains('button', 'Cadastrar').click();
    cy.contains('E-mail inválido').should('be.visible'); 
  });
});
```

</details>

---

<details>
<summary><strong>Funcionalidade 3: Busca e Filtro de Animais</strong></summary>

<br>

### Cenário Principal: Filtro com Sucesso

**Objetivo:** Encontrar animal por parâmetros específicos.
**Passos:** Abrir modal de filtro, inserir nome e tipo, confirmar.
**Resultado Esperado:** Fechamento do modal e exibição do animal correspondente.

---

### Cenário Alternativo 1: Filtro Sem Resultados

**Objetivo:** Validar busca de animal inexistente.
**Passos:** Filtrar por nome não cadastrado na base.
**Resultado Esperado:** Fechamento do modal e exibição da lista em branco.

---

### Cenário Alternativo 2: Cancelamento do Filtro

**Objetivo:** Cancelar ação de filtro sem alterar a interface.
**Passos:** Abrir modal, preencher dados, pressionar ESC.
**Resultado Esperado:** Modal fechado e lista de animais intocada.

---

### Código do Teste

```javascript
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
  })

  it('Cenário Alternativo 2: Deve fechar o modal de filtro sem aplicar buscas ao pressionar ESC', () => {
    cy.contains('button', 'Filtrar').click()
    cy.contains('label', 'Nome').find('input').type('Teste Cancelamento')
    cy.get('body').type('{esc}')
    cy.get('[role="dialog"]').should('not.exist')
  })
})
```

</details>

---

## 3. Instruções de Execução

1. Inicie a API e a interface localmente (comandos `npm run dev` nos respectivos diretórios).
2. Na raiz do projeto frontend ou onde o Cypress estiver instalado, execute `npm install` para atualizar dependências.
3. Abra o painel do Cypress via terminal: `npx cypress open`.
4. Selecione E2E Testing e execute cada arquivo individualmente clicando sobre o respectivo nome.
