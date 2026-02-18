# Padrões de Projeto e Princípios SOLID

Este documento detalha a análise dos padrões de projeto e princípios de arquitetura identificados no código-fonte do sistema **Adote Fácil**. A análise baseia-se na inspeção das camadas de rotas, controladores, serviços, repositórios e middlewares.

## 1. Princípios SOLID

A arquitetura do projeto demonstra uma forte adesão aos princípios SOLID, garantindo baixo acoplamento, alta coesão e testabilidade.

### 1.1. Single Responsibility Principle (SRP) - Princípio da Responsabilidade Única

A separação de responsabilidades é rigorosa através das camadas:

* **Controllers (`src/controllers`):** Responsáveis exclusivamente pela interface HTTP (receber `req`, validar dados brutos, chamar o serviço e devolver `res`). Não contêm regras de negócio.
* **Services (`src/services`):** Contêm exclusivamente as regras de negócio (Casos de Uso). Não sabem que estão rodando na web.
* **Repositories (`src/repositories`):** Responsáveis apenas pela persistência e abstração do banco de dados (Prisma).
* **Middlewares (`src/middlewares`):** Responsáveis por tarefas transversais, como autenticação.

### 1.2. Open/Closed Principle (OCP)

O sistema está desenhado para ser estendido sem modificar o código existente em pontos críticos.

As classes de Serviço dependem de abstrações. Para trocar o provedor de criptografia, basta criar uma nova classe que respeite os métodos `encrypt` e `compare` e injetá-la, sem alterar uma linha sequer dos serviços de `UserLogin` ou `CreateUser`.

### 1.3. Dependency Inversion Principle (DIP) - Princípio da Inversão de Dependência

Os módulos Services não dependem de módulos de baixo nível, ambos dependem de abstrações.

* **Evidência:** Os serviços recebem suas dependências via **Construtor**.
    * Arquivo: `src/services/user/create-user.ts`
    ```typescript
    export class CreateUserService {
      constructor(
        private readonly encrypter: Encrypter,       // Abstração de criptografia
        private readonly userRepository: UserRepository, // Abstração de persistência
      ) {}
    }
    ```

---

## 2. Padrões de Projeto (Design Patterns)

Foram identificados diversos padrões GoF (Gang of Four) e padrões de arquitetura corporativa (P of EAA).

### 2.1. Chain of Responsibility (Cadeia de Responsabilidade)

Este padrão permite passar requisições por uma corrente de handlers. O Express.js utiliza este padrão nativamente através de **Middlewares**.

* **Aplicação:** Autenticação de rotas.
* **Evidência:** No arquivo `src/middlewares/user-auth.ts`, o método `authenticate` verifica o token. Se válido, ele chama `next()` passando a responsabilidade para o próximo controlador. Se inválido, ele interrompe a cadeia retornando `401`.
    ```typescript
    // src/middlewares/user-auth.ts
    authenticate(req: Request, res: Response, next: NextFunction) {
        //validação do token 
        req.user = decoded; // Decora a requisição
        return next(); // Passa para o próximo elo da cadeia
    }
    ```

### 2.2. Singleton

Garante que uma classe tenha apenas uma instância e fornece um ponto global de acesso a ela.

* **Aplicação:** Gerenciamento da conexão com o Banco de Dados.
* **Evidência:** O arquivo `src/database.ts` exporta uma instância única do Prisma Client, prevenindo a exaustão do pool de conexões.
    ```typescript
    export const prisma = new PrismaClient()
    ```

### 2.3. Repository Pattern

Abstrai a camada de dados, funcionando como uma coleção em memória para o domínio. Centraliza as queries e esconde a complexidade do ORM.

* **Aplicação:** Diretório `src/repositories`.
* **Evidência:** O arquivo `src/repositories/animal.ts` encapsula a lógica complexa de filtro. O serviço chama `findAllAvailableNotFromUser` sem saber que por trás existe uma query SQL/Prisma com `where`, `not` e `includes`.

  ```async findAllAvailableNotFromUser({
     userId,
     gender,
     type,
     name,
    }: FindAllAvailableNotFromUserParams) {
   return this.repository.animal.findMany({
    where: {
      userId: { not: userId },
      status: AnimalStatusEnum.available,
      ...(gender ? { gender } : {}),
      ...(type ? { type } : {}),
      ...(name ? { name: { contains: name, mode: 'insensitive' } } : {}),
     },
        include: { images: true },
        })
    }  
    ``` 

### 2.4. Adapter (Adaptador)

Permite que classes com interfaces incompatíveis trabalhem juntas, envolvendo uma biblioteca externa em uma interface conhecida pelo sistema.

* **Aplicação:** `Encrypter` (para *bcrypt*) e `Authenticator` (para *jsonwebtoken*).
* **Benefício:** Evita *Vendor Lock-in*. Se o `jsonwebtoken` for descontinuado, apenas a classe `Authenticator` precisa ser alterada, mantendo todos os controladores intactos.

  ```// A classe Encrypter adapta a biblioteca externa 'bcrypt'
    export class Encrypter {
    encrypt(value: string): string {
        return bcrypt.hashSync(value, 10) // <--- O Service não sabe que é bcrypt, só chama .encrypt()
         }
    }
    ```

### 2.5. Dependency Injection (Injeção de Dependência Manual)

* **Aplicação:** Final dos arquivos de serviço e controller.
* **Evidência:** As instâncias são criadas e acopladas manualmente na inicialização da aplicação.
    ```typescript
    export const createUserServiceInstance = new CreateUserService(
      encrypterInstance,
      userRepositoryInstance
    )
    ```

---

## 3. Considerações Finais

A arquitetura do **Adote Fácil** é madura e robusta. O uso consistente de **Injeção de Dependência** facilita a criação de testes unitários. A separação em camadas protege as regras de negócio de mudanças na interface ou no banco de dados.