 # Adote Fácil - principais historias 

## 1. Histórias de Usuário

### 1. Cadastro de Usuário
**Como** visitante,  
**quero** criar uma conta no sistema,  
**para** poder cadastrar animais ou adotar.  

---

### 2. Login de Usuário
**Como** usuário registrado,  
**quero** autenticar com meu e-mail e senha,  
**para** acessar minhas informações e interagir com o sistema.  

---

### 3. Cadastro de Animal
**Como** usuário autenticado,  
**quero** cadastrar um animal disponível para adoção,  
**para** que outros usuários possam visualizá-lo.  

---

### 4. Atualizar Status do Animal
**Como** usuário dono do animal,  
**quero** mudar o status de um animal (disponível → adotado),  
**para** indicar que ele já foi adotado.  

---

### 5. Listar Animais Disponíveis
**Como** visitante,  
**quero** visualizar a lista de animais disponíveis,  
**para** encontrar um pet para adoção.  

---

### 6. Iniciar Chat
**Como** usuário interessado em adotar,  
**quero** iniciar uma conversa com o dono de um animal,  
**para** combinar os detalhes da adoção.  

---

### 7. Enviar Mensagem no Chat
**Como** usuário,  
**quero** enviar e receber mensagens em um chat,  
**para** me comunicar com o dono do animal.  

---

## 2. Cenários de Teste

### 1. Cadastro de Usuário
- **Principal:** cadastro com dados corretos → sucesso.  
- **Alternativos:**  
  - Email já cadastrado → erro.  
  - Campos obrigatórios vazios → erro de validação.  

---

### 2. Login de Usuário
- **Principal:** login com email e senha corretos → sucesso.  
- **Alternativos:**  
  - Email não cadastrado → erro.  
  - Senha incorreta → erro.  

---

### 3. Cadastro de Animal
- **Principal:** usuário logado cadastra animal corretamente → sucesso.  
- **Alternativos:**  
  - Usuário não autenticado → erro.  
  - Dados obrigatórios ausentes → erro de validação.  

---

### 4. Atualizar Status do Animal
- **Principal:** dono do animal atualiza status para "Adotado" → sucesso.  
- **Alternativos:**  
  - Usuário tenta mudar status de animal que não é dele → erro.  
  - Animal já adotado → estado não alterado.  

---

### 5. Listar Animais Disponíveis
- **Principal:** sistema retorna todos os animais disponíveis.  
- **Alternativos:**  
  - Nenhum animal disponível → exibe mensagem adequada.  

---

### 6. Iniciar Chat
- **Principal:** usuário interessado inicia chat com dono → sucesso.  
- **Alternativos:**  
  - Usuário tenta iniciar chat consigo mesmo → erro.  
  - Chat já existente → abrir chat existente.  

---

### 7. Enviar Mensagem no Chat
- **Principal:** mensagem enviada com sucesso.  
- **Alternativos:**  
  - Chat inexistente → erro.  
  - Mensagem vazia → erro.  
  - Usuário não autenticado → erro. 