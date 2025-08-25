# Documentação de Testes de Aceitação

## 1. Cadastro de Usuário

### Cenário Principal: Cadastro bem-sucedido

- **Objetivo:** Verificar se um novo usuário consegue se cadastrar na plataforma com sucesso.
- **Passos:**
  1. Acessar a página de cadastro.
  2. Preencher o nome, um e-mail único e uma senha válida.
  3. Confirmar a senha.
  4. Clicar no botão "Cadastrar".
- **Resultado Esperado:** O usuário é redirecionado para a página de login e uma mensagem de sucesso é exibida.

### Cenário Alternativo 1: Tentativa de cadastro com e-mail já existente

- **Objetivo:** Garantir que o sistema impeça o cadastro de múltiplos usuários com o mesmo e-mail.
- **Passos:**
  1. Acessar a página de cadastro.
  2. Preencher o nome e um e-mail que já está em uso no sistema.
  3. Preencher a senha e a confirmação de senha.
  4. Clicar no botão "Cadastrar".
- **Resultado Esperado:** O sistema exibe uma mensagem de erro informando que o e-mail já está cadastrado.

### Cenário Alternativo 2: Tentativa de cadastro com senhas que não coincidem

- **Objetivo:** Verificar se o sistema valida que a senha e a confirmação de senha são idênticas.
- **Passos:**
  1. Acessar a página de cadastro.
  2. Preencher o nome e o e-mail.
  3. Preencher o campo de senha com um valor.
  4. Preencher o campo de confirmação de senha com um valor diferente.
  5. Clicar no botão "Cadastrar".
- **Resultado Esperado:** O sistema exibe uma mensagem de erro informando que as senhas não coincidem.

## 2. Login de Usuário

### Cenário Principal: Login bem-sucedido

- **Objetivo:** Verificar se um usuário já cadastrado consegue acessar a plataforma.
- **Passos:**
  1. Acessar a página de login.
  2. Preencher o e-mail de um usuário cadastrado.
  3. Preencher a senha correta para esse usuário.
  4. Clicar no botão "Entrar".
- **Resultado Esperado:** O usuário é redirecionado para a sua área logada.

### Cenário Alternativo: Tentativa de login com senha incorreta

- **Objetivo:** Garantir que o sistema impeça o acesso de um usuário com credenciais inválidas.
- **Passos:**
  1. Acessar a página de login.
  2. Preencher o e-mail de um usuário cadastrado.
  3. Preencher o campo de senha com uma senha incorreta.
  4. Clicar no botão "Entrar".
- **Resultado Esperado:** O sistema exibe uma mensagem de erro informando que as credenciais são inválidas.

# Instruções Básicas

- ### Para rodar os testes foi usado o E2E do cypress no projeto e executado na interface gráfica do cypress
- ### Separação de dois Specs login e cadastro
- ### Ao todo, foram feitos 5 testes, todos passaram, mas foram identificados um erro de tratamento de caractere especial: Nomes com espaço e acentuação dão este erro:

![alt text](image-1.png)
