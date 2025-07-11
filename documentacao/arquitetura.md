## 1. Estilo Arquitetural

O sistema Adote Fácil segue um **Monolito em camadas**:
- **Camada de Apresentação**: Next.js (páginas e componentes React)
- **Camada de API**: Express (routes e controllers)
- **Camada de Lógica de Negócio**: Services em Node.js
- **Camada de Persistência**: Prisma + PostgreSQL

## 2. Diagrama de Componentes

```mermaid
flowchart TD
U[Browser] -->|HTTP/HTTPS| A[React Pages / Components]
subgraph Frontend
  A -->|HTTP/HTTPS| B[API Client (Axios)]
end
subgraph Backend
  B -->|REST JSON| C[Express Controllers / Routes]
  C -->|invocação de serviços| D[Services]
  D -->|chamada ORM| E[Prisma Client]
  E -->|SQL| F[(PostgreSQL)]
end