# Análise Arquitetural: Princípios e Padrões de Projeto

Este documento apresenta uma análise da arquitetura do backend do sistema **Adote Fácil**, destacando a aplicação de princípios de Engenharia de Software (SOLID) e a utilização de Padrões de Projeto (Design Patterns) para solucionar desafios de estruturação e manutenção.

---

## 1. Princípios SOLID

A arquitetura do projeto favorece a coesão e o baixo acoplamento através da aplicação consistente dos princípios SOLID.

### 1.1. Princípio da Responsabilidade Única (SRP)

O SRP é evidenciado pela clara separação de responsabilidades entre as camadas. Cada componente possui um único papel no fluxo da aplicação:

- **Controllers:** Tratam exclusivamente da interface HTTP (entrada e saída de dados).
- **Services:** Encapsulam as regras de negócio.
- **Repositories:** Abstraem a persistência de dados.

#### Exemplo Prático: `CreateAnimalController`

O código abaixo demonstra o SRP, onde o controlador atua apenas como um orquestrador, delegando a lógica complexa para o serviço.

```typescript
// src/controllers/animal/create-animal.ts
class CreateAnimalController {
  // O controller não cria a instância do serviço, apenas a recebe (baixo acoplamento)
  constructor(private readonly createAnimal: CreateAnimalService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    // Responsabilidade 1: Extração e adaptação dos dados da requisição
    const { name, type, gender, race, description } = request.body
    const { user } = request
    const pictures = request.files as Express.Multer.File[]
    const pictureBuffers = pictures.map((file) => file.buffer)

    // Responsabilidade 2: Delegação da regra de negócio para o Service
    // O controller não sabe "como" criar, apenas pede para criar.
    const result = await this.createAnimal.execute({
    //   ...dados...
    })

    // Responsabilidade 3: Definição da resposta HTTP baseada no sucesso ou falha da operação
    const statusCode = result.isFailure() ? 400 : 201
    return response.status(statusCode).json(result.value)
  }
}
```

### 1.2. Princípio Aberto/Fechado (OCP)
Este princípio estabelece que classes devem estar abertas para extensão, mas fechadas para modificação. 
#### Análise: 
A arquitetura baseada em casos de uso (Services individuais) permite adicionar novas funcionalidades criando novos arquivos, sem tocar nos antigos. Entretanto, identificamos uma oportunidade de melhoria em consultas de banco de dados.

#### Ponto de atenção:
No repositório de animais, a lógica de filtros exige alteração no código existente sempre que um novo critério é necessário.

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

### 1.3. Princípio da Inversão de Dependência (DIP)

O DIP é aplicado por meio da **injeção de dependência**.  
As classes não criam suas próprias dependências, mas recebem elas no construtor.

### Exemplo

```typescript
// 1. Controller: Depende da classe do Serviço (Abstração da regra)
class CreateAnimalController {
  constructor(private readonly createAnimal: CreateAnimalService) {}
}

// 2. Service: Depende das classes de Repositório (Abstração do Banco)
class CreateAnimalService {
  constructor(
    private readonly animalRepository: AnimalRepository,
    private readonly animalImageRepository: AnimalImageRepository,
  ) {}
}
// 3. Repository: Depende do PrismaClient (Abstração da Conexão)
class AnimalRepository {
  constructor(private readonly repository: PrismaClient) {}
}
```

## 2. Padrões de Projeto

Além dos princípios SOLID, o sistema utiliza padrões de projeto para resolver problemas recorrentes de forma organizada.

---

### 2.1. Padrão Singleton

O padrão Singleton é empregado para garantir que recursos compartilhados e caros (como o pool de conexões do banco de dados) tenham uma instância única em toda a execução da aplicação.

#### Exemplo

```typescript
// src/repositories/animal.ts
// A instância é criada uma única vez neste arquivo e exportada.
// Sempre que importamos 'animalRepositoryInstance', recebemos o mesmo objeto.
export const animalRepositoryInstance = new AnimalRepository(prisma)
```

### 2.2. Padrão Facade

O padrão Facade é aplicado nos repositórios, que escondem a complexidade do acesso ao banco e oferecem métodos simples para o restante do sistema.

#### Exemplo

```typescript
class CreateAnimalService {
  constructor(private readonly animalRepository: AnimalRepository) {}

  async execute(params: ...) {
    const animal = await this.animalRepository.create({ ... });
  }
}

export class AnimalRepository {
  constructor(private readonly repository: PrismaClient) {}

  async create(params: CreateAnimalRepositoryDTO.Params) {
    return this.repository.animal.create({ data: params });
  }
}
```

### Padrão Static Factory Method

Este padrão criacional é utilizado para encapsular a lógica de criação de objetos, tornando o código mais legível e expressivo do que o uso direto do operador `new`. No projeto, ele é fundamental na implementação da classe utilitária `Either`, utilizada para o tratamento de erros funcional.

**Vantagem:** Ao invés de espalhar instâncias com `new Failure(...)` ou `new Success(...)` pelo código, o padrão centraliza a criação, garantindo consistência e clareza sobre o que o objeto representa (sucesso ou falha).

**Exemplo Prático: Criação de `Success` e `Failure`**

A classe `Either` utiliza métodos estáticos (`create`) para fabricar as instâncias, escondendo a complexidade do construtor.

```typescript
// src/utils/either.ts
export class Failure<T> {
  // Construtor privado impede o uso de "new Failure()" fora da classe
  private constructor(value: T) { this.value = value }

  // Factory Method Estático: O ponto único de criação
  static create<U>(value: U): Failure<U> {
    return new Failure(value)
  }
}

// Uso no Serviço (src/services/user/create-user.ts):
if (userAlreadyExists) {
  // Uso do Factory Method para criar a falha de forma expressiva
  return Failure.create({ message: 'Email já cadastrado.' })
}

// Uso do Factory Method para criar o sucesso
return Success.create(user)