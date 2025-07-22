# Especificação de Requisitos – Adote-Facil

## 🎯 Visão Geral

O sistema **Adote-Facil** tem como objetivo facilitar o processo de adoção de animais, conectando tutores e adotantes por meio de funcionalidades como cadastro de animais, listagem com filtros, sistema de chat e gerenciamento de usuários.

---

## 🧑‍💻 Histórias de Usuário

### 1. Cadastro de Usuário
**Como** um novo usuário  
**Quero** me cadastrar no sistema  
**Para** poder adotar ou disponibilizar animais para adoção  

**Critérios de Aceitação:**
- Deve coletar nome, email, telefone e senha
- Deve validar email único
- Deve criptografar a senha
- Deve enviar confirmação de cadastro

---

### 2. Login do Usuário
**Como** um usuário registrado  
**Quero** entrar no sistema  
**Para** acessar minhas informações e conversar no chat

**Critérios de Aceitação:**
- Deve aceitar apenas credenciais válidas
- Deve gerar token JWT e armazená-lo
- Deve redirecionar para área logada
- Deve exibir erros em caso de falha

---

### 3. Listagem de Animais Disponíveis
**Como** um usuário logado  
**Quero** ver a lista de animais disponíveis para adoção  
**Para** escolher um para adotar  

**Critérios de Aceitação:**
- Deve mostrar foto, nome, tipo e status
- Deve permitir filtros por tipo de animal
- Deve permitir ordenação por data
- Deve mostrar detalhes ao clicar em um animal

---

### 4. Cadastro de Animal
**Como** um tutor  
**Quero** registrar um animal para adoção  
**Para** encontrar um novo lar para ele  

**Critérios de Aceitação:**
- Deve coletar nome, tipo, gênero, descrição e fotos
- Deve validar pelo menos uma foto
- Deve definir status inicial como "Disponível"
- Deve associar ao usuário cadastrador

---

### 5. Iniciar Chat de Adoção
**Como** um usuário interessado  
**Quero** iniciar uma conversa sobre um animal  
**Para** obter mais informações e combinar adoção  

**Critérios de Aceitação:**
- Deve criar um novo chat vinculado ao animal
- Deve notificar o dono do animal
- Deve manter histórico de mensagens
- Deve permitir envio de novas mensagens

---

### 6. Atualização de Dados do Usuário
**Como** um usuário  
**Quero** editar meu nome ou email  
**Para** manter meus dados atualizados

**Critérios de Aceitação:**
- Deve validar dados antes de salvar
- Deve persistir as alterações
- Deve exibir feedback de sucesso ou erro

---

## 🧪 Cenários de Teste

### CT-01: Cadastro de Usuário Bem-sucedido
1. Acessar página de cadastro
2. Preencher formulário com dados válidos
3. Submeter formulário
4. Verificar redirecionamento para login
5. Verificar email de confirmação

---

### CT-02: Tentativa de Cadastro com Email Existente
1. Acessar página de cadastro
2. Preencher formulário com email já cadastrado
3. Submeter formulário
4. Verificar mensagem de erro
5. Verificar que não criou novo usuário

---

### CT-03: Listagem de Animais com Filtros
1. Fazer login
2. Acessar página de animais disponíveis
3. Aplicar filtro por tipo "Cachorro"
4. Verificar apenas cachorros na lista
5. Ordenar por "Mais recentes"
6. Verificar ordenação correta

---

### CT-04: Fluxo Completo de Adoção
1. Usuário A faz login
2. Cadastra um animal para adoção
3. Usuário B faz login
4. Visualiza animal cadastrado
5. Inicia chat sobre o animal
6. Usuário A responde no chat
7. Combinam adoção
8. Usuário A marca animal como adotado
9. Verificar atualização de status

---

## 🗂️ Local de Armazenamento

[Este arquivo deve ser salvo como:](https://github.com/parrera/adote-facil/pull/10)

```bash
documentacao/especificacao.md
```