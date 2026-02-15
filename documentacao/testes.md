# Análise dos testes unitários do projeto "Adote Fácil"

Os testes unitários analisados estão concentrados na camada de _service_, garantindo a validação da lógica de negócio no backend. Além disso, possui uma estrutura consistente e bem organizada, utilizando *Jest* com mocks profundos, o que mostra uma boa preocupação com o isolamento de dependências. 

Entretanto, vale ressaltar uma limitação no quesito da cobertura de cenários. Os testes focam majoritariamente nos caminhos principais, apresentando pouca ou nenhuma verificação de tratamento de erros, casos negativos ou validações inválidas. Isso reduz a robustez da suíte de testes e pode deixar comportamentos inesperados sem cobertura adequada.

Ademais, há uma dependência direta do banco de dados por meio do *Prisma*, fazendo com que os testes fiquem mais lentos e mais frágeis, aumentando o acoplamento e podendo gerar instabilidade caso o estado do banco não seja devidamente controlado. Soma-se a isso a ausência de factories para geração de dados e a falta de isolamento explícito do estado do banco entre execuções, fatores que comprometem a previsibilidade e a confiabilidade dos testes.

## Melhorias recomendadas
- Ampliar coberturas de cenários, incluindo testes de caminhos alternativos e casos negativos.
- Garantir que cada regra de negócio tenha pelo menos um teste de sucesso e um de falha
- Melhorar o isolamento e arquitetura de testes, deixando a camada de serviço não depender do banco Prisma, testando os services apenas com mocks.
- Criar e usar factories em todos os testes para padronizar e tornar mais legível o arranjo de dados.

## Testes de aceitação - linguagens naturais estruturadas

### 1 - Cenário: Cadastrar animais com dados válidos
**Dado que** o usuário está autenticado como doador \
**E** está na página 'Disponibilizar animal para adoção' \
**Quando** ele preencher o nome do animal \
**E** selecionar o tipo \
**E** selecionar o genêro \
**E** informar a raça \
**E** informar a descrição \
**E** adicionar uma foto do animal \
**E** clicar no botão de cadastrar \
**Então** o sistema deve cadastrar o animal com sucesso \
**E** o animal deve aparecer na lista de animais disponíveis para os outros usuários

### 1.1 - Cenário: Cadastrar um animal sem nome
**Dado que** o usuário está autenticado como doador \
**E** está na página 'Disponibilizar animal para adoção' \
**Quando** ele selecionar o tipo \
**E** selecionar o genêro \
**E** informar a raça \
**E** informar a descrição \
**E** adicionar uma foto do animal \
**E** clicar no botão de cadastrar \
**Então** o sistema não deve cadastrar o animal \
**E** informar que o campo 'nome' é obrigatório

### 1.2 - Cenário: Cadastrar um animal sem foto de perfil
**Dado que** o usuário está autenticado como doador \
**E** está na página 'Disponibilizar animal para adoção' \
**Quando** ele preencher o nome do animal \
**E** selecionar o tipo \
**E** selecionar o genêro \
**E** informar a raça \
**E** informar a descrição \
**E** clicar no botão de cadastrar \
**Então** o sistema não deve cadastrar o animal \
**E** informar que o campo 'Fotos' é obrigatório

---

### 2 - Cenário: Editar o email de um usuário com dados válidos
**Dado que** o usuário está autenticado \
**E** está na página 'Editar dados pessoais' \
**Quando** ele preencher o campo 'Email' com um email válido (algumacoisa + @ + outracoisa + .com)
**E** clicar no botão de salvar alterações
**Então** o sistema deve atualizar o perfil do usuário com seu novo email

### 2.1 - Cenário: Editar o email de um usuário e deixar o campo vazio
**Dado que** o usuário está autenticado \
**E** está na página 'Editar dados pessoais' \
**Quando** ele não preencher o campo 'Email', deixando o vazio \
**E** clicar no botão de salvar alterações \
**Então** o sistema não deve atualizar o perfil do usuário \
**E** informar que o campo 'Email' é obrigatório

### 2.2 - Cenário: Editar o email de um usuário com um email inválido
**Dado que** o usuário está autenticado \
**E** está na página 'Editar dados pessoais' \
**Quando** ele preencher o campo 'Email' com um email inválido, ou seja, não possuir a estrutura válida (algumacoisa + @ + outracoisa + .com) \
**E** clicar no botão de salvar alterações \
**Então** o sistema não deve atualizar o perfil do usuário \
**E** informar que o campo 'Email' está com um email inválido

---

### 3 - Cenário: Filtrar animais para pesquisa
**Dado que** o usuário está autenticado como adotante\
**E** está na página 'Animais disponíveis para a adoção' \
**Quando** ele clicar no botão de filtro \
**E** preencher os dados referentes ao animal procurado \
**Então** o sistema deve retornar o(s) animal(is) referentes ao filtro selecionado

### 3.1 - Cenário: Filtrar animais pelo nome errado
**Dado que** o usuário está autenticado como adotante \
**E** está na página 'Animais disponíveis para a adoção' \
**Quando** ele clicar no botão de filtro \
**E** preencher o campo "Nome" com um nome que não tem no banco de dados do sistema ou que já tenha sido adotado \
**Então** o sistema deve informar que no momento não há animal disponível para adoção com essas características

### 3.2 - Cenário: Filtrar animais pelo tipo errado
**Dado que** o usuário está autenticado como adotante \
**E** está na página 'Animais disponíveis para a adoção' \
**Quando** ele clicar no botão de filtro \
**E** selecionar no campo "Tipo", um tipo que não tem no banco de dados do sistema ou que já tenha sido adotado  
**Então** o sistema deve informar que no momento não há animal disponível para adoção com essas características

## Instruções para executar os testes no Cypress

### Instalar a ferramenta Cypress 
1. Primeiramente, no terminal, entre no projeto "Adote Fácil" no diretório raíz.
2. Execute o comando abaixo para instalar o framework como uma dependência de desenvolvimento.


    `npm install cypress --save-dev`

3. Ao concluir a instalação, **abra o Cypress**, use o comando abaixo para abrir a interface gráfica.

    `npx cypress open`

    Isso criará a estrutura de pastas necessária (cypress/, cypress.config.js) no seu diretório. 

### Executar os testes
Ao inicializar o Cypress, é necessário escolher o tipo de teste referente ao **E2E Testing** e escolher qual browser você quer utilizar a interface gráfica. 

Os testes criados estão dentro da pasta **_cypress/e2e_** e poderão ser visualizados na interface gráfica para a escolha e execução.

- **AVISO** 

    É necessário que ao executar o programa 'Adote Fácil', as contas abaixo tenham sido cadastradas no seu sistema.
    - email: doador@doador.com | senha: doadoraf
    - email: adotante@adotante.com | senha: adotanteaf 
    
    Visto que, os testes utilizam essas contas para autenticar os usuários e realizar os testes. Caso queira utilizar outras contas basta alterar os emails e senhas nos testes respectivos. 
