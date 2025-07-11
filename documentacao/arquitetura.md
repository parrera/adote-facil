## 1. Estilo Arquitetural

O sistema Adote Fácil segue um **Monolito em camadas**:
- **Camada de Apresentação**: Next.js (páginas e componentes React)
- **Camada de API**: Express (routes e controllers)
- **Camada de Lógica de Negócio**: Services em Node.js
- **Camada de Persistência**: Prisma + PostgreSQL

## 2. Diagrama de Componentes

graph TD
    subgraph "Frontend (Browser do Usuário)"
        A[<b>Páginas/Componentes React</b><br><i>Renderizados pelo Next.js</i>] -->|Requisição HTTP| B(<b>API Client</b><br><i>Axios</i>)
    end

    subgraph "Backend (Servidor Node.js)"
        B -->|REST (JSON)| C{<b>Controllers / Rotas</b><br><i>Express.js</i>}
        C -->|Chama o serviço| D[<b>Services</b><br><i>Lógica de Negócio</i>]
        D -->|Usa o ORM| E[<b>Prisma Client</b><br><i>Abstração do Banco</i>]
        E -->|Gera SQL| F[(<b>PostgreSQL</b><br><i>Banco de Dados</i>)]
    end

    U[Usuário] -->|Interage com a UI| A