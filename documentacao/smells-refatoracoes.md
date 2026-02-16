# Detecção de Code Smells e Refatorações (Adote-Fácil)

Neste documento, apresentamos 3 casos de *Code Smells* identificados no projeto através de análise estática e revisão de código, juntamente com as suas respetivas refatorações aplicadas para melhorar a qualidade, manutenibilidade e segurança do software.


<details>
<summary><strong>Caso 1: Tratamento Redundante de Exceções</strong></summary>

<br>

**Onde:** Backend - `src/controllers/user/create-user.ts`

### 🔍 Smell:

O controlador possui um bloco `try/catch` manual que captura o erro e devolve o status `500`.
Isto é um *Code Smell* chamado Tratamento Redundante, pois o projeto já possui a biblioteca `express-async-errors` configurada no `app.ts` com um *middleware* global de erros.

O `try/catch` torna o código verboso e ignora o tratamento centralizado da aplicação.

---

### 💻 Código original

```typescript
async handle(request: Request, response: Response): Promise<Response> {
  const { name, email, password } = request.body

  try {
    const result = await this.createUser.execute({ name, email, password })
    const statusCode = result.isFailure() ? 400 : 201
    return response.status(statusCode).json(result.value)
  } catch (err) {
    const error = err as Error
    console.log({ error })
    return response.status(500).json({ error: error.message })
  }
}
```

---

### ✅ Refatoração aplicada

Remoção completa do bloco `try/catch`.

```typescript
async handle(request: Request, response: Response): Promise<Response> {
  const { name, email, password } = request.body

  const result = await this.createUser.execute({ name, email, password })

  const statusCode = result.isFailure() ? 400 : 201

  return response.status(statusCode).json(result.value)
}
```

</details>

---

<details>
<summary><strong>Caso 2: Acoplamento Forte</strong></summary>

<br>

**Onde:** Backend - `src/services/user/create-user.ts`

### 🔍 Smell:

A classe `CreateUserService` depende diretamente da implementação concreta `UserRepository`.
Isso caracteriza um *Code Smell* chamado Acoplamento Forte, além de violar o Princípio da Inversão de Dependência (DIP).

Caso a implementação do repositório seja alterada no futuro (ex: troca de ORM), a regra de negócio também precisará ser modificada, reduzindo a flexibilidade e manutenibilidade do código.

---

### 💻 Código original

```typescript
import { UserRepository } from '../../repositories/user.js'

export class CreateUserService {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly userRepository: UserRepository,
  ) {}
}
```

---

### ✅ Refatoração aplicada

Substituição da dependência concreta por uma abstração (interface).

```typescript
export interface IUserRepository {
  findByEmail(email: string): Promise<any>
  create(data: any): Promise<any>
}

export class CreateUserService {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly userRepository: IUserRepository,
  ) {}
}
```

</details>

---

<details>
<summary><strong>Caso 3: Ocultação de Erro</strong></summary>

<br>

**Onde:** Frontend - `src/api/index.ts`

### 🔍 Smell:

A função `makeRequest` captura erros e retorna um objeto `{ status, data }`, fazendo com que a Promise seja resolvida mesmo em caso de falha.

Isso caracteriza um *Code Smell* chamado Ocultação de Erro, pois o erro deixa de ser propagado corretamente e obriga os componentes a verificarem manualmente o status da resposta, em vez de utilizarem `try/catch`.

---

### 💻 Código original

```typescript
try {
  const response = await api.request({ url, method, params, headers, data })
  return response
} catch (err) {
  const error = err as AxiosError

  if (error.response) {
    return { status: error.response.status, data: error.response.data }
  }
  return { status: 500, data: { message: error.message } }
}
```

---

### ✅ Refatoração aplicada

Passamos a rejeitar explicitamente a Promise para que o erro seja tratado corretamente na camada superior.

```typescript
try {
  const response = await api.request({ url, method, params, headers, data })
  return response
} catch (err) {
  const error = err as AxiosError

  if (error.response) {
    return Promise.reject({
      status: error.response.status,
      data: error.response.data
    })
  }

  return Promise.reject({
    status: 500,
    data: { message: error.message }
  })
}
```

</details>

---
