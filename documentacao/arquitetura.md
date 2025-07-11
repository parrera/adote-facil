# Arquitetura do Sistema - Adote Fácil

## 1. Estilo Arquitetural

O sistema Adote Fácil segue um **Monolito em camadas**, uma abordagem que promove uma clara separação de responsabilidades, facilitando o desenvolvimento e a manutenção.

-   **Camada de Apresentação**: Next.js (páginas e componentes React)
-   **Camada de API**: Express (routes e controllers)
-   **Camada de Lógica de Negócio**: Services em Node.js
-   **Camada de Persistência**: Prisma + PostgreSQL

---

## 2. Diagrama de Componentes

O diagrama a seguir ilustra o fluxo de uma requisição através das camadas do sistema.

flowchart TD
    A --> B
    subgraph Frontend
        B --> C
    end

    subgraph Backend
        C --> D
    end