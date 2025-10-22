# Princípios e padrões de projeto

## 1.Análise SOLID do Frontend

Embora o código demonstre boas práticas de componentização e reuso como `Button`, `DefaultDialog`, `PasswordInput`, ele viola, dois princípios-chave:

1.  **Princípio da Responsabilidade Única (SRP):** Os componentes de formulário e de card estão sobrecarregados com responsabilidades (GUI, estado, lógica de negócios, chamadas API).
2.  **Princípio da Inversão de Dependência (DIP):** Os componentes de alto nível (GUI) dependem diretamente de implementações de baixo nível (serviços API e `getCookie`), em vez de dependerem de abstrações.

---

### 1.1.(S) Princípio da Responsabilidade Única (SRP)

*O princípio afirma que um componente (ou classe) deve ter apenas um motivo para mudar.*

#### Violações (Componentes "Gordos")

Componentes `AnimalRegisterForm.tsx`, `AnimalCard.tsx`, `Chat.tsx` e `UpdateUserInfoForm.tsx`. Eles acumulam múltiplas responsabilidades que deveriam ser separadas.

1.  **Apresentação (UI):** Renderizar o JSX e o layout.
2.  **Gerenciamento de Estado de UI:** Controlar estados locais (ex: `maxPicsWarningModalOpen`, `displayPasswordFields`, `inputType`).
3.  **Lógica de Negócio/Submissão:** Lidar com a lógica `onSubmit` ou cliques de botão (`handleSendMessage`, `handleConfirmAnimalAdoption`).
4.  **Comunicação com API:** Importar e chamar diretamente funções de API (ex: `animalRegister`, `updateAnimalStatus`, `getUserChat`, `sendChatMessage`).
5.  **Gerenciamento de Autenticação:** Obter o token diretamente com `getCookie`.
6.  **Efeitos Colaterais:** Disparar `alert()` e redirecionamentos (`window.location.href` ou `window.location.reload()`).

#### Exemplos Corretos

* `PasswordInput.tsx`: Responsável apenas por ser um input de senha com toggle de visibilidade.
* `Button.tsx`: Responsável apenas por ser um botão estilizado.
* `DefaultDialog.tsx`: Responsável apenas por fornecer o layout de um modal.
* `EmptyAnimals.tsx`: Responsável apenas por exibir um estado vazio.

### 1.2.(O) Princípio Aberto/Fechado (OCP)

*O princípio afirma que os componentes devem ser abertos para extensão, mas fechados para modificação.*

#### Exemplos Corretos

* `DefaultDialog.tsx`: Usa a prop `children`, permitindo que qualquer conteúdo seja "estendido" dentro dele sem modificá-lo.
* `Button.tsx`: Aceita `buttonStyle` e repassa `{...props}`, permitindo fácil extensão de estilo e atributos HTML.

### 1.3.(L) Princípio da Substituição de Liskov (LSP)

*Este princípio é mais aplicável à herança, mas em React, pode ser pensado em termos de conformidade de props.*

#### Exemplos Corretos

* O código segue boas práticas, como o componente `Button` que estende `React.ButtonHTMLAttributes`, permitindo que ele seja "substituído" por um `<button>` nativo em termos de props.

### 1.4.(I) Princípio da Segregação de Interface (ISP)

*O princípio afirma que nenhum cliente deve ser forçado a depender de interfaces (props) que não utiliza.*
 
#### Violações

* `AnimalCard.tsx`: A prop `animal` contém `description` e `race`, não utilizadas.
* `Chat.tsx`: Recebe o `userData: UserData | null` completo, mas parece usar apenas `userData.id` e `userData.name`.

### 1.5.(D) Princípio da Inversão de Dependência (DIP)

*O princípio afirma que módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações.*

#### Exemplos Corretos

* `AnimalFilterForm.tsx`: Este componente aplica corretamente o DIP. Ele não sabe o que acontece com os dados do filtro; ele apenas invoca a função `handleFilterAvailableAnimals` que recebe via props.

