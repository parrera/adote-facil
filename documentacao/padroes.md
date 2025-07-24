# Princípios e Padrões de Projeto - Adote Fácil

Este documento detalha a aplicação de princípios de design e padrões de projeto no backend do sistema Adote Fácil, com exemplos práticos extraídos do código-fonte.

## 1. Princípios SOLID

A arquitetura do projeto foi construída sobre os pilares dos princípios SOLID, garantindo a separação de responsabilidades e o baixo acoplamento entre os módulos.

### Princípio da Responsabilidade Única (SRP)

O SRP é um dos princípios mais visíveis na arquitetura, que segmenta as responsabilidades em camadas bem definidas: `Controllers`, `Services` e `Repositories`.

- **Controllers:** Responsáveis unicamente por gerenciar o ciclo da requisição HTTP (receber dados, validar formato, chamar serviços e retornar a resposta).
- **Services:** Responsáveis por orquestrar a lógica de negócio e as regras da aplicação.
- **Repositories:** Responsáveis unicamente pelo acesso e manipulação dos dados no banco de dados.

**Exemplo Prático: `CreateAnimalController`**

O controller abaixo demonstra claramente o SRP. Sua única responsabilidade é atuar como um "maestro" da requisição, sem se envolver com a lógica de negócio de como um animal é de fato criado.

```typescript
// src/controllers/animal/create-animal.ts
class CreateAnimalController {
  constructor(private readonly createAnimal: CreateAnimalService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    // 1. Extrai e adapta dados da camada HTTP
    const { name, type, gender, race, description } = request.body
    const { user } = request
    const pictures = request.files as Express.Multer.File[]
    const pictureBuffers = pictures.map((file) => file.buffer)

    // 2. Delega a execução da lógica de negócio para o serviço
    const result = await this.createAnimal.execute({
      // ...dados...
    })

    // 3. Formata e retorna a resposta HTTP baseada no resultado
    const statusCode = result.isFailure() ? 400 : 201
    return response.status(statusCode).json(result.value)
  }
}
```

### Princípio Aberto/Fechado (OCP)

Este princípio estabelece que o software deve ser aberto para extensão, mas fechado para modificação. A arquitetura do projeto adere a este princípio em seu nível macro, mas apresenta pontos de melhoria em implementações específicas.

**Aplicação em Nível Arquitetural:**

A estrutura modular, com um arquivo por caso de uso, permite que novas funcionalidades sejam adicionadas ao sistema sem a necessidade de alterar código existente e já testado. Por exemplo, para adicionar um novo recurso, um desenvolvedor criaria novos arquivos de `controller` e `service`, estendendo as capacidades do sistema de forma segura.

**Ponto de Análise e Melhoria:**

Em alguns pontos, o princípio poderia ser aplicado de forma mais rigorosa. Um exemplo é a função de listagem de animais com filtros, no `AnimalRepository`.

```typescript
// src/repositories/animal.ts
async findAllAvailableNotFromUser({ /* ...filtros... */ }) {
  return this.repository.animal.findMany({
    where: {
      // ...
      ...(gender ? { gender } : {}),
      ...(type ? { type } : {}),
      ...(name ? { name: { contains: name, mode: 'insensitive' } } : {}),
    },
    // ...
  })
}
```

Atualmente, para adicionar um novo critério de filtro (como `idade` ou `porte`), é necessário modificar o corpo do objeto `where` dentro deste método. Isso representa uma violação do "fechado para modificação".

Uma evolução futura poderia refatorar esta lógica utilizando padrões como **Strategy** ou **Specification**, onde cada filtro seria encapsulado em seu próprio objeto. Isso permitiria adicionar novos filtros sem alterar o método do repositório, aderindo de forma mais estrita ao OCP.

### Princípio da Inversão de Dependência (DIP)

Este princípio é aplicado em toda a aplicação através do padrão de **Injeção de Dependência (DI)**. Módulos de alto nível (como controllers) não dependem de implementações concretas de baixo nível (como serviços ou repositórios), mas sim de abstrações que são "injetadas" em seus construtores.

**Exemplo Prático: Injeção de Dependências em Cascata**

O `CreateAnimalController` depende de `CreateAnimalService`, que por sua vez depende de `AnimalRepository`. Em nenhum momento uma classe cria sua própria dependência.

