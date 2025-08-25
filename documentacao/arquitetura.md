# Arquitetura de Software - Adote Fácil

Arquitetura de Software - Adote Fácil

1. Visão Geral

A plataforma "Adote Fácil" foi estruturada como um monolito modular, onde as responsabilidades do frontend e do backend são bem delimitadas. Essa abordagem permite que ambas as partes do sistema evoluam de forma independente, mantendo uma comunicação coesa através de uma API REST.

    Frontend: Uma aplicação web moderna e interativa construída com Next.js (React), focada em entregar a melhor experiência ao usuário.

    Backend: Um servidor robusto em Node.js com Express, responsável por expor a API REST. Ele centraliza toda a lógica de negócio, acesso aos dados e regras da aplicação.

    Banco de Dados: Um banco de dados relacional PostgreSQL, atuando como a camada de persistência confiável para todas as informações do sistema.

2. Arquitetura Adotada

A estrutura geral do sistema segue o modelo Cliente-Servidor. O frontend opera como o cliente, enquanto o backend funciona como o servidor. Cada uma dessas partes, por sua vez, possui uma arquitetura interna própria e bem estruturada.

2.1. Arquitetura do Backend (Node.js/Express)

Para o backend, foi adotada uma Arquitetura em Camadas (Layered Architecture), que organiza o código de forma lógica e separa as diferentes responsabilidades do sistema.

    Camada de Apresentação (Controllers): Localizada em backend/src/controllers, é a porta de entrada da API. Suas funções são:

        Receber e interpretar as requisições HTTP.

        Validar os dados recebidos (corpo, parâmetros, etc.).

        Chamar a camada de serviço correspondente à requisição.

        Preparar e enviar a resposta HTTP de volta ao cliente.

    Camada de Serviço (Services): Em backend/src/services, esta camada abriga o coração da lógica de negócio. Suas funções são:

        Orquestrar as operações e os fluxos de trabalho da aplicação.

        Implementar as regras de negócio específicas de cada funcionalidade.

        Garantir a integridade e consistência dos dados ao interagir com os repositórios.

    Camada de Acesso a Dados (Repositories): Em backend/src/repositories, esta camada abstrai a comunicação com o banco de dados. Suas funções são:

        Executar as operações de CRUD (Create, Read, Update, Delete).

        Utilizar o Prisma ORM como ferramenta para mapear objetos e interagir com o banco de dados.

        Isolar o restante do sistema dos detalhes de implementação da persistência.

2.2. Arquitetura do Frontend (Next.js)

A interface do usuário (frontend) foi desenvolvida com uma arquitetura baseada em componentes, seguindo as melhores práticas do ecossistema React.

    Componentes (src/components): Elementos de UI reutilizáveis (botões, cards, inputs) que podem ser combinados para construir telas complexas.

    Páginas (src/app): Define a estrutura de rotas da aplicação. Cada página compõe diferentes componentes para formar uma tela completa.

    Serviços de API (src/services): Centraliza as chamadas HTTP para o backend, mantendo a lógica de comunicação com a API separada da lógica de apresentação.

    Contexto/Estado Global (src/contexts): Usa a Context API do React para gerenciar estados que precisam ser compartilhados por toda a aplicação, como os dados do usuário autenticado.
