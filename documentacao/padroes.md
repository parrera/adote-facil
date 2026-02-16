# Princípios de Projeto

Identificação e descrição de alguns princípios presentes e ausentes de projeto SOLID, Demeter e Prefira Composição à Herança.

<br>

## SOLID — S (Single Responsibility Principle/Princípio de Responsabilidade Única)


Separação de camadas e responsabilidades claras no back-end, em que cada classe tem apenas um motivo para modificar (coesão).

### Descrição e Exemplos em Código:

- CreateUserController: apenas lida com a requisição HTTP, recebendo os dados, repassando para o service e retornando o status obtido.
    ```ts
    adote-facil/backend/src/controllers/user/create-user.ts
    class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body
        const result = await this.createUser.execute({ name, email, password })
        const statusCode = result.isFailure() ? 400 : 201
        return response.status(statusCode).json(result.value)
    }
    }
    ```
    *Local: adote-facil/backend/src/controllers/user/create-user.ts*

    <br>
- CreateUserService: responsável apenas pela regra de negócio (verificar se e-mail já existe, criptografar senha), chamando o repository para persistir.
    ```ts
    export class CreateUserService {
    constructor(
        private readonly encrypter: Encrypter,
        private readonly userRepository: UserRepository,
    ) {}

    async execute(params: CreateUserDTO.Params): Promise<CreateUserDTO.Result> {
        const { name, email, password } = params

        const userAlreadyExists = await this.userRepository.findByEmail(email)

        if (userAlreadyExists) {
        return Failure.create({ message: 'Email já cadastrado.' })
        }

        const hashedPassword = this.encrypter.encrypt(password)

        const user = await this.userRepository.create({
        name,
        email,
        password: hashedPassword,
        })

        return Success.create(user)
    }
    }
    // ...
    ```
    *Local: adote-facil/backend/src/services/user/create-user.ts*

    <br>
- UserRepository: papel de apenas persistir os dados no banco.
    ```ts
    export class UserRepository {
    constructor(private readonly repository: PrismaClient) {}

    async create(
        params: CreateUserRepositoryDTO.Params,
    ): Promise<CreateUserRepositoryDTO.Result> {
        return this.repository.user.create({ data: params })
    }

    async update(params: UpdateUserRepositoryDTO.Params) {
        return this.repository.user.update({
        where: { id: params.id },
        data: params.data,
        })
    }
    //...
    ```
    *Local: adote-facil/backend/src/repositories/user.ts*

<br>

## SOLID — I (Interface Segregation Principle/Segregação de Interfaces)

Há tipos e DTOs específicos (frontend `@types`, backend `*.dto.d.ts`), evitando interfaces “gigantes”.

### Descrição e Exemplos em Código:

```ts
export type UserData = {
  id: string
  name: string
  email: string
}
```
*Local: adote-facil/frontend/src/@types/user-data.d.ts*

<br>

```ts
export namespace CreateUserRepositoryDTO {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export type Result = User
}
```
*Local: adote-facil/backend/src/repositories/user.dto.d.ts*

<br>
Cada camada recebe apenas os campos necessários para sua operação, sendo coesas e específicas para sua finalidade.

---

<br>

## Prefira Composição à Herança

O frontend usa composição de layout e providers ao invés de hierarquias de classes.

### Descrição e Exemplos em Código:

```tsx
    import StyledComponentsRegistry from '@/lib/registry'
    import { GlobalStyles } from '@/styles/global'
    import { ThemeClient } from '@/providers/ThemeClientProvider'

    import { Nunito } from 'next/font/google'
    import { AnimalsContextClientProvider } from '@/providers/AnimalsContextClientProvider'

    const nunitoFont = Nunito({ subsets: ['latin'] })
                        
    export default function RootLayout({
    children,
    }: {
    children: React.ReactNode
    }) { 
    return (
        <html className={nunitoFont.className}>
        <body>
        
            {/* Wrappers que envolverão o children (todo o conteúdo): */}
            <StyledComponentsRegistry> 
            <ThemeClient>
                <AnimalsContextClientProvider>

                <GlobalStyles />

                {/*Composição dos componentes wrappers no children, recebendo os seus dados e repassando para um componente principal*/}
                {children}
                </AnimalsContextClientProvider>
            </ThemeClient>
            </StyledComponentsRegistry>
        </body>
        </html>
    )
    }
```

*Local: adote-facil/frontend/src/app/layout.tsx*

<br>

Composição facilita reutilização e extensão sem acoplamento por herança, podendo alterar o provedores apenas removendo a tag HTML correspondente, ao invés da herança em que poderia ter uma complexa cadeia hereditária, frágil e propensa a erros.

<br>

---

## Princípio de Demeter/Lei do Menor Conhecimento (Ausente)

Há páginas que conhecem detalhes demais da resposta HTTP e da navegação, acessando estruturas mais profundas e não encapsulando adequadamente.

### Descrição e Exemplos em Código:

```tsx

import { insertUserChat } from '@/api/insert-user-chat'

    //...

  const handleContactAnimalOwner = async () => {
    try {
      const token = getCookie('token') || ''

      const response = await insertUserChat(animal?.userId || '', token)

      if (response.status !== 201) {
        alert('Ocorreu um erro ao contatar o dono, por favor tente 
        novamente')
      }

      const chatId = response.data.chat.id

      window.location.href = `/area_logada/conversas/${chatId}`
    } catch (err) {}
  }
```
*Local: adote-facil/frontend/src/app/area_logada/animais_disponiveis/[id]/AnimalDetailsPage.tsx*

<br>

A página depende da forma exata de `response.data.chat.id`, do componente insertUserChat:
```tsx
import { makeRequest } from '.'

export async function insertUserChat(userId: string, token: string) {
  return makeRequest({
    url: `${process.env.NEXT_PUBLIC_API_URL}/users/chats`,
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    data: { userId },
  })
}
```
<br>

### Refatoração Sugerida:

```ts
export async function insertUserChat(input: { userId: string }): Promise<{ chatId: string }> {
  const response = await api.post('/chat', input)
  return { chatId: response.data.chat.id }
}
```
*Local: adote-facil/frontend/src/api/insert-user-chat.ts*

<br>

```tsx
const { chatId } = await insertUserChat({ animal.userId })
router.push(`/area_logada/conversas/${chatId}`)
```

A UI passa a conhecer menos a estrutura interna da resposta, apenas recendo a resposta em si diretamente.

---

<br>

## SOLID — O: Open-Closed Principle/Princípio Aberto-Fechado (Ausente)

CreateUserService depende da classe concreta Encrypter, violando o princípio que permitiria mudar o comportamento do sistema, sem ter que modificá-lo.

### Descrição e Exemplos em Código:

```tsx
    import { Encrypter } from '../../providers/encrypter.js' // -> Importa a implementação concreta

    export class CreateUserService {
    constructor(
        private readonly encrypter: Encrypter, // -> Depende da classe concreta. Se a classe Encrypter mudar, isso aqui pode quebrar.
        private readonly userRepository: UserRepository,
    ) {}

    async execute(params: CreateUserDTO.Params): Promise<CreateUserDTO.Result> {
        // ...
        const hashedPassword = this.encrypter.encrypt(password) // -> O método .encrypt() depende ao que a classe Encrypter faz (usa bcrypt).
        // ...
        }
    }
```
*Local: backend/src/services/user/create-user.ts*

**Classe Encrypter**:

```tsx
    import bcrypt from 'bcrypt'

    export class Encrypter {
    encrypt(value: string): string {
        return bcrypt.hashSync(value, 10) // -> Comportamento/lógica dependente
    }
    // ...
    }

```
*Local: backend/src/providers/encrypter.ts*

<br>

### Refatoração Sugerida:

```tsx
export interface IEncrypter {
  encrypt(value: string): string;
  compare(value: string, hash: string): boolean;
}
```
*Local: src/providers/protocols/encrypter-protocol.ts*

```tsx
import { IEncrypter } from '../../providers/protocols/encrypter-protocol'

export class CreateUserService {
  constructor(
    private readonly encrypter: IEncrypter,   // -> Depende agora apenas da interface, aceitando novos tipos de criptografia/extensões: Argon2, FakeEncrypter...
    private readonly userRepository: UserRepository,
  ) {}

  // ...
}
```
*Local: src/services/user/create-user.ts*

```tsx
import argon2 from 'argon2'
import { IEncrypter } from './protocols/encrypter-protocol'

export class ArgonEncrypter implements IEncrypter {
  async encrypt(value: string): string {
    return await argon2.hash(value)
  }
  // ...
}
```
*Local: src/providers/argon-encrypter.ts*

```tsx
// Se quiser usar o BCrypt (Implementação antiga):
const encrypter = new BcryptEncrypter(); 

// OU, se quiser mudar para Argon2:
// const encrypter = new ArgonEncrypter(); 

// O Service aceita qualquer um dos dois, pois ambos implementam IEncrypter:
const createUserServiceInstance = new CreateUserService(
  encrypter,
  userRepositoryInstance
);
```
-> O componente que for instanciar a classe de serviço de usuário, vai definir qual encrypter vai ser utilizado

<br>

Como resultado, agora é possível extender a funcionalidade apenas injetando, sem ter que alterar o comportamento no código para adicionar/alterar uma nova funcionalidade, pois a interface atua como intermediadora.

<br>

---

<br>

# Padrões de Projeto

Identificação e descrição dos seguintes padrões de projeto presentes e ausentes: Singleton, Facade e Template Method

<br>

## Singleton

```tsx
export class Authenticator {
  // ... 
  generateToken(payload: object): string { 
    return jwt.sign(payload, this.secret, { expiresIn: '1h' })
  }
}

// Cria-se uma instância única que será reutilizada em toda a aplicação:
export const authenticatorInstance = new Authenticator()
```
*Local: adote-facil/backend/src/providers/authenticator.ts*

<br>

A classe de autenticação exporta uma única instância que será acessada globalmente, mantendo um acesso controlado a ela.

<br>

## Facade (Fachada)