```typescript
// Controller depende de um Serviço
// src/controllers/animal/create-animal.ts
class CreateAnimalController {
  constructor(private readonly createAnimal: CreateAnimalService) {}
}

// Serviço depende de um ou mais Repositórios
// src/services/animal/create-animal.ts
class CreateAnimalService {
  constructor(
    private readonly animalRepository: AnimalRepository,
    private readonly animalImageRepository: AnimalImageRepository,
  ) {}
}

// Repositório depende do client do Banco de Dados
// src/repositories/animal.ts
class AnimalRepository {
  constructor(private readonly repository: PrismaClient) {}
}
```

#### Benefício Direto do DIP: Alta Testabilidade

A Injeção de Dependência é a chave para a testabilidade do código. Nos testes unitários, as dependências reais (que acessam o banco de dados) são facilmente substituídas por "mocks" (objetos falsos), permitindo testar a lógica de negócio de forma completamente isolada.

**Exemplo Prático: Teste do `CreateAnimalService`**

No teste, injetamos mocks dos repositórios para verificar se a lógica do serviço está correta, sem precisar de um banco de dados real.

```typescript
// src/services/animal/create-animal.spec.ts
describe('CreateAnimalService', () => {
  let sut: CreateAnimalService
  let animalRepository: MockProxy<AnimalRepository>
  // ...

  beforeAll(() => {
    // 1. Criamos os mocks
    animalRepository = mock<AnimalRepository>()
    animalImageRepository = mock<AnimalImageRepository>()

    // 2. Injetamos os mocks no nosso "Sistema Sob Teste" (sut)
    sut = new CreateAnimalService(animalRepository, animalImageRepository)
  })

  test('should call animal repository with correct values', async () => {
    // 3. Executamos e verificamos o comportamento com os mocks
    await sut.execute(defaultParams)
    expect(animalRepository.create).toHaveBeenCalledWith(/* ... */)
  })
})
```

---

## 2. Padrões de Projeto (Design Patterns)

Além dos princípios SOLID, a aplicação utiliza diversos padrões de projeto para resolver problemas comuns de forma elegante e reutilizável.

### Padrão Repository

Este padrão é usado para criar uma camada de abstração entre a lógica de negócio e a fonte de dados (neste caso, o Prisma ORM). Os `Repositories` centralizam e encapsulam toda a lógica de acesso a dados.

**Vantagem:** Se a equipe decidir trocar o Prisma por outro ORM, apenas a implementação dos repositórios precisaria ser alterada, enquanto as camadas de serviço e controller permaneceriam intactas.

**Exemplo Prático: `AnimalRepository`**

```typescript
// src/repositories/animal.ts
export class AnimalRepository {
  constructor(private readonly repository: PrismaClient) {}

  async create(
    params: CreateAnimalRepositoryDTO.Params,
  ): Promise<CreateAnimalRepositoryDTO.Result> {
    // A chamada específica do Prisma fica encapsulada aqui
    return this.repository.animal.create({ data: params })
  }

  // ... outros métodos de acesso a dados
}
```

### Padrão Singleton

O padrão Singleton é utilizado de forma pragmática para garantir que exista apenas uma instância de objetos reutilizáveis, como controllers, serviços e repositórios. Isso evita a criação desnecessária de objetos, economizando memória e garantindo um ponto de acesso único para aquele recurso.

**Exemplo Prático: Instância Única de um Repositório**

Uma única instância do `AnimalRepository` é criada (recebendo o `prisma` como dependência) e exportada para ser usada em toda a aplicação.

```typescript
// src/repositories/animal.ts
// A instância única do Prisma é injetada
export const animalRepositoryInstance = new AnimalRepository(prisma)
```

### Padrão Result Object

Para um tratamento de erros de negócio mais robusto e explícito, a camada de serviço utiliza o padrão Result Object. Em vez de lançar exceções (`throw`), os métodos retornam um objeto que encapsula o resultado, que pode ser um `Success` (contendo o valor) ou um `Failure` (contendo o erro).

**Exemplo Prático: O Retorno do `CreateAnimalService`**

O serviço retorna um `Either<Failure, Success>`, deixando claro para quem o chama (o controller) os possíveis caminhos de resultado.

```typescript
// src/services/animal/create-animal.ts
export class CreateAnimalService {
  async execute(
    params: CreateAnimalDTO.Params,
  ): Promise<CreateAnimalDTO.Result> {
    const animal = await this.animalRepository.create({ /* ... */ })

    if (!animal) {
      // Retorna um objeto de falha explícito
      return Failure.create({ message: 'Erro ao criar o animal.' })
    }
    
    // ...

    // Retorna um objeto de sucesso explícito
    return Success.create({ animal })
  }
}
```