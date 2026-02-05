# Documentação de Testes

## Testes Unitários (Backend)

### Execução
```bash
cd backend
npm run test
```

### Cobertura
```bash
COVERAGE=true npm run test
```

### Arquivos de Teste
Os testes cobrem os services em `backend/src/services/`:
- **CreateUserService**: criação de usuário, validação de email duplicado
- **UserLoginService**: autenticação, validação de credenciais
- **CreateAnimalService**: cadastro de animal, upload de imagens
- **UpdateAnimalStatusService**: atualização de status (adotado/removido)

---

## Testes de Aceitação (Frontend - Cypress)

### Instalação
```bash
cd frontend
npm install cypress --save-dev
```

### Pré-requisitos
- Backend rodando em `localhost:8080`
- Frontend rodando em `localhost:3000`

### Execução
```bash
cd frontend
npx cypress open    # Modo interativo (com interface gráfica)
npx cypress run     # Modo headless (linha de comando)
```

---

## Cenários de Teste

### 1. Cadastro de Usuário (`user-registration.cy.ts`)

| Cenário | Entrada | Resultado Esperado |
|---------|---------|-------------------|
| **Principal** | Nome, email válido, senhas iguais | Redirecionamento para /login |
| **Alternativo 1** | Email inválido | Mensagem "Email inválido" |
| **Alternativo 2** | Senhas diferentes | Mensagem "As senhas não coincidem" |

### 2. Login de Usuário (`user-login.cy.ts`)

| Cenário | Entrada | Resultado Esperado |
|---------|---------|-------------------|
| **Principal** | Credenciais válidas | Redirecionamento para área logada |
| **Alternativo 1** | Credenciais inválidas | Alerta de erro |
| **Alternativo 2** | Campos vazios | Mensagens de obrigatoriedade |

### 3. Cadastro de Animal (`animal-registration.cy.ts`)

| Cenário | Entrada | Resultado Esperado |
|---------|---------|-------------------|
| **Principal** | Dados completos + 1 foto | Alerta de sucesso |
| **Alternativo 1** | Sem foto | Mensagem "Adicione ao menos uma foto" |
| **Alternativo 2** | 6+ fotos | Alerta de limite excedido |

---

## Estrutura de Arquivos

```
backend/
  src/services/**/*.spec.ts   # Testes unitários

frontend/
  cypress/
    e2e/                      # Testes de aceitação
      user-registration.cy.ts
      user-login.cy.ts
      animal-registration.cy.ts
    fixtures/                 # Dados de teste
    support/                  # Comandos customizados
  cypress.config.js           # Configuração do Cypress
```

---

## Executando Todos os Testes

```bash
# Backend (unitários)
cd backend && npm test

# Frontend (aceitação)
cd frontend && npx cypress run
```
