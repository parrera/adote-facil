# Detecção de Code Smells e Refatorações (Adote-Fácil)

Neste documento, apresentamos 3 casos de *Code Smells* identificados no projeto através do SonarLint, juntamente com as suas respetivas refatorações aplicadas para melhorar a qualidade, manutenibilidade e segurança do software.

<details>
<summary><strong>Caso 1: Campo Mutável Desnecessário (Falta de Somente Leitura)</strong></summary>

**Onde:** Backend - `src/providers/authenticator.ts`

### Smell:

O membro `secret` da classe `Authenticator` é atribuído apenas na sua declaração, mas não está marcado como `readonly`.

Isto é um *Code Smell* que afeta a clareza e a intencionalidade do código (regra `typescript:S2933`). A ausência do modificador `readonly` pode causar confusão sobre o uso pretendido do campo, permitindo que futuros responsáveis pela manutenção modifiquem o seu valor inadvertidamente, o que prejudica a manutenibilidade.

---

### Código original

```typescript
import jwt from 'jsonwebtoken'

export class Authenticator {
  private secret = process.env.JWT_SECRET || 'secret'

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: '1h' })
  }
}

```

---

### Refatoração aplicada

Adição do modificador `readonly` para explicitar que o campo é imutável após a inicialização.

```typescript
import jwt from 'jsonwebtoken'

export class Authenticator {
  private readonly secret = process.env.JWT_SECRET || 'secret'

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: '1h' })
  }
}

```

</details>

---

<details>
<summary><strong>Caso 2: Condição Negada Inesperada</strong></summary>

**Onde:** Frontend - `src/api/update-user.ts`

### Smell:

A montagem do objeto de dados utiliza condições negadas (`!==`) em operadores ternários (que funcionam como blocos `if-else`).

Este *Code Smell* prejudica a legibilidade e aumenta a carga cognitiva, pois o cérebro precisa processar a negação em vez de uma afirmação direta. Condições positivas descrevem o que é verdadeiro, tornando a lógica mais direta e reduzindo a probabilidade de erros durante a manutenção.

---

### Código original

```typescript
data: {
  name: data.name !== '' ? data.name : undefined,
  email: data.email !== '' ? data.email : undefined,
  password: data.password !== '' ? data.password : undefined,
}

```

---

### Refatoração aplicada

Inversão da condição booleana para testar a igualdade (`===`) e troca da ordem dos retornos do ternário.

```typescript
data: {
  name: data.name === '' ? undefined : data.name,
  email: data.email === '' ? undefined : data.email,
  password: data.password === '' ? undefined : data.password,
}

```

</details>

---

<details>
<summary><strong>Caso 3: Múltiplas Instruções RUN Consecutivas</strong></summary>

**Onde:** Backend - `Dockerfile`

### Smell:

O Dockerfile apresenta várias instruções `RUN` declaradas de forma consecutiva (regra `docker:S7031`).

Isto é um *Code Smell* de infraestrutura, pois cada vez que uma instrução `RUN` é adicionada, uma nova camada é criada na imagem final do Docker. Isso impacta negativamente o tempo de build e aumenta desnecessariamente o tamanho da imagem gerada.

---

### Código original

```dockerfile
COPY . .

RUN npm run generate
RUN npm run test
RUN npm run build

EXPOSE 8080

```

---

### Refatoração aplicada

Mesclagem das instruções `RUN` consecutivas em uma única camada utilizando o operador lógico `&&`.

```dockerfile
COPY . .

RUN npm run generate \
 && npm run test \
 && npm run build

EXPOSE 8080

```

</details>

---