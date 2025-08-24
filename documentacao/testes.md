# Melhorias

Após uma análise detalhada da estrutura do projeto no GitHub, constatei a ausência de testes unitários. O projeto não contém arquivos de teste (como _.test.js ou _.spec.js) nem um diretório de testes configurado para validar os componentes e funções de forma isolada.

### Proposta de Melhorias

A introdução de testes unitários é crucial para garantir a qualidade, a manutenibilidade e a estabilidade do código.

### Sugestões de Testes Unitários a serem criados:

1- Testes de Componentes (Renderização):

- Header e Footer: Garantir que ambos os componentes sejam renderizados corretamente, exibindo os links e informações esperadas.
- Card: Verificar se o componente Card renderiza corretamente as informações de um animal (imagem, nome, características).
- Loader: Testar se o componente de carregamento é exibido quando a propriedade loading é verdadeira.

2- Testes de Funções e Hooks:

- Funções de API (api.js): Criar testes para simular (mock) as chamadas à API e garantir que as funções getPet e getPets retornam os dados no formato esperado.
- Hooks customizados (se existirem): Caso o projeto evolua para ter hooks customizados (ex: usePets), testar a lógica contida neles de forma isolada.

3- Testes de Interação do Usuário:

- Filtragem na Home: Simular a digitação nos campos de filtro da página inicial e verificar se a lista de animais é atualizada conforme o esperado.

# Testes automatizados (Cypress)

## Cenário 1: Criação de Usuário

**Objetivo:** Validar que um novo usuário pode ser criado com sucesso.

**Passos do Teste:**

1. O usuário acessa a página de cadastro (`/cadastro`).
2. Preenche os campos:
   - `name`
   - `email`
   - `password`
   - `confirmPassword`
3. Clica no botão de cadastro (`Cadastrar`).
4. O teste verifica se a aplicação redireciona para a página de login.
5. Confirma que o `<h1>` da página contém o texto `"Faça login em nossa plataforma"`.

---

## Cenário 2: Login de Usuário Existente

**Objetivo:** Garantir que um usuário existente consegue acessar a aplicação.

**Passos do Teste:**

1. O usuário acessa a página de login (`/login`).
2. Preenche os campos `email` e `password` corretamente.
3. Clica no botão de login (`Entrar`).
4. O teste verifica se a URL não contém mais `/login`, indicando que o login foi bem-sucedido.
5. Confirma que a página principal contém o `<h1>` com o texto `"Animais disponíveis para adoção"`.

---

## Cenário 3: Tentativa de Login com Senha Incorreta

**Objetivo:** Garantir que a aplicação exibe mensagem de erro ao fornecer credenciais inválidas.

**Passos do Teste:**

1. O usuário acessa a página de login (`/login`).
2. Preenche o campo `email` corretamente e o campo `password` incorretamente.
3. Clica no botão de login (`Entrar`).
4. O teste verifica se é exibida a mensagem de erro `"Credenciais inválidas"`.

# Execução dos Testes Automatizados

Antes de começar, certifique-se de que todas as dependências do projeto foram instaladas:

```bash
npm install
```

Em seguida, instale o Cypress como uma dependência de desenvolvimento:

```bash
npm install cypress --save-dev
```

### 2. Execução dos Testes

Existem duas formas de rodar os testes com o Cypress:

#### Modo Interativo (Recomendado para desenvolvimento)

Este modo abre a interface gráfica do Cypress, permitindo que você veja os testes rodando em tempo real no navegador.

Primeiro, inicie a aplicação React:

```bash
npm start
```

Em outro terminal, abra o Cypress:

```bash
npx cypress open
```

Na janela do Cypress, clique em "E2E Testing", selecione o navegador desejado e clique no arquivo de teste `adotar_pet.cy.js` para executá-lo.

#### Modo "Headless" (Para integração contínua)

Este modo executa os testes em um navegador em segundo plano, sem interface gráfica. É ideal para ambientes de CI/CD.

Primeiro, inicie a aplicação React:

```bash
npm start
```

Em outro terminal, rode o comando de execução do Cypress:

```bash
npx cypress run
```

O resultado dos testes será exibido diretamente no seu terminal e/ou UI.
