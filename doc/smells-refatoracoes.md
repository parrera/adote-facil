# Detecção de Code Smells e Refatorações

Este documento apresenta a análise manual de "code smells" (maus cheiros de código) encontrados nas classes de serviço do projeto backend, com propostas de refatoração para melhorar a qualidade, manutenibilidade e legibilidade do código.

---

## 1. Código Duplicado: Formatação de Imagens para Base64

**Smell Identificado:** Código Duplicado (Duplicated Code).  
A lógica para formatar os dados binários das imagens para o formato Base64 é repetida em múltiplos serviços (`GetAvailableAnimalsService` e `GetUserAnimalsService`).  
A duplicação de código dificulta a manutenção, pois qualquer alteração precisa ser replicada em vários locais, aumentando a chance de erros.

### Trecho do Código Original

Observe a repetição da lógica de `map` e `toString('base64')` nos arquivos **get-available.ts** e **get-user.ts**:

```typescript
// backend/src/services/animal/get-available.ts
const formattedAnimals = animals.map((animal) => {
  return {
    ...animal,
    images: animal.images.map((image) => {
      return image.imageData.toString("base64"); // Lógica duplicada
    }),
  };
});
return Success.create({ animals: formattedAnimals });
```

```typescript
// backend/src/services/animal/get-user.ts
const formattedAnimals = animals.map((animal) => {
  return {
    ...animal,
    images: animal.images.map((image) => {
      return image.imageData.toString("base64"); // Lógica duplicada
    }),
  };
});
return Success.create({ animals: formattedAnimals });
```

### Refatoração Sugerida

Crie uma função utilitária dedicada para essa tarefa de formatação de imagens, centralizando a lógica em um único local (princípio **DRY**).

**Arquivo sugerido:** `backend/src/utils/formatters.ts`

```typescript
// backend/src/utils/formatters.ts
import { Animal, AnimalImage } from "@prisma/client";

export const formatAnimalImagesToBase64 = (
  animal: Animal & { images: AnimalImage[] }
): Animal & { images: string[] } => {
  return {
    ...animal,
    images: animal.images.map((image) => image.imageData.toString("base64")),
  };
};
```

**Aplicação em `get-available.ts`:**

```typescript
// backend/src/services/animal/get-available.ts
import { Animal } from "@prisma/client";
import { Either, Success } from "../../utils/either.js";
import {
  AnimalRepository,
  animalRepositoryInstance,
} from "../../repositories/animal.js";
import { formatAnimalImagesToBase64 } from "../../utils/formatters.js";

export class GetAvailableAnimalsService {
  constructor(private readonly animalRepository: AnimalRepository) {}

  async execute(
    params: GetAvailableAnimalsDTO.Params
  ): Promise<GetAvailableAnimalsDTO.Result> {
    const animals = await this.animalRepository.findAllAvailableNotFromUser(
      params
    );

    const formattedAnimals = animals.map(formatAnimalImagesToBase64);

    return Success.create({ animals: formattedAnimals });
  }
}
```

---

## 2. Strings Mágicas: Mensagens de Erro

**Smell Identificado:** Strings Mágicas (Magic Strings).  
As mensagens de erro estão hardcoded diretamente nas classes de serviço, o que dificulta manutenção e pode gerar inconsistências.

### Trecho do Código Original

```typescript
// backend/src/services/animal/create-animal.ts
if (!animal) {
  return Failure.create({ message: "Erro ao criar o animal." }); // String mágica
}
```

```typescript
// backend/src/services/chat/create-user-chat-message.ts
if (senderId === receiverId) {
  return Failure.create({ message: "Sender id is equal to receiver id" }); // String mágica
}
```

### Refatoração Sugerida

Crie um arquivo de constantes para centralizar todas as mensagens de erro.

**Arquivo sugerido:** `backend/src/constants/error-messages.ts`

```typescript
// backend/src/constants/error-messages.ts
export const ERROR_MESSAGES = {
  CREATE_ANIMAL_ERROR: "Erro ao criar o animal.",
  UPDATE_ANIMAL_STATUS_ERROR: "Erro ao atualizar o status do animal.",
  SENDER_RECEIVER_EQUALS_ERROR:
    "O ID do remetente é igual ao ID do destinatário.",
  USER_CANNOT_CHAT_WITH_SELF: "O usuário não pode criar um chat consigo mesmo.",
};
```

**Aplicação em `create-animal.ts`:**

```typescript
import { ERROR_MESSAGES } from "../../constants/error-messages.js";

if (!animal) {
  return Failure.create({ message: ERROR_MESSAGES.CREATE_ANIMAL_ERROR });
}
```

---


### 4. Analisando a função makeRequest abaixo

// frontend/src/api/index.ts

    export async function makeRequest(...) {
      try {
        // Se a requisição for bem sucedida, retorna a resposta do axios
        const response = await api.request(...)
            return response
      } catch (err) {
         // Se der erro...
        const error = err as AxiosError

     if (error.response) {
      // ela NÃO lança um erro. Em vez disso, ela retorna um objeto com a mesma aparência de uma resposta de sucesso.
       return { status: error.response.status, data: error.response.data }
     }

     // O mesmo acontece para erros de rede.
    return { status: 500, data: { message: error.message } }

}
}

-|
-----> O problema é que a função makeRequest nunca falha. Ela sempre retorna um objeto, seja em caso de sucesso ou de erro.

- O padrão em JavaScript/TypeScript é usar
- try...catch para lidar com operações que podem falhar, como chamadas de API.

### 1. Inconsistência de retorno

- Sucesso → retorna `AxiosResponse` completo.
- Erro → retorna apenas `{ status, data }`.
- Quem consome a função nunca sabe qual formato esperar.

### 2. Supressão de erros

- Nunca lança exceção.
- Tratamento de falhas de rede e status 4xx/5xx vira “resposta normal”.
- Pode mascarar problemas graves.

### 3. Perda de informações

- Erros retornam dados limitados (`status`, `data`, `message`).
- Informações úteis como headers, config e stacktrace se perdem.

### 4. Status HTTP enganoso

- Usa `500` para qualquer erro de rede.
- Timeout, DNS ou falha de conexão não são realmente "500 Internal Server Error".

# Como solucionar:

type ApiResult<T> = { ok: true; response: AxiosResponse<T> }
| { ok: false; status: number; data: any; error?: AxiosError }

- Assim, quem usa makeRequest sabe sempre que vem ok: true ou ok: false.

### Refatoração Sugerida

Crie um validador genérico para encapsular essa regra de negócio.

**Arquivo sugerido:** `backend/src/utils/validators.ts`

```typescript
// backend/src/utils/validators.ts
import { Failure } from "./either.js";

export const validateDifferentUsers = (
  id1: string,
  id2: string,
  errorMessage: string
): Failure<{ message: string }> | undefined => {
  if (id1 === id2) {
    return Failure.create({ message: errorMessage });
  }
  return undefined;
};
```

**Aplicação em `create-user-chat-message.ts`:**

```typescript
import { validateDifferentUsers } from "../../utils/validators.js";
import { ERROR_MESSAGES } from "../../constants/error-messages.js";

const validationError = validateDifferentUsers(
  senderId,
  receiverId,
  ERROR_MESSAGES.SENDER_RECEIVER_EQUALS_ERROR
);

if (validationError) {
  return validationError;
}
```

---
