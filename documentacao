# Análise Arquitetural do Sistema Adote Fácil

## 1. Visão Geral da Arquitetura

O sistema foi desenvolvido seguindo o estilo arquitetural **Cliente-Servidor (Client-Server)**, implementado em um repositório único (**Monorepo**).

* **Estilo:** Monólito Modular (o código está junto, mas separado logicamente em pastas distintas de *frontend* e *backend*).
* **Comunicação:** API REST (via HTTP/JSON).

---

## 2. Arquitetura do Backend 

O backend, localizado na pasta `/backend`, utiliza **Node.js** com **Express** e segue uma **Arquitetura em Camadas (Layered Architecture)**. Esta escolha promove a separação de responsabilidades (Princípio SRP do SOLID).

### Estrutura Detalhada das Camadas:

#### A. Camada de Apresentação 
* **Localização:** `src/controllers`
* **Organização:** Os controladores estão organizados por **domínio** (ex: `animal/`, `chat/`, `user/`), o que facilita a navegação e manutenção.
* **Responsabilidade:**
    * Receber a requisição HTTP (Request).
    * Extrair dados do corpo (`body`) ou parâmetros da URL.
    * Chamar a camada de serviço correspondente.
    * Retornar a resposta HTTP (Response) com o código de status adequado (200, 201, 400, etc.).

#### B. Camada de Regra de Negócio 
* **Localização:** `src/services`
* **Responsabilidade:**
    * Contém a lógica da aplicação.
    * Realiza validações de negócio.
    * Orquestra chamadas para o banco de dados.

#### C. Camada de Acesso a Dados 
* **Localização:** `src/repositories` e `prisma/`
* **Responsabilidade:**
    * Abstrair a comunicação com o banco de dados.
    * O projeto utiliza o **Padrão Repository**, isolando as queries do ORM.
    * O **Prisma ORM** é utilizado para mapear os modelos (tabelas) e executar as operações no banco **PostgreSQL**.

#### D. Componentes Transversais
* **Middlewares (`src/middlewares`):** Interceptam requisições para validação de token, tratamento de erros globais ou logs.
* **Providers (`src/providers`):** Implementações de serviços externos ou utilitários complexos.
* **Config (`src/config`):** Gerenciamento de variáveis de ambiente e configurações globais.

---

## 3. Arquitetura do Frontend 

O frontend, localizado na pasta `/frontend`, é construído com **Next.js**.

### Estrutura Principal:
* **API Client (`src/api`):** Centraliza as chamadas HTTP para o backend.
* **Gerenciamento de Estado (`src/contexts`):** Utiliza a Context API do React para compartilhar estados globais entre componentes sem precisar passar propriedades manualmente.

---

## 4. Diagrama de Componentes

```mermaid
graph TD

%% ===== Elementos Externos =====
Front[Frontend (Next.js)]
API[HTTP API]
DB[(PostgreSQL)]

%% ===== Backend =====
subgraph Backend Application (Node.js)

    Router[Router (Express)]
    Auth[Auth Middleware]

    %% Presentation Layer
    subgraph Presentation Layer
        UserController[User Controller]
        AnimalController[Animal Controller]
    end

    %% Business Layer
    subgraph Business Logic Layer
        UserService[User Service]
        AnimalService[Animal Service]
        AuthService[Auth Service]
    end

    %% Data Layer
    subgraph Data Access Layer
        UserRepo[User Repository]
        AnimalRepo[Animal Repository]
    end

    Prisma[Prisma ORM]

end

%% ===== Relacionamentos =====
Front -->|Usa| API
API --> Router

Router -->|Protege Rotas| Auth
Router -->|Encaminha Requisição| UserController
Router -->|Encaminha Requisição| AnimalController

UserController -->|Regra de Negócio| UserService
UserController -->|Login/Cadastro| AuthService
AnimalController -->|Regra de Negócio| AnimalService

UserService -->|Persistência| UserRepo
AnimalService -->|Persistência| AnimalRepo

UserRepo -->|Query| Prisma
AnimalRepo -->|Query| Prisma

Prisma -->|TCP/IP (SQL)| DB
```
