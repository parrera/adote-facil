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

## Princípio de Demeter (Lei do Menor Conhecimento)

Ausente: há páginas que conhecem detalhes demais da resposta HTTP e da navegação, acessando estruturas mais profundas e não encapsulando adequadamente.

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

A página depende da forma exata de "**response.data.chat.id**", do componente insertUserChat:
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

### Refatoração sugerida:

```ts
export async function insertUserChat(input: { animalId: string }): Promise<{ chatId: string }> {
  const response = await api.post('/chat', input)
  return { chatId: response.data.chat.id }
}
```
*Local: adote-facil/frontend/src/api/insert-user-chat.ts*

<br>

```tsx
const { chatId } = await insertUserChat({ animalId })
router.push(`/area_logada/conversas/${chatId}`)
```

A UI passa a conhecer menos a estrutura interna da resposta, apenas recendo a resposta em si diretamente.

---

<br>

## SOLID — O (Open-Closed Principle/Princípio Aberto-Fechado)

Ausente: CreateUserService depende da classe concreta Encrypter, violando o princípio que permitiria mudar o comportamento do sistema, sem ter que modificá-lo.

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
