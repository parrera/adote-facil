# 📋 Documentação de Testes de Aceitação

Este documento descreve, em linguagem natural estruturada, os cenários de aceitação automatizados implementados com **Cypress** no sistema de Adoção de Pets.

Arquivo de testes principal:

## 1. Cadastro de Usuário

### Cenário Principal

- O usuário acessa a página de cadastro.
- Preenche todos os campos corretamente: **nome, email, senha e confirmação de senha**.
- Clica no botão **Cadastrar**.
- O sistema faz uma requisição `POST /users` (simulada via intercept).
- O backend retorna sucesso (201 Created).
- O sistema exibe um alerta com a mensagem de sucesso.
- O usuário é redirecionado para a página de login (`/login`).

### Cenário Alternativo

- O usuário acessa a página de cadastro.
- Preenche os campos, mas digita senhas diferentes em **Senha** e **Confirmar Senha**.
- Ao clicar em **Cadastrar**, o sistema **não envia requisição**.
- A mensagem **“As senhas não coincidem”** é exibida na tela.

---

## 2. Login

### Cenário Principal

- O usuário acessa a página de login (`/login`).
- Preenche email e senha válidos.
- O sistema envia requisição `POST /login` (stubada).
- O backend responde com token e dados do usuário.
- O sistema armazena o usuário no **localStorage**.
- O usuário é redirecionado para a área logada (`/area_logada/animais_disponiveis`).

### Cenário Alternativo

- O usuário acessa a página de login.
- Digita email e senha inválidos.
- O sistema envia requisição `POST /login` (stubada para retornar erro 401).
- O backend responde com **credenciais inválidas**.
- O sistema exibe um **alerta de erro**.
- O usuário permanece na página de login (`/login`).

---

## 3. Lista de Animais Disponíveis

### Cenário Principal

- O usuário já está autenticado (token fake configurado).
- Acessa a página de animais disponíveis (`/area_logada/animais_disponiveis`).
- O sistema faz requisição `GET /animals/available`.
- O backend retorna uma lista de animais (stubada).
- Os animais são exibidos na tela, com seus dados e botões de ação (ex.: **Saiba mais**).

### Cenário Alternativo A — Nenhum animal disponível

- O usuário acessa a página de animais disponíveis.
- O sistema faz requisição `GET /animals/available`.
- O backend retorna lista vazia.
- O sistema exibe a mensagem:  
  **“Desculpe, no momento não temos nenhum animal disponível para adoção.”**

### Cenário Alternativo B — Filtro aplicado sem resultados

- O usuário acessa a página de animais disponíveis.
- O sistema inicialmente exibe animais da API.
- O usuário abre o formulário de filtro.
- Seleciona um tipo (ex.: “Cachorro”) e aplica o filtro.
- O backend retorna lista vazia para o filtro aplicado.
- O sistema exibe a mesma mensagem:  
  **“Desculpe, no momento não temos nenhum animal disponível para adoção.”**

---

## ⚙️ Instruções Básicas de Execução

### 1. Acesse a pasta do frontend

```bash
cd frontend
```

### 2. Instale as dependências (caso ainda não tenha feito)

```bash
npm install
```

### 3. Abra a interface do Cypress:

```bash
npm run e2e:open
```
