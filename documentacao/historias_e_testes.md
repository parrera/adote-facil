# Histórias de Usuário e Cenários de Teste

Este documento descreve as principais histórias de usuário do sistema Adote Fácil que conseguimos identificar durante nosso uso, bem como os cenários de teste para cada uma delas!

Além disso, formatamos o documento com títulos, subtítulos e destaques em negrito para melhor visualização do md.



## Gestão de Usuários

### História de Usuário: Cadastro

**Como um novo usuário, eu quero criar uma conta para que eu possa acessar a plataforma e interagir com outros usuários.**

#### Cenários de Teste

* **Cenário Principal: Cadastro com sucesso**
    1.  Dado que o usuário está na página de cadastro.
    2.  Quando ele preenche todos os campos obrigatórios com dados válidos.
    3.  E clica no botão "Cadastrar".
    4.  Então a conta do usuário é criada com sucesso.
    5.  E o usuário é redirecionado para a página de login.

* **Cenário Alternativo: Tentativa de cadastro com e-mail já existente**
    1.  Dado que o usuário está na página de cadastro.
    2.  Quando ele preenche o campo de e-mail com um endereço que já está em uso.
    3.  E clica no botão "Cadastrar".
    4.  Então o sistema exibe uma mensagem de erro informando que o e-mail já está cadastrado.

* **Cenário Alternativo: Tentativa de cadastro com senhas que não conferem**
    1.  Dado que o usuário está na página de cadastro.
    2.  Quando ele preenche os campos de senha e confirmação de senha com valores diferentes.
    3.  E clica no botão "Cadastrar".
    4.  Então o sistema exibe uma mensagem de erro informando que as senhas não conferem.

### História de Usuário: Login

**Como um usuário cadastrado, eu quero fazer login na minha conta para ter acesso ao meu perfil, meus animais e minhas conversas.**

#### Cenários de Teste

* **Cenário Principal: Login com sucesso**
    1.  Dado que o usuário está na página de login.
    2.  Quando ele preenche os campos de e-mail e senha com credenciais válidas.
    3.  E clica no botão "Entrar".
    4.  Então o usuário é autenticado com sucesso.
    5.  E é redirecionado para a página de animais disponíveis.

* **Cenário Alternativo: Tentativa de login com credenciais inválidas**
    1.  Dado que o usuário está na página de login.
    2.  Quando ele preenche os campos de e-mail e/ou senha com informações incorretas.
    3.  E clica no botão "Entrar".
    4.  Então o sistema exibe uma mensagem de erro informando que as credenciais são inválidas.

### História de Usuário: Atualizar Perfil
**Como um usuário cadastrado, eu quero atualizar as informações do meu perfil para que outros usuários tenham informações atualizadas sobre mim.**

#### Cenários de Teste
* **Cenário Principal: Atualização de dados com sucesso**
    1.  Dado que o usuário está logado e na página "Editar Dados".
    2.  Quando ele altera uma ou mais informações (como nome ou senha).
    3.  E clica no botão "Salvar".
    4.  Então as informações são atualizadas com sucesso no sistema.

### História de Usuário: Logout
**Como um usuário logado, eu quero fazer logout da minha conta para garantir a minha privacidade.**

#### Cenários de Teste
* **Cenário Principal: Logout com sucesso**
    1.  Dado que o usuário está logado na plataforma.
    2.  Quando ele clica no botão "Sair" no menu de usuário.
    3.  Então a sessão do usuário é encerrada.
    4.  E ele é redirecionado para a página de login.

---

## Gestão de Animais

### História de Usuário: Cadastro de Animal

**Como um usuário que deseja colocar um animal para adoção, eu quero cadastrar o animal com seus detalhes (nome, tipo, sexo, raça, descrição e fotos) para que possíveis adotantes possam encontrá-lo.**

#### Cenários de Teste

* **Cenário Principal: Cadastro de animal com sucesso**
    1.  Dado que o usuário está logado em sua conta.
    2.  E está na página de "Disponibilizar Animal".
    3.  Quando ele preenche todos os campos do formulário com informações válidas sobre o animal.
    4.  E adiciona pelo menos uma foto.
    5.  E clica no botão "Cadastrar".
    6.  Então o animal é cadastrado com sucesso.
    7.  E o usuário é redirecionado para a página "Meus Animais".

* **Cenário Alternativo: Tentativa de cadastro de animal sem foto**
    1.  Dado que o usuário está logado em sua conta.
    2.  E está na página de "Disponibilizar Animal".
    3.  Quando ele preenche todos os campos de texto do formulário.
    4.  Mas não adiciona nenhuma foto do animal.
    5.  E clica no botão "Cadastrar".
    6.  Então o sistema exibe uma mensagem de erro solicitando o envio de pelo menos uma foto.

### História de Usuário: Visualizar Animais Disponíveis

**Como um usuário que procura um animal para adotar, eu quero ver uma lista de todos os animais disponíveis para que eu possa encontrar um companheiro adequado.**