#### Violações

* `AnimalRegisterForm.tsx` depende diretamente de `getCookie` e `animalRegister`.
* `AnimalCard.tsx` depende diretamente de `getCookie` e `updateAnimalStatus`.
* `Chat.tsx` depende diretamente de `getCookie`, `getUserChat`, e `sendChatMessage`.
* `UpdateUserInfoForm.tsx` depende diretamente de `getCookie` e `updateUser`.

---

## 2. Análise SOLID do Backend


O backend demonstra uma boa adesão aos princípios SOLID. A arquitetura está claramente dividida em três camadas que utilizam Injeção de Dependência:

1.  **Serviços:** Contêm a lógica de negócios e orquestram os casos de uso (`CreateUserService`, `UserLoginService`).
2.  **Repositórios:** Abstraem o acesso aos dados (Prisma) para cada entidade (`AnimalRepository`, `UserRepository`, `ChatRepository`).
3.  **Provedores:** Classes de utilidade para preocupações transversais (`Encrypter`, `Authenticator`).

### 2.1.(S) Princípio da Responsabilidade Única (SRP)

*Cada classe tem uma responsabilidade única e bem definida.*

### 2.2.(O) Princípio Aberto/Fechado (OCP)

*O uso de Injeção de Dependência torna o sistema aberto a extensões.*

### 2.3.(L) Princípio da Substituição de Liskov (LSP)

**Não Aplicável**

*O código favorece a composição (via Injeção de Dependência) em vez da herança de classes, que é onde o LSP se aplica.*

### 2.4.(I) Princípio da Segregação de Interface (ISP)

*As classes e DTOs são granulares e específicas para seus casos de uso. Um serviço como `UpdateUserService` depende do `Encrypter` e do `UserRepository`, mas não é forçado a depender de outros repositórios que não precisa.*

### 2.5.(D) Princípio da Inversão de Dependência (DIP)

*Módulos de alto nível não dependem de módulos de baixo nível. Ambos dependem de abstrações (as classes). As dependências são injetadas via construtor em todos os Serviços e Middlewares*

---

## 3 Padrões e Princípios Encontrados

*Com base nos arquivos fornecidos, identificamos padrões de projeto que já estão em uso e outros que poderiam ser aplicados.*

### 3.1.Padrão Singleton (Aplicado no Backend)

*O padrão Singleton garante que uma classe tenha apenas uma instância e fornece um ponto de acesso global. Usado extensivamente no backend para gerenciar recursos compartilhados, como a conexão com o banco de dados e as instâncias de serviços e repositórios, evitando múltiplas conexões e instanciamentos desnecessários.*

*A instância do `PrismaClient` é criada uma vez no arquivo `database.ts` e depois exportada para ser usada em toda a aplicação.*

```
// File: database.ts
import { PrismaClient } from '@prisma/client'

// A instância única é criada e exportada
export const prisma = new PrismaClient()
```

Exemplo de uso:

```
// File: user.ts
import { PrismaClient } from '@prisma/client'
// A instância Singleton do 'prisma' é importada
import { prisma } from '../database.js'
import { CreateUserRepositoryDTO, UpdateUserRepositoryDTO } from './user.dto.js'

export class UserRepository {
  // A instância é recebida (via injeção)
  constructor(private readonly repository: PrismaClient) {}

  async findByEmail(email: string) {
    // A instância Singleton é usada para a consulta
    return this.repository.user.findUnique({ where: { email } })
  }
  // ...
}

// A própria instância do repositório é exportada como um Singleton
export const userRepositoryInstance = new UserRepository(prisma)
```

### 3.2.Padrão Strategy (Aplicado no Backend)

*No backend, a arquitetura de Injeção de Dependência (DI) permite uma implementação clara desse padrão. A classe `Encrypter` é uma Strategy para criptografia, e serviços como `UserLoginService` são o Contexto que a utiliza.*

Exemplo de Código I:

