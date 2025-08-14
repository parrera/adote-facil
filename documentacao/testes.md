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

### Cenário 1: Sucesso na Solicitação de Adoção (Caminho Feliz)

- Objetivo: Validar o fluxo completo e bem-sucedido de um usuário que solicita a adoção de um animal.
- Dado que o usuário está na página inicial da aplicação.
- Quando ele clica em um dos animais listados.
- E ele é redirecionado para a página de detalhes do animal.
- E ele preenche todos os campos do formulário de adoção (Nome, Email, Telefone e Mensagem).
- E ele clica no botão "Quero Adotar".
- Então ele deve ver uma mensagem de confirmação, informando que a solicitação foi enviada com sucesso.

### Cenário 2: Tentativa de Adoção com Formulário Inválido

- Objetivo: Garantir que o formulário de adoção possui validações e não permite o envio de dados incompletos.
- Dado que o usuário está na página de detalhes de um animal.
- Quando ele clica no botão "Quero Adotar" sem preencher nenhum campo.
- Então o envio deve ser bloqueado e uma indicação de erro (validação do navegador) deve ser exibida no primeiro campo obrigatório.
- E Quando ele preenche apenas o campo "Nome" e clica novamente em "Quero Adotar".
- Então o envio deve ser bloqueado novamente, com a indicação de erro no próximo campo obrigatório (Email).

### Cenário 3: Acesso a um Pet Inexistente

- Objetivo: Verificar como a aplicação se comporta quando o usuário tenta acessar a URL de um animal que não existe na base de dados.
- Dado que o usuário tenta acessar diretamente a URL de um pet com um ID inválido (ex: /pets/99999).
- Então a aplicação deve exibir uma mensagem clara de "Pet não encontrado" ou redirecioná-lo para uma página de erro 404, sem quebrar a interface.

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

O resultado dos testes será exibido diretamente no seu terminal.