#### Cenários de Teste

* **Cenário Principal: Visualização da lista de animais**
    1.  Dado que o usuário está logado no sistema.
    2.  Quando ele acessa a página "Animais Disponíveis".
    3.  Então uma lista de animais para adoção é exibida.

* **Cenário Alternativo: Nenhum animal disponível para adoção**
    1.  Dado que o usuário está logado no sistema.
    2.  E não há animais cadastrados para adoção.
    3.  Quando ele acessa a página "Animais Disponíveis".
    4.  Então uma mensagem é exibida informando que não há animais disponíveis no momento.

### História de Usuário: Filtrar Animais

**Como um usuário que procura um animal para adotar, eu quero filtrar a lista de animais disponíveis por tipo, sexo e nome para que eu possa refinar minha busca.**

#### Cenários de Teste

* **Cenário Principal: Filtrar animais com sucesso**
    1.  Dado que o usuário está na página "Animais Disponíveis".
    2.  Quando ele seleciona um tipo de animal no filtro (ex: "Cachorro").
    3.  E clica em "Filtrar".
    4.  Então a lista é atualizada para mostrar apenas os animais que correspondem ao critério do filtro.

### História de Usuário: Ver Detalhes do Animal
**Como um usuário interessado em um animal, eu quero ver o perfil detalhado do animal, incluindo fotos e descrição, para que eu possa saber mais sobre ele.**

#### Cenários de Teste
* **Cenário Principal: Visualizar detalhes com sucesso**
    1.  Dado que o usuário está na página "Animais Disponíveis".
    2.  Quando ele clica em um card de animal.
    3.  Então ele é redirecionado para uma página com todas as informações e fotos daquele animal.

### História de Usuário: Gerenciar Meus Animais
**Como um usuário que colocou animais para adoção, eu quero ver uma lista dos meus animais cadastrados para gerenciá-los.**

#### Cenários de Teste
* **Cenário Principal: Acessar a lista de meus animais**
    1.  Dado que o usuário está logado no sistema.
    2.  Quando ele acessa a página "Meus Animais".
    3.  Então uma lista contendo apenas os animais que ele cadastrou é exibida.

### História de Usuário: Confirmar Adoção e Remover Anúncio
**Como um usuário que colocou um animal para adoção, eu quero confirmar quando o animal foi adotado ou remover o anúncio por outros motivos.**

#### Cenários de Teste
* **Cenário Principal: Confirmar adoção**
    1.  Dado que o usuário está na página "Meus Animais".
    2.  Quando ele clica no botão "Confirmar adoção" em um animal da lista.
    3.  Então o status do animal é atualizado para "Adotado" e ele não aparece mais na busca pública.
* **Cenário Principal: Remover anúncio**
    1.  Dado que o usuário está na página "Meus Animais".
    2.  Quando ele clica no botão "Remover" em um animal da lista.
    3.  Então o status do animal é atualizado para "Removido" e ele não aparece mais na busca pública.

---

## Chat

### História de Usuário: Iniciar Conversa

**Como um usuário interessado em adotar um animal, eu quero iniciar um chat com o dono do animal para fazer perguntas e expressar meu interesse.**

#### Cenários de Teste

* **Cenário Principal: Iniciar um chat com sucesso**
    1.  Dado que o usuário está logado e visualizando os detalhes de um animal.
    2.  Quando ele clica no botão para iniciar uma conversa.
    3.  Então ele é redirecionado para a página de chat.
    4.  E uma nova conversa com o dono do animal é iniciada.

### História de Usuário: Enviar Mensagem

**Como um usuário em um chat, eu quero enviar e receber mensagens em tempo real para me comunicar de forma eficaz com o outro usuário.**

#### Cenários de Teste

* **Cenário Principal: Enviar uma mensagem com sucesso**
    1.  Dado que o usuário está em uma conversa ativa no chat.
    2.  Quando ele digita uma mensagem no campo de texto.
    3.  E clica no botão de enviar.
    4.  Então a mensagem é enviada e exibida na janela do chat.

### História de Usuário: Visualizar Lista de Conversas
**Como um usuário, eu quero ver uma lista de todos os meus chats em andamento para que eu possa acessar facilmente minhas conversas.**

#### Cenários de Teste
* **Cenário Principal: Acessar conversas**
    1.  Dado que o usuário está logado.
    2.  Quando ele acessa a página "Minhas Conversas".
    3.  Então uma lista com todas as suas conversas é exibida no painel lateral.

### História de Usuário: Abrir uma Conversa Específica
**Como um usuário, eu quero abrir um chat específico da minha lista de chats para ver o histórico de mensagens e continuar a conversa.**

#### Cenários de Teste
* **Cenário Principal: Abrir um chat**
    1.  Dado que o usuário está na página "Minhas Conversas".
    2.  Quando ele clica em uma conversa na lista lateral.
    3.  Então o histórico de mensagens daquela conversa é carregado na janela principal do chat.
