# Testes

Os testes foram organizados em dois níveis complementares, buscando equilíbrio entre velocidade, confiabilidade e cobertura funcional.

## Testes Unitários e de Integração (Jest)
Responsáveis por validar a lógica da aplicação em nível de código, garantindo que regras de negócio funcionem corretamente de forma isolada.

## Testes End-to-End (Cypress):
Focados na experiência do usuário, verificando se os fluxos principais do sistema funcionam corretamente quando todas as camadas estão integradas.

#### Testes Unitários e de Integração

Os testes com Jest concentram-se principalmente na camada de serviços, onde está a maior parte das regras de negócio do sistema.

#### Avaliação da Implementação Atual

A estrutura existente demonstra boa maturidade técnica e alinhamento com práticas modernas de testes automatizados.

#### Aspectos Positivos
- Uso adequado de mocks: Os repositórios são simulados com jest-mock-extended, permitindo que os testes executem sem dependência de banco de dados e com alta velocidade.
- Arquitetura voltada à testabilidade: A injeção de dependência adotada nos serviços facilita a substituição de implementações reais por mocks, reduzindo acoplamento e aumentando a previsibilidade dos testes.
- Cobertura de fluxos relevantes: A suíte contempla tanto cenários de sucesso quanto validações de regras importantes do sistema, garantindo maior confiança na lógica implementada.
- Boa organização dos testes: Os casos seguem estrutura consistente, com nomes claros e separação lógica das etapas de preparação, execução e verificação.

#### Possíveis Evoluções
Expandir testes além da camada de serviços. Uma melhoria natural seria incluir:

- testes de controllers, verificando validações e respostas HTTP
- testes de repositórios, utilizando banco de dados de teste para validar integração real
- Reforçar isolamento entre casos de teste: A substituição de beforeAll por beforeEach garantiria reinicialização completa dos mocks a cada execução, evitando efeitos colaterais entre testes.
- Eliminar ajustes manuais de tipagem: A criação de funções utilitárias para geração de mocks tipados (mock factories) pode remover a necessidade de ts-expect-error, tornando a suíte mais segura e legível.

```
Execução dos Testes
Dentro da pasta do backend:

cd backend
npm install
npm test

Para visualizar a cobertura de código:
npm test -- --coverage
```

## Testes de Aceitação (Cypress)
Estes testes validam os fluxos principais da aplicação sob a perspectiva do usuário.

#### Cenário 1: Cadastro de animal com dados válidos (inserirPet.cy.js)
- Dado que eu sou um usuário autenticado
- E estou na área logada do sistema
- Quando eu acesso a opção "Disponibilizar animal para adoção"
- E preencho o nome do animal com "Garfield"
- E seleciono o tipo como "Gato"
- E seleciono o gênero como "Macho"
- E preencho a raça com "Persa"
- E preencho a descrição do animal
- E adiciono uma imagem do animal
- E clico no botão "Cadastrar"
- Então o animal deve ser cadastrado com sucesso
- E ao acessar "Meus animais disponíveis para adoção"
- E devo visualizar o nome "Garfield" na lista

#### Cenário 1.1: Tentativa de cadastro sem nome do animal (Alternativo)
- Dado que eu sou um usuário autenticado
- E estou na página de cadastro de animal para adoção
- Quando eu seleciono o tipo do animal
- E seleciono o gênero do animal
- E preencho os demais campos obrigatórios
- E não informo o nome do animal
- E clico no botão "Cadastrar"
- Então o cadastro não deve ser realizado
- E devo permanecer na página de cadastro
- E devo visualizar a mensagem "O nome é obrigatório"

#### Cenário 1.2: Tentativa de cadastro sem imagem (Alternativo)
- Dado que eu sou um usuário autenticado
- E estou na página de cadastro de animal para adoção
- Quando eu preencho o nome do animal
- E seleciono o tipo do animal
- E seleciono o gênero do animal
- E preencho a raça do animal
- E preencho a descrição do animal
- E não adiciono nenhuma imagem
- E clico no botão "Cadastrar"
- Então o cadastro não deve ser realizado
- E devo permanecer na página de cadastro
- E devo visualizar a mensagem "Adicione ao menos uma foto do animal"

---

#### Cenário 2: Login com credenciais válidas (login.cy.js)
- Dado que eu sou um usuário cadastrado
- E estou na página de login
- Quando eu preencho o campo de e-mail com um e-mail válido
- E preencho o campo de senha com uma senha válida
- E clico no botão "Entrar"
- Então eu devo ser redirecionado para a área logada
- E a URL deve conter /area_logada
- E devo visualizar o título "Animais disponíveis para adoção"

####  Cenário 2.1: Login com senha inválida (Alternativo)
- Dado que eu estou na página de login
- Quando eu preencho o campo de e-mail com um e-mail válido
- E preencho o campo de senha com uma senha incorreta
- E clico no botão "Entrar"
- Então eu devo permanecer na página de login
- E a URL deve conter /login
- E devo visualizar a mensagem "A senha deve conter no mínimo 8 caracteres"

####  Cenário 2.2: Login com campos vazios (Alternativo)
- Dado que eu estou na página de login
- Quando eu clico no botão "Entrar" sem preencher os campos
- Então eu devo permanecer na página de login
- E a URL deve conter /login
- E devo visualizar a mensagem "O email é obrigatório"
- E devo visualizar a mensagem "A senha é obrigatória"

---

#### Cenário 3: Alterar nome do usuário com sucesso (alterarDados.cy.js)
- Dado que eu sou um usuário autenticado
- E estou na página de edição de dados pessoais
- Quando eu altero o campo de nome do usuário
- E clico no botão "Salvar alterações"
- Então os dados devem ser atualizados com sucesso
- E ao retornar para a página de edição
- E devo visualizar o novo nome salvo no campo de nome
- E o e-mail do usuário deve permanecer inalterado

#### Cenário 3.1: Tentativa de salvar com nome em branco
- Dado que eu sou um usuário autenticado
- E estou na página de edição de dados pessoais
- Quando eu removo o nome do usuário deixando o campo vazio
- E clico no botão "Salvar alterações"
- Então a alteração não deve ser salva
- E devo permanecer na página de edição
- E devo visualizar a mensagem "O nome é obrigatório"

#### Cenário 3.2: Tentativa de salvar com e-mail inválido
- Dado que eu sou um usuário autenticado
- E estou na página de edição de dados pessoais
- Quando eu altero o e-mail para um formato inválido
- E clico no botão "Salvar alterações"
- Então a alteração não deve ser salva
- E devo permanecer na página de edição
- E devo visualizar a mensagem "Email inválido"

## Execução dos Testes

#### Preparação do Ambiente
- Os testes de ponta-a-ponta exigem que o ecossistema completo (Frontend, Backend e Banco de Dados) esteja operacional.
- Subir os Containers: Em um terminal exclusivo, inicie os serviços:
docker-compose up.
- Massa de Dados: Como o Cypress interage com o banco de dados real através da interface, você deve garantir a existência de um perfil de teste. Acesse o sistema e cadastre um usuário com os dados abaixo:
E-mail: teste@mail.com
Senha: 12345678

Em seguida para executar os testes digite no terminal:
```
npx cypress open
```
Após o carregamento, selecione "E2E Testing", e escolha o navegador de sua preferência (Chrome/Electron) e clique em "Start E2E Testing".

ou

Digite no terminal:

```
npx cypress run
```
Para executar todos os testes do Cypress em um ambiente sem interface gráfica.
