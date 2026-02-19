# Especificação de Requisitos – Adote Fácil

# 1. Introdução

Este documento descreve as principais histórias de usuário do sistema **Adote Fácil**, bem como seus cenários de teste principais e alternativos, com base nas funcionalidades atualmente implementadas.


## 2. Histórias de Usuário


## 2.1 Cadastro de Usuário

### História

Como uma pessoa interessada na plataforma  
Eu gostaria de cadastrar no sistema  
Para acessar suas funcionalidades  

### Cenário Principal – Cadastro com dados válidos

Dado que uma pessoa deseja se cadastrar  
Quando ela preencher corretamente nome, email e senha e clicar em “Cadastrar”  
Então o sistema deve salvar os dados no banco  
E redirecionar para a tela de login  

### Cenários Alternativos

- Email inválido: sistema informa erro de formato e impede envio  
- Senhas diferentes: sistema informa que as senhas divergem  
- Email já cadastrado: sistema exibe mensagem “Email já cadastrado no sistema”  


## 2.2 Login

### História

Como um usuário cadastrado  
Eu gostaria de fazer login  
Para acessar a área autenticada  

### Cenário Principal – Login válido

Dado que o usuário possui cadastro válido  
Quando ele inserir email e senha corretos e clicar em “Login”  
Então o sistema deve redirecioná-lo para a tela principal  

### Cenários Alternativos

- Email inválido: impedir envio  
- Email não cadastrado: mensagem “Email ou senha inválidos.”  
- Senha incorreta: mensagem “Email ou senha inválidos.”  


## 2.3 Atualização de Dados do Usuário

### História

Como um usuário autenticado  
Eu gostaria de atualizar meus dados  
Para manter minhas informações atualizadas  

### Cenário Principal

Dado que o usuário está autenticado  
Quando ele alterar nome, email ou senha e clicar em “Salvar alterações”  
Então o sistema deve salvar os dados atualizados  
E exibir confirmação visual de sucesso  

### Cenários Alternativos

- Email inválido: impedir atualização  
- Senhas divergentes: exibir aviso   
- Email já existente: exibir mensagem de erro  


## 2.4 Disponibilizar Animal para Adoção

### História

Como um usuário autenticado  
Eu gostaria de disponibilizar um animal com informações e fotos  
Para que outra pessoa possa adotá-lo  

### Cenário Principal

Dado que o usuário acessou a página de cadastro de animal  
Quando ele preencher corretamente nome, tipo, gênero, raça, descrição e adicionar fotos e clicar em “Cadastrar”  
Então o sistema deve salvar os dados no banco e redirecionar para a tela de “Meus animais cadastrados”  

### Cenários Alternativos

- Campos obrigatórios não preenchidos: impedir cadastro  
- Nenhuma foto anexada: bloquear envio  
- Erro interno: exibir mensagem de falha  


## 2.5 Listagem de Animais Disponíveis

### História

Como um usuário da plataforma  
Eu gostaria de visualizar e filtrar animais disponíveis  
Para encontrar o animal ideal  

### Cenário Principal

Dado que existem animais disponíveis  
Quando o usuário acessar “Animais disponíveis para adoção”  
Então o sistema deve exibir os animais com filtros por nome, tipo, gênero e raça  

### Cenário Alternativo – Aplicação de Filtros

Dado que o usuário deseja aplicar filtros  
Quando ele selecionar critérios de exibição  
Então o sistema deve atualizar a listagem conforme os filtros selecionados  


## 2.6 Confirmação de Adoção

### História

Como um usuário que possui um animal disponível  
Eu gostaria de confirmar a adoção  
Para impedir que ele continue sendo exibido como disponível  

### Cenário Principal

Dado que o usuário realizou a adoção  
Quando ele clicar em “Confirmar adoção”  
Então o sistema deve atualizar o status do animal no banco e removê-lo da listagem pública  


## 2.7 Chat entre Adotante e Doador

### História

Como um usuário interessado em um animal  
Eu gostaria de entrar em contato com o dono  
Para combinar os termos da adoção  

### Cenário Principal

Dado que o usuário encontrou um animal  
Quando ele clicar em “Entrar em contato com o dono”  
Então o sistema deve abrir a página de chat entre adotante e dono  

### Cenários Alternativos

- Usuário não autenticado: redirecionar para login  
- Mensagem vazia: impedir envio  


## 2.8 Logout

### História

Como um usuário autenticado  
Eu gostaria de sair do sistema  
Para encerrar minha sessão com segurança  

### Cenário Principal

Dado que o usuário está autenticado  
Quando ele clicar em “Sair”  
Então o sistema deve encerrar a sessão e redirecionar para a tela de login  