*`UserLoginService` não sabe como a senha é comparada, ele apenas sabe que deve chamar o método `.compare()` da Strategy `Encrypter` que lhe foi injetada.*
	
```
// File: user-login.ts
import {
  Authenticator,
  authenticatorInstance,
} from '../../providers/authenticator.js'
// A abstração da Strategy é importada
import { Encrypter, encrypterInstance } from '../../providers/encrypter.js'
import {
  UserRepository,
  userRepositoryInstance,
} from '../../repositories/user.js'
// ...

export class UserLoginService {
  constructor(
    private readonly userRepository: UserRepository,
    // A Strategy é injetada no construtor
    private readonly encrypter: Encrypter,
    private readonly authenticator: Authenticator,
  ) {}

  async execute(params: UserLoginDTO.Params): Promise<UserLoginDTO.Result> {
    // ...
    const user = await this.userRepository.findByEmail(email)
    // ...
    // O Contexto usa a Strategy sem saber a implementação interna
    const isValidPassword = this.encrypter.compare(password, user.password)
    // ...
  }
}
```

Exemplo de Código II:

*O arquivo `encrypter.ts` define a Strategy concreta, que neste caso utiliza `bcrypt` para criptografia e comparação.*

```
// File: encrypter.ts (Strategy Concreta 1: Bcrypt)
import bcrypt from 'bcrypt'

export class Encrypter {
  encrypt(value: string): string {
    return bcrypt.hashSync(value, 10)
  }

  compare(value: string, hash: string): boolean {
    return bcrypt.compareSync(value, hash)
  }
}

export const encrypterInstance = new Encrypter()
```

### 3.3.Padrão Facade (Aplicado no Backend)

*O padrão Facade fornece uma interface unificada e simplificada para um conjunto complexo de interfaces ou subsistemas. Os Serviços do backend ocultam a complexidade de coordenar múltiplos repositórios ou lógicas de negócios por trás de um único método.*

Exemplo de Código:
	
	*O `CreateAnimalService` atua como uma Fachada. O cliente só precisa chamar `execute`. O serviço esconde a complexidade de ter que:

	1. Criar o animal no banco.
	2. Iterar sobre as fotos e salvá-las uma a uma no banco.

### 3.4.Padrão Chain of Responsibility (Aplicado no Backend)

*O sistema de middleware do Express é uma implementação direta do padrão Chain of Responsibility.*

### 3.5.Padrão Factory Method (Aplicado no Frontend)

*Define uma interface para criar um objeto, mas deixa as subclasses decidirem qual classe instanciar. Em React é um componente que usa Renderização Condicional para fabricar diferentes saídas com base em props.*

Exemplo de Código:

```
// File: AnimalCard.tsx
// ...
import { Button } from '@/components/Button'
import * as S from './AnimalCard.styles'
import Link from 'next/link'
// ...

export function AnimalCard({ animal, listType }: AnimalCardProps) {
  // ...
  return (
    <S.Wrapper>
      <S.Content>
        <S.AnimalInfo>
        </S.AnimalInfo>
        {listType === 'my-animals' ? (
          // "Produto" A: Botões de Gerenciamento
          <S.MyAnimalsButtonsWrapper>
            <Button type="button" onClick={handleConfirmAnimalAdoption}>
              Confirmar adoção
            </Button>
            <S.MyAnimalsButton
              type="button"
              $buttonType="delete"
              onClick={handleRemoveAnimal}
            >
              <Trash size={24} />
            </S.MyAnimalsButton>
          </S.MyAnimalsButtonsWrapper>
        ) : (
          // "Produto" B: Botão de Saiba Mais
          <Link href={`/area_logada/animais_disponiveis/${id}`}>
            <Button>Saiba mais</Button>
          </Link>
        )}
      </S.Content>
    </S.Wrapper>
  )
}
```

### 3.6.Padrão State (Aplicado no Frontend)

*Permite que um objeto altere seu comportamento quando seu estado interno muda.*

