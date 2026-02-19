# Especificação de Requisitos – Sistema Adote Fácil

## 1. Introdução

Este documento descreve as principais histórias de usuário e os cenários de teste do sistema Adote Fácil, elaborados a partir da análise das funcionalidades implementadas no projeto.

O sistema permite cadastro e autenticação de usuários, disponibilização de animais para adoção, visualização de animais disponíveis e comunicação entre usuários por meio de conversas.

---

## 2. Histórias de Usuário

---

### HU01 – Cadastro de Usuário

Como visitante  
Quero me cadastrar no sistema  
Para poder acessar as funcionalidades da plataforma  

Critérios de Aceitação:

1. O sistema deve permitir cadastro com nome, email e senha.
2. O email não pode estar previamente cadastrado.
3. A senha deve ser armazenada de forma segura.
4. Após cadastro bem-sucedido, o usuário deve ser redirecionado para a tela de login.

Cenário Principal:

Dado que estou na tela de cadastro  
Quando preencho todos os campos corretamente  
E envio o formulário  
Então minha conta deve ser criada com sucesso  
E devo ser redirecionado para a tela de login  

Cenário Alternativo 1:

Dado que já existe um usuário com o email informado  
Quando tento me cadastrar  
Então o sistema deve exibir mensagem informando que o email já está em uso  

Cenário Alternativo 2:

Dado que deixo campos obrigatórios em branco  
Quando envio o formulário  
Então o sistema deve impedir o cadastro e exibir mensagem de erro  

---

### HU02 – Login

Como usuário cadastrado  
Quero realizar login  
Para acessar minha área restrita  

Critérios de Aceitação:

1. O sistema deve validar email e senha.
2. O sistema deve gerar token de autenticação após login válido.
3. Usuários não autenticados não devem acessar páginas restritas.

Cenário Principal:

Dado que informo email e senha corretos  
Quando clico no botão de login  
Então devo acessar a área logada do sistema  

Cenário Alternativo 1:

Dado que informo senha incorreta  
Quando tento realizar login  
Então o sistema deve exibir mensagem de erro  

Cenário Alternativo 2:

Dado que informo email não cadastrado  
Quando tento realizar login  
Então o sistema deve informar que o usuário não existe  

---

### HU03 – Disponibilizar Animal para Adoção

Como usuário autenticado  
Quero cadastrar um animal  
Para disponibilizá-lo para adoção  

Critérios de Aceitação:

1. O usuário deve estar autenticado.
2. O sistema deve permitir informar nome, tipo, gênero e demais dados do animal.
3. O animal deve ficar visível na listagem de animais disponíveis após cadastro para os demais usuários.

Cenário Principal:

Dado que estou logado  
Quando preencho corretamente os dados do animal  
E envio o formulário  
Então o animal deve ser cadastrado com sucesso  
E deve aparecer na listagem de animais disponíveis para os demais usuários 

Cenário Alternativo 1:

Dado que não estou autenticado  
Quando tento acessar a página de cadastro de animal  
Então devo ser redirecionado para a tela de login  

Cenário Alternativo 2:

Dado que deixo campos obrigatórios em branco  
Quando envio o formulário  
Então o sistema deve impedir o cadastro e exibir erro  

---

### HU04 – Visualizar Animais Disponíveis

Como usuário  
Quero visualizar os animais disponíveis  
Para escolher um animal para adoção  

Critérios de Aceitação:

1. A listagem deve exibir todos os animais disponíveis.
2. Cada animal deve apresentar informações básicas.
3. Apenas usuários autenticados podem visualizar a listagem.

Cenário Principal:

Dado que estou autenticado  
Quando acesso a página de animais disponíveis  
Então devo visualizar a lista de animais cadastrados  

Cenário Alternativo 1:

Dado que não estou autenticado  
Quando tento acessar a página de animais disponíveis  
Então devo ser redirecionado para login  

Cenário Alternativo 2:

Dado que não existem animais cadastrados  
Quando acesso a página  
Então o sistema deve exibir mensagem informando que não há animais disponíveis  

---

### HU05 – Iniciar Conversa

Como usuário autenticado  
Quero iniciar uma conversa com o responsável por um animal  
Para negociar o processo de adoção  

Critérios de Aceitação:

1. O usuário deve estar autenticado.
2. O sistema deve criar um chat entre os usuários.
3. As mensagens devem ser registradas no banco de dados.

Cenário Principal:

Dado que estou autenticado  
E visualizo um animal disponível  
Quando clico em iniciar conversa  
Então o sistema deve criar um chat  
E devo conseguir enviar mensagens  

Cenário Alternativo 1:

Dado que não estou autenticado  
Quando tento iniciar conversa  
Então devo ser redirecionado para login  

---

### HU06 – Editar Dados do Usuário

Como usuário autenticado  
Quero editar meus dados pessoais  
Para manter minhas informações atualizadas  

Critérios de Aceitação:

1. O sistema deve permitir alteração de nome e senha.
2. Apenas o próprio usuário pode editar seus dados.

Cenário Principal:

Dado que estou logado  
Quando acesso a página de edição  
E altero meus dados corretamente  
Então as informações devem ser atualizadas com sucesso  

Cenário Alternativo:

Dado que informo dados inválidos  
Quando tento salvar  
Então o sistema deve impedir a atualização  

---

## 3. Requisitos Não Funcionais

RNF01 – O sistema deve utilizar autenticação baseada em token.  

RNF02 – O sistema deve armazenar os dados em banco PostgreSQL.  

RNF03 – O backend deve seguir arquitetura em camadas (Controller, Service e Repository).  

RNF04 – O sistema deve poder ser executado via Docker.  

RNF05 – O sistema deve permitir execução de testes automatizados com Cypress.  

---

## 4. Considerações Finais

As histórias de usuário e cenários descritos neste documento foram elaborados com base na análise da interface e do código-fonte do sistema Adote Fácil, garantindo alinhamento com as funcionalidades implementadas.