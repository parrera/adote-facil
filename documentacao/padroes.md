
# 1. Análise dos Princípios SOLID

## 1.1 Single Responsibility Principle (SRP)

O princípio da responsabilidade única diz que uma classe ou módulo deve ter apenas um motivo para mudar. Em termos práticos, eu entendo como: cada parte do sistema deve fazer uma coisa principal e fazer bem.

No backend do Adote Fácil, dá pra perceber uma separação natural entre:

- **Controllers**: recebem a requisição HTTP e retornam a resposta  
- **Services**: ficam com as regras de negócio (o “coração” da aplicação)  
- **Repositories**: lidam com o acesso aos dados (Prisma/banco)  

Isso ajuda muito na manutenção, porque se eu mudar uma regra de negócio, geralmente eu mexo no service e não preciso alterar os controllers.

### Exemplo no código

```ts
import { Request, Response } from 'express'
import {
  CreateAnimalService,
  createAnimalServiceInstance,
} from '../../services/animal/create-animal.js'

class CreateAnimalController {
  constructor(private readonly createAnimal: CreateAnimalService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, type, gender, race, description } = request.body
    const { user } = request

    const result = await this.createAnimal.execute({
      name,
      type,
      gender,
      race,
      description,
      userId: user.id,
    })

    const statusCode = result.isFailure() ? 400 : 201
    return response.status(statusCode).json(result.value)
  }
}
````

Por que isso é SRP?

Esse controller apenas cuida da parte HTTP (receber dados da requisição e devolver a resposta). Ele não sabe como os dados são salvos no banco nem como a regra de criação do animal funciona. Essa responsabilidade fica toda no service.

---

## 1.2 Open/Closed Principle (OCP)

O princípio aberto/fechado diz que o código deve estar aberto para extensão, mas fechado para modificação. Na prática, isso significa que eu consigo adicionar novos comportamentos sem precisar sair alterando código que já funciona.

No projeto, isso aparece principalmente nos services, que concentram as regras. Assim, novas validações ou filtros podem ser adicionados ali sem mexer nos controllers.

### Exemplo no código

```ts
import {
  AnimalRepository,
  animalRepositoryInstance,
} from '../../repositories/animal.js'
import {
  AnimalImageRepository,
  animalImageRepositoryInstance,
} from '../../repositories/animal-image.js'

export class CreateAnimalService {
  constructor(
    private readonly animalRepository: AnimalRepository,
    private readonly animalImageRepository: AnimalImageRepository,
  ) {}

  async execute(data) {
    const animal = await this.animalRepository.create(data)

    return animal
  }
}
```

Por que isso é OCP?

Se no futuro eu quiser adicionar uma nova regra (por exemplo, validar tipo do animal ou impedir cadastro duplicado), posso estender esse método execute sem precisar mexer no controller que chama o service.

---

## 1.3 Liskov Substitution Principle (LSP)

O princípio da substituição de Liskov afirma que uma implementação pode ser substituída por outra sem quebrar o funcionamento do sistema, desde que mantenha o mesmo comportamento esperado.

Mesmo sem herança explícita no projeto, isso pode ser observado na forma como os services usam os repositories.

### Exemplo no código

```ts
import { prisma } from '../database.js'

export class AnimalRepository {
  constructor(private readonly repository = prisma) {}

  async findAllByUserId(userId: string) {
    return this.repository.animal.findMany({
      where: { userId },
      include: { images: true },
    })
  }
}
```

Por que isso se relaciona com LSP?

Se futuramente esse repositório for substituído por outro (por exemplo, um repositório que busque dados de uma API externa ou um mock para testes), o service pode continuar chamando os mesmos métodos sem precisar ser alterado.

---

## 1.4 Interface Segregation Principle (ISP)

O princípio da segregação de interfaces diz que um módulo não deve ser obrigado a depender de métodos que não utiliza.

No backend, isso aparece quando os repositórios e services oferecem métodos pequenos e específicos, em vez de uma única classe com muitos métodos genéricos.

### Exemplo no código

```ts
async findAllAvailableNotFromUser(params) {
  const { userId, gender } = params

  return this.repository.animal.findMany({
    where: {
      userId: { not: userId },
      gender,
    },
    include: { images: true },
  })
}
```

---

## 1.5 Dependency Inversion Principle (DIP)

O princípio da inversão de dependência diz que módulos de alto nível não devem depender diretamente de módulos de baixo nível.

No projeto, o fluxo geralmente é:

* Controller → Service
* Service → Repository
* Repository → Banco (Prisma)

### Exemplo no código

```ts
import {
  CreateAnimalService,
  createAnimalServiceInstance,
} from '../../services/animal/create-animal.js'

class CreateAnimalController {
  constructor(private readonly createAnimal: CreateAnimalService) {}

  async handle(request, response) {
    const result = await this.createAnimal.execute(request.body)
    return response.json(result)
  }
}

export const createAnimalControllerInstance = new CreateAnimalController(
  createAnimalServiceInstance,
)
```

Por que isso é DIP?

O controller não acessa o banco de dados diretamente. Ele depende do service, que depende do repositório. Isso reduz o acoplamento e facilita a criação de testes, já que dá para trocar o repositório por um mock.

---

# 2. Padrões de Projeto Identificados

## 2.1 Repository Pattern

O Repository Pattern é usado para separar a lógica de acesso aos dados da lógica de negócio.

No projeto, o acesso ao Prisma fica concentrado nos repositórios, enquanto os services apenas chamam esses métodos.

### Exemplo no código

```ts
import { prisma } from '../database.js'

export class AnimalRepository {
  constructor(private readonly repository = prisma) {}

  async create(data) {
    return this.repository.animal.create({ data })
  }

  async findAllByUserId(userId: string) {
    return this.repository.animal.findMany({
      where: { userId },
      include: { images: true },
    })
  }
}
```

Benefícios percebidos:

* Services ficam mais limpos e focados em regra de negócio
* Facilita a criação de testes usando mocks
* Organização melhor do acesso ao banco

---

## 2.2 Model-View-Controller (MVC)

Mesmo sendo uma aplicação moderna, dá pra identificar um padrão MVC adaptado:

* Model: schema do Prisma e dados persistidos
* View: frontend (camada que o usuário vê)
* Controller: backend, recebendo requisições HTTP e chamando services

### Exemplo no código

```ts
// Controller
class CreateAnimalController {
  async handle(request, response) {
    const result = await this.createAnimal.execute(request.body)
    return response.json(result)
  }
}

// Model (Prisma Schema)
model Animal {
  id          String   @id @default(uuid())
  name        String
  type        String
  gender      String
  race        String
  description String
  userId      String
}
```

Por que isso é MVC?

O controller faz a ponte entre a interface (frontend) e os dados (model), enquanto a view apenas consome a API e exibe as informações para o usuário.

---

# 3. Conclusão

Na minha análise, o uso dos princípios SOLID e dos padrões de projeto como Repository e MVC ajuda principalmente a:

* Manter o código mais organizado
* Facilitar a manutenção quando novas regras surgem
* Tornar os testes mais simples (mockando repositórios e services)
* Reduzir o acoplamento entre as camadas

Isso é importante porque, conforme o sistema cresce, o código fica mais previsível e menos propenso a erros quando mudanças são necessárias.

```