Exemplo de Código:

*O `PasswordInput` tem dois comportamentos de renderização que dependem diretamente do seu estado interno `inputType`.*
	
```
// File: PasswordInput.tsx
import { Eye, EyeSlash } from '@phosphor-icons/react'
import { useState } from 'react' // Importa o hook de estado
// ...

export function PasswordInput<T extends FieldValues>({
  fieldName,
  zodRegister,
}: InputProps<T>) {
  // O estado interno que define o comportamento
  const [inputType, setInputType] = useState('password') //

  // A ação que transiciona o estado
  const handleChangeInputType = () => {
    setInputType(inputType === 'password' ? 'text' : 'password') //
  }

  return (
    <S.Wrapper>
      <input type={inputType} {...zodRegister(fieldName)} /> {/* */}
      
      <button type="button" onClick={handleChangeInputType}>
        {inputType === 'password' ? <Eye /> : <EyeSlash />} {/* */}
      </button>
    </S.Wrapper>
  )
}
```

## 4 Padrões e Princípios Sugeridos

### 4.1.Custom Hook para Frontend (Crítico)

*Uma abordagem do React para encapsular e reutilizar lógica de estado e efeitos colaterais, resolvendo diretamente o problema dos "fat components".*

*A lógica de `handleConfirmAnimalAdoption` e `handleRemoveAnimal` pode ser extraída para um hook `useAnimalActions`.*
	
Exemplo Antes:

```
// File: AnimalCard.tsx
import { updateAnimalStatus } from '@/api/update-animal-status'
import { getCookie } from 'cookies-next'
// ...

export function AnimalCard({ animal, listType }: AnimalCardProps) {
  const { id } = animal

  const handleConfirmAnimalAdoption = async () => {
    try {
      const token = getCookie('token') // Lógica de auth
      const response = await updateAnimalStatus({ // Chamada de API
        animalId: id,
        data: { status: AnimalStatus.ADOPTED },
        token: token || '',
      })

      if (response.status === 200) {
        alert('Confirmada a adoção do animal!') // Efeito colateral (UI)
        window.location.href = '/area_logada/meus_animais' // Efeito colateral (Navegação)
      } 
      // ... (tratamento de erro)
    } catch (err) {
      // ... (tratamento de erro)
    }
  }

  const handleRemoveAnimal = async () => {
    // ... (lógica similar)
  }

  return (
    <S.Wrapper>
      {/* ... */}
      {listType === 'my-animals' ? (
        <S.MyAnimalsButtonsWrapper>
          <Button type="button" onClick={handleConfirmAnimalAdoption}> {/* Acoplado */}
            Confirmar adoção
          </Button>
          <Button type="button" onClick={handleRemoveAnimal}> {/* Acoplado */}
            <Trash size={24} />
          </Button>
        </S.MyAnimalsButtonsWrapper>
      ) : (
        {/* ... */}
      )}
    </S.Wrapper>
  )
}
```

Exemplo de sugestão:

1. Criar um hook
```
import { updateAnimalStatus } from '@/api/update-animal-status'
import { getCookie } from 'cookies-next'
import { AnimalStatus } from '@/enums/animal-status'
import { useState } from 'react'

export function useAnimalActions() {
  const [isLoading, setIsLoading] = useState(false)

  // O hook encapsula a lógica
  const confirmAdoption = async (animalId: string) => {
    setIsLoading(true)
    try {
      const token = getCookie('token')
      const response = await updateAnimalStatus({
        animalId,
        data: { status: AnimalStatus.ADOPTED },
        token: token || '',
      })

      if (response.status === 200) {
        alert('Confirmada a adoção do animal!')
        window.location.href = '/area_logada/meus_animais'
      } else {
        alert(response.data.message || 'Erro ao confirmar adoção.')
      }
    } catch (err) {
      alert((err as Error).message || 'Erro ao confirmar adoção.')
    } finally {
      setIsLoading(false)
    }
  }

  const removeAnimal = async (animalId: string) => {
    // ... (lógica similar)
  }

  // O hook expõe uma API para o componente
  return { confirmAdoption, removeAnimal, isLoading }
}
```

