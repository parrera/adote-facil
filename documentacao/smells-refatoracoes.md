# Code Smells e Refatorações — PR3

Este arquivo descreve a identificação de code smells no sistema Adote Fácil e as refatorações aplicadas para melhoria da qualidade do código. A análise foi realizada utilizando ESLint e SonarQube (SonarLint).

---

## Caso 1 — Parâmetro e import não utilizados em middleware de erro (Unused Parameter)

### Arquivo

backend/src/app.ts

### Trecho original (antes da refatoração)

```ts
import express, { NextFunction, Response, Request } from 'express'

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(err)
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    })
  },
)
```

### Descrição do smell e refatoração

O middleware de tratamento de erros declarava o parâmetro `next` e importava o tipo `NextFunction`, porém ambos não eram utilizados, caracterizando código morto (dead code) e reduzindo a clareza do arquivo. O problema foi identificado pelo ESLint por meio da regra `@typescript-eslint/no-unused-vars`. A refatoração consistiu na remoção do parâmetro `next` e do tipo `NextFunction` do import do Express, mantendo o comportamento da aplicação inalterado.

### Trecho final (após refatoração)

```ts
import express, { Response, Request } from 'express'

app.use(
  (err: Error, request: Request, response: Response) => {
    console.error(err)
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    })
  },
)
```

---

---

## Caso 2 — Exceção ignorada em validação de token (Ignored Exception)

### Arquivo

frontend/src/middleware.ts

### Trecho original (antes da refatoração)

```ts
catch (e) {
  return false
}
```

### Descrição do smell e refatoração

O SonarQube (SonarLint) identificou que o erro dentro do bloco `catch` estava sendo ignorado, o que dificulta saber quando ocorre algum problema na validação do token. Ignorar exceções pode esconder falhas e atrapalhar a manutenção do sistema. Como refatoração, foi adicionado um `console.error` para registrar o erro, mantendo o comportamento de retornar `false` quando o token não for válido.

### Trecho final (após refatoração)

```ts
catch (error) {
  console.error('Erro ao validar token JWT:', error)
  return false
}
```

---

---

## Caso 3 — Condição negada reduzindo legibilidade (Negated Condition)

### Arquivo

frontend/src/api/update-user.ts

### Trecho original (antes da refatoração)

```ts
data: {
  name: data.name !== '' ? data.name : undefined,
  email: data.email !== '' ? data.email : undefined,
  password: data.password !== '' ? data.password : undefined,
},
```

### Descrição do smell e refatoração

O SonarQube (SonarLint) identificou o uso de condições negadas nas expressões ternárias, o que pode dificultar a leitura do código. Como refatoração, as verificações ` !== '' ` foram substituídas por condições positivas, utilizando a avaliação booleana das strings, mantendo o mesmo comportamento da aplicação e deixando o código mais claro.

### Trecho final (após refatoração)

```ts
data: {
  name: data.name ? data.name : undefined,
  email: data.email ? data.email : undefined,
  password: data.password ? data.password : undefined,
},
```

---