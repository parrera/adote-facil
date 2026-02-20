Relatório de Testes Automatizados — Projeto Adote Fácil (PR4)

1) Análise dos Testes Unitários Existentes
Os testes unitários do backend estão organizados principalmente na camada de serviços, abrangendo funcionalidades relacionadas a usuários, animais e chats. Eles utilizam Jest juntamente com mocks para simular dependências, permitindo testar a lógica do sistema sem depender diretamente do banco de dados.

De forma geral, os testes verificam corretamente os principais comportamentos das funcionalidades, como validação de usuários, criação de registros e retorno adequado em situações de sucesso ou erro.

Apesar disso, algumas melhorias podem ser consideradas para aumentar a qualidade da suíte de testes:

1.1) Melhorias propostas
Aumento de Cobertura: Adicionar mais testes para cenários alternativos ou entradas inválidas, aumentando a cobertura das regras de negócio.

Refatoração de Dados: Reduzir repetição na criação de dados utilizados nos testes, tornando o código mais organizado e fácil de manter.

Padronização: Melhorar a padronização das verificações de erro, garantindo maior clareza na leitura dos testes.

2) Testes de Aceitação Automatizados (Cypress)

Abaixo estão descritos os cenários de teste implementados para validar as funcionalidades críticas do sistema sob a perspectiva do usuário final, utilizando o framework Cypress.

2.1) Cenário de Teste: Autenticação de Usuário (Login)
Objetivo: Garantir que apenas usuários cadastrados acessem a área administrativa.

2.1.1) Cenário Principal: Login com credenciais válidas

Dado que o usuário acessa a página de login;

Quando insere um e-mail e senha corretos e clica em "Entrar";

Então o sistema deve processar a autenticação e redirecioná-lo para o painel de animais disponíveis.

2.1.2) Cenário Alternativo: Login com senha inválida

Dado que o usuário insere um e-mail válido mas uma senha incorreta;

Quando tenta realizar o login;

Então o sistema deve exibir uma mensagem de erro ("inválido" ou "incorreto") e permanecer na página de login.

2.2) Cenário de Teste: Cadastro de Animal
Objetivo: Validar a inclusão de novos animais para adoção no sistema.

2.2.1) Cenário Principal: Cadastro realizado com sucesso

Dado que o usuário está autenticado e na página de disponibilização de animais;

Quando preenche o nome, seleciona o tipo (Cachorro), o gênero (Macho), realiza o upload da foto e clica em "Cadastrar";

Então o sistema deve redirecionar o usuário e exibir o novo animal na lista de animais do doador.

2.2.2) Cenário Alternativo: Validação de campos obrigatórios

Dado que o usuário tenta cadastrar um animal sem preencher as informações obrigatórias;

Quando clica no botão "Cadastrar";

Então mensagens de alerta como "O tipo é obrigatório" devem ser exibidas e o cadastro não deve ser processado.

2.3) Cenário de Teste: Gerenciamento de Adoção (Ciclo de Vida)
Objetivo: Validar as ações de confirmação de adoção e exclusão de animais.

2.3.1) Cenário Principal: Confirmação de Adoção

Dado que o usuário possui um animal cadastrado na lista;

Quando clica no botão "Confirmar adoção" no card correspondente ao animal;

Então o sistema deve processar a confirmação e o animal deve ser removido da lista pública.

2.3.2) Cenário Alternativo: Desistência/Exclusão via Lixeira

Dado que o usuário deseja remover um animal da lista de disponíveis;

Quando clica no ícone da lixeira no card do animal;

Então o sistema deve remover o registro do animal da lista de animais disponíveis para adoção do doador.

3) Instruções de Execução
Siga os passos abaixo para rodar os testes automatizados localmente:

3.1) Pré-requisitos
Node.js: Versão LTS instalada;

Ambiente: Frontend e Backend do projeto rodando simultaneamente;

Editor: Visual Studio Code (recomendado).

3.2) Passo a Passo
Instalação: No terminal da pasta frontend, execute:

Bash
npm install
Abertura do Cypress: Execute o comando para abrir o Test Runner:

Bash
npx cypress open
Execução:

Selecione a opção E2E Testing;

Escolha o navegador de sua preferência (Chrome ou Electron);

Clique no arquivo desejado (login.cy.ts, cadastro-animal.cy.ts ou confirmar-adocao.cy.ts) para rodar a automação.