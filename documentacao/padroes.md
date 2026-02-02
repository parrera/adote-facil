# 1. Análise dos Princípios SOLID

## 1.1 Single Responsibility Principle (SRP)

O princípio da responsabilidade única diz que uma classe ou módulo deve ter apenas um motivo para mudar. Em termos práticos, eu entendo como: cada parte do sistema deve fazer uma coisa principal e fazer bem.

No backend do Adote Fácil, dá pra perceber uma separação natural entre:

- **Controllers**: recebem a requisição HTTP e retornam a resposta  
- **Services**: ficam com as regras de negócio (o “coração” da aplicação)  
- **Repositories**: lidam com o acesso aos dados (ex.: Prisma/banco)  

Isso ajuda muito na manutenção, porque se eu mudar uma regra de negócio, geralmente eu mexo no service e não preciso alterar os controllers.

### Exemplo no código

```ts
import { Request, Response } from "express";
import { SeuService } from "../services/SeuService";

export class SeuController {
  private service = new SeuService();

  async listar(req: Request, res: Response) {
    const resultado = await this.service.listar();
    return res.json(resultado);
  }
}

1.2 Open/Closed Principle (OCP)

O princípio aberto/fechado diz que o código deve estar aberto para extensão, mas fechado para modificação. Na prática, isso significa que eu consigo adicionar novos comportamentos sem precisar sair alterando código que já funciona.

No projeto, isso aparece principalmente nos services, que concentram as regras. Assim, novas validações ou filtros podem ser adicionados ali sem mexer nos controllers.

### Exemplo no código

import { SeuRepository } from "../repositories/SeuRepository";

export class SeuService {
  private repository = new SeuRepository();

  async listar() {
    return this.repository.findAll();
  }
}

1.3 Liskov Substitution Principle (LSP)

O princípio da substituição de Liskov afirma que uma implementação pode ser substituída por outra sem quebrar o funcionamento do sistema, desde que mantenha o mesmo comportamento esperado.

Mesmo sem herança explícita no projeto, isso pode ser observado na forma como os services usam os repositories.

### Exemplo no código

import { PrismaClient } from "@prisma/client";

export class SeuRepository {
  private prisma = new PrismaClient();

  async findAll() {
    return this.prisma.seuModel.findMany();
  }
}

1.4 Interface Segregation Principle (ISP)

O princípio da segregação de interfaces diz que um módulo não deve ser obrigado a depender de métodos que não utiliza.

No backend, isso aparece quando os repositórios e services oferecem métodos pequenos e específicos, em vez de uma única classe com muitos métodos genéricos.

## Exemplo no código

async findById(id: string) {
  return this.prisma.seuModel.findUnique({
    where: { id }
  });
}

1.5 Dependency Inversion Principle (DIP)

O princípio da inversão de dependência diz que módulos de alto nível não devem depender diretamente de módulos de baixo nível.

No projeto, o fluxo geralmente é:

- Controller → Service
- Service → Repository
- Repository → Banco (Prisma)

## Exemplo no código

import { SeuService } from "../services/SeuService";

export class SeuController {
  private service = new SeuService();

  async listar(req, res) {
    const dados = await this.service.listar();
    return res.json(dados);
  }
}

2. Padrões de Projeto Identificados 

2.1 Repository Pattern

O Repository Pattern é usado para separar a lógica de acesso aos dados da lógica de negócio.

No projeto, o acesso ao Prisma fica concentrado nos repositórios, enquanto os services apenas chamam esses métodos

## Exemplo no código

import { PrismaClient } from "@prisma/client";

export class SeuRepository {
  private prisma = new PrismaClient();

  async findAll() {
    return this.prisma.seuModel.findMany();
  }

  async create(data) {
    return this.prisma.seuModel.create({ data });
  }
}

Benefícios percebidos:

- Services ficam mais limpos e focados em regra de negócio
- Facilita a criação de testes usando mocks
- Organização melhor do acesso ao banco

2.2 Model-View-Controller (MVC)

Mesmo sendo uma aplicação moderna, dá pra identificar um padrão MVC adaptado:

- Model: schema do Prisma e dados persistidos
- View: frontend (camada que o usuário vê)
- Controller: backend, recebendo requisições HTTP e chamando services

## Exemplo no código

Controller:
export class SeuController {
  async listar(req, res) {
    const dados = await this.service.listar();
    return res.json(dados);
  }
}

Model (Prisma Schema):
model SeuModel {
  id   String @id @default(uuid())
  nome String
}

Por que isso é MVC?

O controller faz a ponte entre a interface (frontend) e os dados (model), enquanto a view apenas consome a API e exibe as informações para o usuário.

3. Conclusão 

Na minha análise, o uso dos princípios SOLID e dos padrões de projeto como Repository e MVC ajuda principalmente a:

- Manter o código mais organizado
- Facilitar a manutenção quando novas regras surgem
- Tornar os testes mais simples (mockando repositórios e services)
- Reduzir o acoplamento entre as camadas

Isso é importante porque, conforme o sistema cresce, o código fica mais previsível e menos propenso a erros quando mudanças são necessárias.
