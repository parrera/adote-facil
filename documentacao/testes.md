Relatório de Testes Automatizados — Projeto Adote Fácil (PR4)
1) Análise dos Testes Unitários Existentes

Os testes unitários do backend estão organizados principalmente na camada de serviços, abrangendo funcionalidades relacionadas a usuários, animais e chats. Eles utilizam o framework Jest, juntamente com mocks para simular dependências, permitindo testar a lógica do sistema sem depender diretamente do banco de dados.

De forma geral, os testes verificam corretamente os principais comportamentos das funcionalidades, como validação de usuários, criação de registros e retorno adequado em situações de sucesso ou erro.

Apesar disso, algumas melhorias podem ser consideradas para aumentar a qualidade da suíte de testes.

1.1) Melhorias propostas

Aumento de cobertura: adicionar testes para cenários alternativos ou entradas inválidas, ampliando a verificação das regras de negócio.

Refatoração de dados: reduzir repetição na criação de dados utilizados nos testes, tornando o código mais organizado e fácil de manter.

Padronização: melhorar a consistência das verificações de erro, garantindo maior clareza na leitura dos testes.

2) Testes de Aceitação Automatizados (Cypress)

A seguir estão descritos os cenários de teste implementados para validar funcionalidades críticas do sistema sob a perspectiva do usuário final, utilizando o framework Cypress.

2.1) Cenário de Teste: Autenticação de Usuário (Login)

Objetivo: garantir que apenas usuários cadastrados acessem a área administrativa.

2.1.1) Cenário Principal — Login com credenciais válidas

Dado que o usuário acessa a página de login;

Quando insere um e-mail e senha corretos e clica em "Entrar";

Então o sistema deve processar a autenticação e redirecioná-lo para o painel de animais disponíveis.

2.1.2) Cenário Alternativo — Login com senha inválida

Dado que o usuário insere um e-mail válido, mas uma senha incorreta;

Quando tenta realizar o login;

Então o sistema deve exibir uma mensagem de erro (ex.: "inválido" ou "incorreto") e permanecer na página de login.

2.2) Cenário de Teste: Cadastro de Animal

Objetivo: validar a inclusão de novos animais para adoção no sistema.

2.2.1) Cenário Principal — Cadastro realizado com sucesso

Dado que o usuário está autenticado e na página de disponibilização de animais;

Quando preenche o nome, seleciona o tipo (Cachorro), o gênero (Macho), realiza o upload da foto e clica em "Cadastrar";

Então o sistema deve redirecionar o usuário e exibir o novo animal na lista de animais do doador.

2.2.2) Cenário Alternativo — Validação de campos obrigatórios

Dado que o usuário tenta cadastrar um animal sem preencher as informações obrigatórias;

Quando clica no botão "Cadastrar";

Então mensagens de alerta como "O tipo é obrigatório" devem ser exibidas e o cadastro não deve ser processado.

2.3) Cenário de Teste: Gerenciamento de Adoção (Ciclo de Vida)

Objetivo: validar as ações de confirmação de adoção e exclusão de animais.

2.3.1) Cenário Principal — Confirmação de Adoção

Dado que o usuário possui um animal cadastrado na lista;

Quando clica no botão "Confirmar adoção" no card correspondente ao animal;

Então o sistema deve processar a confirmação e o animal deve ser removido da lista pública.

2.3.2) Cenário Alternativo — Desistência/Exclusão via Lixeira

Dado que o usuário deseja remover um animal da lista de disponíveis;

Quando clica no ícone da lixeira no card do animal;

Então o sistema deve remover o registro do animal da lista de animais disponíveis para adoção do doador.

3) Instruções básicas para execução dos testes automatizados
3.1) Inicializar os containers Docker

Na raiz do projeto Adote Fácil, execute os comandos abaixo para iniciar os serviços necessários (banco de dados e backend):

docker compose up -d
docker compose ps

O comando docker compose ps deve indicar que os containers estão em estado Up.

3.2) Executar o Frontend

Abra um novo terminal e execute os comandos abaixo dentro da pasta frontend:

cd frontend
npm install
npm run dev

Após a inicialização, o terminal exibirá o endereço local da aplicação, normalmente:

http://localhost:3000

ou

http://localhost:3001
 (caso a porta 3000 esteja em uso).

A aplicação deverá permanecer em execução durante a realização dos testes.

3.3) Executar o Cypress

Em um novo terminal, ainda dentro da pasta frontend, execute:

cd frontend
npx cypress open

Na interface do Cypress:

Selecione a opção E2E Testing;

Escolha o navegador desejado;

Execute os testes disponíveis na pasta:

cypress/e2e/