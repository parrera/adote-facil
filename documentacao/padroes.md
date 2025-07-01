# Princípios e padrões de projeto
O projeto "Adote Fácil" demonstra a aplicação de alguns princípios SOLID e padrões de projeto em sua estrutura, com oportunidades de aprimoramento em outros.

## Princípios SOLID:
- **Princípio da Responsabilidade Única** é bem aplicado no projeto. A organização do backend em arquivos distintos para rotas, aplicação e banco de dados mostra a separação de responsabilidades. Os Controllers são responsáveis por lidar com requisições HTTP e roteamento, os Services contêm a lógica de negócio principal, e os Repositories se encarregam da interação com o banco de dados. Os Providers (como Encrypter e Authenticator) encapsulam funcionalidades específicas e bem definidas.
```typescript
    class CreateUserController {
      constructor(private readonly createUser: CreateUserService) {}

      async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;
        try {
          const result = await this.createUser.execute({ name, email, password }); // Delega para o serviço
          const statusCode = result.isFailure() ? 400 : 201;
          return response.status(statusCode).json(result.value);
        } catch (err) {
          const error = err as Error;
          console.log({ error });
          return response.status(500).json({ error: error.message });
        }
      }
    }
```

- **Princípio Aberto/Fechado**, que estabelece que entidades de software devem ser abertas para extensão, mas fechadas para modificação, apresenta uma oportunidade de melhoria. Embora o projeto utilize injeção de dependências via construtores, as dependências são de classes concretas (ex: CreateUserService depende diretamente de UserRepository e Encrypter). Para aderir plenamente ao Princípio Aberto/Fechado, seriam necessárias interfaces (ex: IUserRepository, IEncrypter) que as classes concretas implementaríam. Isso permitiria trocar implementações (ex: um MockUserRepository para testes) sem modificar o código do serviço.
```typescript
    // adote-facil/backend/src/services/user/create-user.ts
    export class CreateUserService {
      constructor(
        private readonly encrypter: Encrypter,
        private readonly userRepository: UserRepository, // Se este fosse uma interface, seria mais aberto para extensão
      ) {}
    }
```
<br>

- **Princípio da Substituição de Liskov**, que afirma que objetos de um tipo base devem poder ser substituídos por objetos de um subtipo sem quebrar o sistema, é aplicado de forma implícita e funcional. O uso da classe Either (Failure ou Success) é um exemplo funcional que se alinha ao Princípio da Substituição de Liskov. Os consumidores do Result podem chamar .isFailure() ou .isSuccess() de forma consistente, independentemente de qual subtipo (Failure ou Success) foi retornado, garantindo que o comportamento esperado seja mantido.
```typescript
    // adote-facil/backend/src/controllers/user/create-user.ts
    try {
      const result = await this.createUser.execute({ name, email, password });
      const statusCode = result.isFailure() ? 400 : 201; // Consistência na verificação do resultado
      return response.status(statusCode).json(result.value);
    } // ...
```

- **Princípio da Segregação da Interface**, que prega que clientes não devem ser forçados a depender de interfaces que não utilizam, é aplicado. As DTOs (Data Transfer Objects) e a forma como as classes são estruturadas no backend sugerem aderência a este princípio. As interfaces de dados (tipos TypeScript) são específicas para as necessidades de cada operação, evitando que módulos dependam de partes de uma interface que não lhes são relevantes.

- **Princípio da Inversão de Dependência**, módulos de alto nível não devem depender de módulos de baixo nível; ambos devem depender de abstrações.
Ausência (Oportunidade de Melhoria): Assim como no Princípio Aberto/Fechado, o projeto utiliza injeção de dependência via construtores, mas as dependências são de implementações concretas (ex: new CreateUserService(encrypterInstance, userRepositoryInstance) ). Para uma aplicação mais estrita do Princípio da Inversão de Dependência, as dependências deveriam ser injetadas como abstrações (interfaces), e as classes de alto nível não teriam conhecimento direto das implementações de baixo nível.


## Padrões de Projeto:
- **Singleton:** O projeto implementa o padrão Singleton para garantir que haja apenas uma instância de classes específicas e para fornecer um ponto de acesso global a essa instância, o que é comum para recursos compartilhados e que necessitam de controle centralizado.
 ```typescript
            // adote-facil/backend/src/database.ts
            import { PrismaClient } from '@prisma/client';
            export const prisma = new PrismaClient(); // Instância única do PrismaClient
```

- **Factory:** é aplicável no projeto. Embora não explicitamente implementado, ele poderia ser usado para criar instâncias de serviços ou repositórios com base em configurações ou em lógicas de criação mais complexas. Isso abstrai o processo de instanciação, tornando o sistema mais flexível.

- **Strategy:** também é aplicável. A função makeRequest no frontend demonstra um uso análogo a este padrão. Ela define uma estrutura comum para realizar requisições HTTP, e a "estratégia" específica da requisição (método GET, POST, PUT, DELETE, PATCH) é passada como um parâmetro. Isso permite que o comportamento da requisição varie sem modificar a implementação central da função.
```typescript
        // adote-facil/frontend/src/api/index.ts
        import axios, { AxiosError } from 'axios';

        const api = axios.create();

        export async function makeRequest({
          url,
          method, // O parâmetro 'method' atua como a "estratégia" selecionada
          data,
          headers,
        }: {
          url: string;
          method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; // Diferentes estratégias de método HTTP
          data?: object;
          headers?: object;
        }) {
          try {
            const response = await api.request({
              url,
              method, // A estratégia é aplicada aqui
              headers,
              data,
            });

            return response;
          } catch (err) {
            const error = err as AxiosError;

            if (error.response) {
              return { status: error.response.status, data: error.response.data };
            }

            return { status: 500, data: { message: error.message } };
          }
        }
```