2. Refatorar
	
```
// File: AnimalCard.tsx (Refatorado)
// ...
import { useAnimalActions } from '@/hooks/useAnimalActions' // Importa o hook

export function AnimalCard({ animal, listType }: AnimalCardProps) {
  const { id } = animal
  // O componente agora consome o hook, delegando a lógica
  const { confirmAdoption, removeAnimal, isLoading } = useAnimalActions()

  return (
    <S.Wrapper>
      {/* ... */}
      {listType === 'my-animals' ? (
        <S.MyAnimalsButtonsWrapper>
          <Button 
            type="button" 
            onClick={() => confirmAdoption(id)} // Chama a função do hook
            disabled={isLoading}
          >
            Confirmar adoção
          </Button>
          <Button 
            type="button" 
            onClick={() => removeAnimal(id)} // Chama a função do hook
            disabled={isLoading}
          >
            <Trash size={24} />
          </Button>
        </S.MyAnimalsButtonsWrapper>
      ) : (
        {/* ... */}
      )}
    </S.Wrapper>
  )
}
```

### 4.1.Padrão IoC Container para Backend (Boa prática)

*Atualmente, o backend é sólido e segue os princípios SOLID, inclusive já utilizando o padrão IoC. Entretanto, usa Injeção de Dependência manual, criando manualmente cada instância e a injetando no construtor de outra. Isto afeta a escalabilidade do projeto.*
	
*Escalar o projeto faz com que gerenciar e manter controle sobre a ordem de instanciação torne-se  um processo complexo e propenso a erro humano.*
	
Exemplo Antes:
```
// File: create-user.ts
import {
  UserRepository,
  userRepositoryInstance, // Importação manual da instância
} from '../../repositories/user.js'
import { Encrypter, encrypterInstance } from '../../providers/encrypter.js' // Importação manual da instância

export class CreateUserService {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly userRepository: UserRepository,
  ) {}
  
  // lógica do execute
}

// Instanciação e injeção feitas manualmente
export const createUserServiceInstance = new CreateUserService(
  encrypterInstance,
  userRepositoryInstance,
)
```

Exemplo de sugestão:

1. Registrar dependências
```
// File: user.ts
import { injectable, singleton } from 'tsyringe'
// ...

@singleton() // Diz ao container que esta classe é um Singleton
export class UserRepository {
  // ...
}

// File: encrypter.ts
import { injectable, singleton } from 'tsyringe'
// ...

@singleton() // Diz ao container que esta classe é um Singleton
export class Encrypter {
  // ...
}
```

2. Declarar na classe
```
// File: create-user.ts
import { injectable } from 'tsyringe'
import { UserRepository } from '../../repositories/user.js'
import { Encrypter } from '../../providers/encrypter.js'

@injectable() // Diz ao container que esta classe pode ser injetada
export class CreateUserService {
  // O container de IoC lerá isso e injetará as instâncias Singleton
  constructor(
    private readonly encrypter: Encrypter,
    private readonly userRepository: UserRepository,
  ) {}

  // lógica do execute
}
```

3. Resolver a dependência
```
// File: create-user-controller.ts
import { container } from 'tsyringe'
import { CreateUserService } from '../services/create-user.js'

// ...
class CreateUserController {
  handle(req, res) {
    // O container resolve o gráfico de dependências automaticamente
    // Ele vê que CreateUserService precisa de Encrypter e UserRepository
    // Ele encontra as instâncias Singleton registradas e as injeta.
    const createUserService = container.resolve(CreateUserService)
    
    // chama createUserService.execute
  }
}
```
	
📦 Responsável pela Análise: Jonas Kretli
📅 Etapa 3 – Análise dos Princípios e Padrões de Projeto
🔗 Entrega: Pull Request 2 para o repositório original