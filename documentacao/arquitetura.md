## 1. Estilo Arquitetural

O sistema Adote Fácil segue um **Monolito em camadas**:
- **Camada de Apresentação**: Next.js (páginas e componentes React)
- **Camada de API**: Express (routes e controllers)
- **Camada de Lógica de Negócio**: Services em Node.js
- **Camada de Persistência**: Prisma + PostgreSQL

## 2. Diagrama de Componentes

```mermaid
flowchart TD
  subgraph Frontend
    A[React Pages / Components] --> B[API Client (Axios)]
  end

  subgraph Backend
    B --> C[Express Controllers]
    C --> D[Services]
    D --> E[Prisma Client]
    E --> F[(PostgreSQL)]
  end

  **Legenda:**  
- **React Pages / Components**: UI e rotas do Next.js  
- **API Client**: abstrai chamadas HTTP ao backend  
- **Express Controllers / Routes**: definem endpoints REST  
- **Services**: contêm a lógica de negócio e regras de domínio  
- **Prisma Client**: ORM que mapeia modelos para consultas SQL  
- **PostgreSQL**: banco de dados relacional  