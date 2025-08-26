# Arquitetura de Software - Adote Fácil

## 1. Visão Geral

O sistema "Adote Fácil" é projetado como um **monolito modularizado**, com uma separação clara de responsabilidades entre o frontend e o backend. Essa abordagem permite que as duas partes do sistema sejam desenvolvidas, testadas e implantadas de forma independente, ao mesmo tempo que mantêm uma comunicação coesa através de uma API REST.

- **Frontend:** Uma aplicação web rica e interativa, construída com **Next.js (React)**, responsável por toda a apresentação e interação com o usuário.
- **Backend:** Um servidor **Node.js com Express**, que expõe uma API REST para o frontend. Ele encapsula toda a lógica de negócio, acesso a dados e regras da aplicação.
- **Banco de Dados:** Um banco de dados relacional **PostgreSQL**, que serve como a camada de persistência para os dados da aplicação.

## 2. Arquitetura Adotada

A arquitetura geral segue o padrão **Cliente-Servidor**. O frontend atua como cliente e o backend como servidor. Internamente, cada parte possui sua própria arquitetura bem definida.

### 2.1. Arquitetura do Backend (Node.js/Express)

O backend adota uma **Arquitetura em Camadas (Layered Architecture)** para organizar o código e separar as responsabilidades.

- **Camada de Apresentação (Controllers):** Localizada em `backend/src/controllers`, esta camada é a porta de entrada da API. Suas responsabilidades são:

  - Receber as requisições HTTP.
  - Validar e extrair os dados da requisição (parâmetros, corpo, cabeçalhos).
  - Invocar a camada de serviço apropriada.
  - Formatar e enviar a resposta HTTP (sucesso ou erro).

- **Camada de Serviço (Services):** Localizada em `backend/src/services`, esta camada contém a lógica de negócio central da aplicação. Suas responsabilidades são:

  - Orquestrar as operações e fluxos de trabalho.
  - Implementar as regras de negócio.
  - Coordenar a interação entre diferentes repositórios.
  - Garantir a consistência dos dados.

- **Camada de Acesso a Dados (Repositories):** Localizada em `backend/src/repositories`, esta camada abstrai a comunicação com o banco de dados, seguindo o padrão **Repository**. Suas responsabilidades são:
  - Implementar as operações de CRUD (Create, Read, Update, Delete).
  - Utilizar o **Prisma ORM** para mapear objetos para o banco de dados relacional.
  - Isolar o restante da aplicação dos detalhes de implementação do banco de dados.

### 2.2. Arquitetura do Frontend (Next.js)

O frontend utiliza uma **arquitetura baseada em componentes**, uma prática padrão em aplicações React.

- **Componentes (`src/components`):** Peças reutilizáveis da interface do usuário (botões, formulários, cards).
- **Páginas (`src/app`):** Estrutura de rotas da aplicação, onde cada arquivo corresponde a uma rota da URL. As páginas são responsáveis por compor os componentes para construir a interface completa de uma tela.
- **Serviços de API (`src/services`):** Funções responsáveis por fazer as chamadas HTTP para a API do backend, abstraindo a lógica de comunicação de rede dos componentes.
- **Contexto/Estado Global (`src/contexts`):** Utiliza a Context API do React para gerenciar o estado global da aplicação, como informações de autenticação do usuário.

## 3. Diagrama de Componentes

O diagrama abaixo ilustra a interação entre os principais componentes do sistema.

graph TD
    subgraph Frontend (Next.js)
        direction LR
        A[Interface do Usuário] --> B(Páginas e Componentes React)
        B --> C{Cliente API}
    end

    subgraph Backend (Node.js/Express)
        direction LR
        D[Rotas da API] --> E(Controllers)
        E --> F(Services)
        F --> G(Repositories / Prisma)
        G --> H((Banco de Dados PostgreSQL))
    end

    C --> D

    style Frontend fill:#f9f,stroke:#333,stroke-width:2px
    style Backend fill:#ccf,stroke:#333,stroke-width:2px

## 4. Fluxo de Dados

1.  O **usuário** interage com a **Interface do Usuário** no navegador.
2.  Uma **Página/Componente React** captura a ação e chama uma função do **Cliente API**.
3.  O **Cliente API** envia uma requisição HTTP para a **Rota da API** correspondente no backend.
4.  O **Controller** recebe a requisição, valida os dados e invoca o **Serviço** apropriado.
5.  O **Serviço** executa a lógica de negócio, utilizando um ou mais **Repositórios** para acessar o banco de dados.
6.  O **Repositório** utiliza o Prisma para executar a consulta no **Banco de Dados PostgreSQL**.
7.  Os dados retornam pelo mesmo caminho, com o **Controller** finalmente enviando uma resposta HTTP para o frontend.
8.  O **Frontend** atualiza a **Interface do Usuário** com os novos dados recebidos.
