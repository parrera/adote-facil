# Especificação de Requisitos – Adote Fácil

# 1. Introdução

Este documento descreve as principais histórias de usuário do sistema **Adote Fácil**, bem como seus cenários de teste principais e alternativos, com base nas funcionalidades atualmente implementadas.


# 2. Histórias de Usuário


## 2.1 Cadastro de Usuário

**História**

Como usuário, eu quero criar uma conta para utilizar a plataforma de adoção.

**Cenário Principal**

Dado que o usuário está na tela de cadastro, quando ele informar nome, email válido, senha e confirmar o cadastro, o sistema deve criar a conta e permitir o login.  

**Cenários Alternativos**

- Email já cadastrado: sistema exibe mensagem de erro.
- Campos obrigatórios vazios: sistema bloqueia envio.
- Email em formato inválido: sistema exibe alerta.


## 2.2 Login

**História**

Como usuário cadastrado, eu quero fazer login para acessar as funcionalidades.

**Cenário Principal**

Dado que o usuário possui cadastro válido, quando ele informar email e senha corretos e clicar em “Login”, então o sistema deve autenticar o usuário e redirecioná-lo para a área interna.

**Cenários Alternativos**

- Senha incorreta: sistema exibe mensagem.
- Email inexistente: sistema exibe erro.
- Campos vazios: login não permitido.


## 2.3 Visualizar Animais Disponíveis

**História**

Como usuário, eu quero visualizar os animais disponíveis para adoção para escolher um animal de interesse.

**Cenário Principal**

Dado que existem animais cadastrados como disponíveis, quando o usuário acessar a tela “Animais disponíveis”, então o sistema deve exibir a lista de animais.

**Cenários Alternativos**

- Nenhum animal disponível: sistema exibe mensagem informativa.


## 2.4 Cadastrar Animal para Adoção

**História**

Como usuário, eu quero cadastrar um animal para disponibilizá-lo para adoção.

**Cenário Principal**

Quando o usuário clicar em "Disponibilizar animal para adoção", o sistema deve retornar o formulário a ser preenchido. Dado que os campos obrigatórios estão preenchidos e tem pelo menos uma foto anexada, ao clicar em "Cadastrar", o sistema deve registrar o animal.

**Cenários Alternativos**

- Campos obrigatórios não preenchidos: sistema retorna mensagem.


## 2.5 Gerenciar Meus Animais

**História**

Como usuário, eu quero visualizar os animais que eu disponibilizei.

**Cenário Principal**

Dado que o usuário possui animais cadastrados, quando ele acessa “Meus animais disponíveis”, o sistema deve exibir seus animais cadastrados.

**Cenários Alternativos**

- Nenhum animal cadastrado: mensagem informativa.


## 2.6 Confirmar Adoção

**História**

Como usuário anunciante, eu quero confirmar a adoção para remover o animal da lista de disponíveis.

**Cenário Principal**

Quando o usuário clicar em “Confirmar adoção”, então o sistema deve alterar o status do animal e removê-lo da lista de disponíveis.

**Cenários Alternativos**

- Erro na atualização: sistema exibe mensagem erro.


## 2.7 Excluir animais disponíveis

**História**

Como usuário anunciante, eu quero excluir um animal da lista de disponíveis.

**Cenário principal**

Quando o usuário clicar no ícone "Excluir", o sistema deve remover o animal da lista de disponíveis.

**Cenários Alternativos**

- Erro ao excluir: sistema exibe mensagem de erro.


## 2.8 Conversas

**História**

Como usuário, eu quero conversar com outro usuário sobre um animal.

**Cenário Principal**

Dado que o usuário possui uma conversa, quando ele acessa “Minhas conversas”, então o sistema deve exibir os chats disponíveis.

**Cenários Alternativos**

- Nenhuma conversa existente: mensagem informativa


## 2.9 Editar Dados Pessoais

**História**

Como usuário, eu quero editar meus dados pessoais.

**Cenário Principal**

Dado que o usuário está autenticado, quando ele alterar seus dados e clicar em “Salvar alterações”, o sistema deve atualizar suas informações.

**Cenários Alternativos**

- Email já utilizado por outro usuário: sistema exibe erro.
- Dados inválidos: sistema bloqueia a atualização.


## 2.9 Logout

**História**

Como usuário autenticado, eu quero sair do sistema para encerrar minha sessão.

**Cenário Principal**

Quando o usuário clica em “Sair”, então o sistema deve encerrar a sessão e redirecionar para a tela de login.

**Cenários alternativos**

- Falha ao encerrar sessão: sistema exibe mensagem de erro.