As páginas em `src/api` não montam requisição HTTP diretamente (axios, método, headers...), elas chamam as funções implementadas em outros componentes, como `insertUserChat` e `animalRegister`.

### Descrição e Exemplos em Código:

```ts
import { makeRequest } from '.'

export async function insertUserChat(userId: string, token: string) {

  // Requisição:
  return makeRequest({  
    url: `${process.env.NEXT_PUBLIC_API_URL}/users/chats`,
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    data: { userId },
  })
}
```
*Local: adote-facil/frontend/src/api/insert-user-chat.ts*

<br>

```ts
import { AnimalRegisterFormData } from '@/components/AnimalRegisterForm'
import { makeRequest } from '.'

export function animalRegister(data: AnimalRegisterFormData, token?: string) {
  const formData = new FormData()

  formData.append('name', data.name)
  formData.append('type', data.type)
  formData.append('gender', data.gender)
  if (data.race) formData.append('race', data.race)
  if (data.description) formData.append('description', data.description)

  data.pictures.forEach((file) => {
    formData.append('pictures', file)
  })

  // Requisição:
  return makeRequest({
    url: `${process.env.NEXT_PUBLIC_API_URL}/animals`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  })
}
```
*Local: adote-facil/frontend/src/api/register-animal.ts*

<br>

**Componente da função responsável por fazer a requisição geral:**
```ts
import axios, { AxiosError } from 'axios'

const api = axios.create()

export async function makeRequest({
  url,
  method,
  data,
  headers,
  params,
}: {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: object
  headers?: object
  params?: object
}) {
  try {
    //..
    })
    return response
  } catch (err) {
    //..
}
```
*Local: adote-facil/frontend/src/api/index.ts*

<br>

`insertUserChat` e `animalRegister` funcionam como entradas simplificadas e delega os detalhes técnicos para `makeRequest`.

---

<br>

### Template Method (Ausente)

Os controllers no back-end seguem um processo semelhante (`ler request -> chamar service -> definir status -> responder`), sem uma classe base que padronize esse algoritmo.

```tsx

// ...
class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {

    // Extrai dados da requisição HTTP
    const { name, email, password } = request.body

    // Delega a regra de negócio para o service
    const result = await this.createUser.execute({ name, email, password })

    // Decide o status HTTP com base no resultado
    const statusCode = result.isFailure() ? 400 : 201

    // Retorna payload padronizado
    return response.status(statusCode).json(result.value)
  }
  // ...
}
// ...
```
*Local: adote-facil/backend/src/controllers/user/create-user.ts*

<br>

```tsx
// ...
class CreateAnimalController {
  async handle(request: Request, response: Response): Promise<Response> {

    // Mesmo processo...
    const { name, type, gender, race, description } = request.body
    
    const { user } = request
    const pictures = request.files as Express.Multer.File[]
    try {
      const pictureBuffers = pictures.map((file) => file.buffer)
      const result = await this.createAnimal.execute({
        name,
        type,
        gender,
        race,
        description,
        userId: user?.id || '',
        pictures: pictureBuffers,
      })

      const statusCode = result.isFailure() ? 400 : 201

      return response.status(statusCode).json(result.value)
  }
  // ...
}
// ...
```
*Local: adote-facil/backend/src/controllers/animal/create-animal.ts*

<br>

### Refatoração Sugerida:

```tsx
import { Request, Response } from 'express'

export abstract class BaseController<TParams = unknown> {
  async handle(request: Request, response: Response): Promise<Response> {
    // Transformar HTTP em parâmetros de negócio
    const params = this.parseRequest(request)

    // Executar ação principal
    const result = await this.execute(params)

    // Definir status de resposta
    const statusCode = result.isFailure?.() ? this.failureStatus() : this.successStatus()

    // Serializar resposta HTTP
    return response.status(statusCode).json(result.value ?? result)
  }

  // Pontos variáveis: cada controller concreto implementa sua lógica
  protected abstract parseRequest(request: Request): TParams
  protected abstract execute(params: TParams): Promise<any>

  // Comportamentos padrão sobrescrevíveis:
  protected successStatus(): number {
    return 200
  }

  protected failureStatus(): number {
    return 400
  }
}
```
*Classe Base de Controle*

<br>

**Classe Controller de Usuário Refatorada:**
```tsx

import { Request } from 'express'
import { BaseController } from '../base-controller.js'
// ...

type CreateUserParams = { name: string; email: string; password: string }

class CreateUserController extends BaseController<CreateUserParams> {
  // ...

  protected parseRequest(request: Request): CreateUserParams {

    // Especialização do passo "parseRequest" do template
    const { name, email, password } = request.body
    return { name, email, password }
  }

  protected execute(params: CreateUserParams) {

    // Especialização do passo "execute" do template
    return this.createUser.execute(params)
  }

  protected override successStatus(): number {

    // Ajuste específico: criação retorna 201 (não 200)
    return 201
  }
}
```
*Local: adote-facil/backend/src/controllers/user/create-user.ts*

<br>

Removendo a duplicação de função `handle(...)`, padronizando a resposta HTTP e facilitando a manutenção em uma única classe base.
