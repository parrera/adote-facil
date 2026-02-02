1. Visão geral do sistema

O sistema Adote Fácil é uma plataforma web cujo objetivo é facilitar o processo de adoção de animais, conectando pessoas interessadas em adotar a organizações responsáveis pelo cuidado e divulgação dos animais. A aplicação permite a visualização de informações sobre os animais disponíveis, além de funcionalidades relacionadas ao gerenciamento da plataforma.

A solução é composta por um frontend web, um backend responsável pela lógica de negócio e uma base de dados para persistência das informações.

2. Tipo de arquitetura

A aplicação utiliza uma arquitetura monolítica em camadas, seguindo o modelo cliente-servidor.

- O frontend atua como cliente, sendo responsável pela interface com o usuário.
- O backend concentra a lógica de negócio, regras da aplicação e comunicação com o banco de dados.
- O banco de dados é acessado exclusivamente pelo backend.

Essa arquitetura foi escolhida por simplificar o desenvolvimento, implantação e manutenção do sistema, sendo adequada ao porte da aplicação e ao contexto acadêmico do projeto.

3. Componentes principais

Os principais componentes do sistema são:

- Frontend
Aplicação web responsável pela interface gráfica e interação com o usuário. Comunica-se com o backend via requisições HTTP.

- Backend
API responsável por processar as requisições do frontend, aplicar as regras de negócio e acessar o banco de dados.

- Banco de dados
Responsável por armazenar dados persistentes, como informações de usuários, animais e organizações.

- Docker / Docker Compose
Utilizado para orquestrar os serviços da aplicação, facilitando a implantação e padronizando o ambiente de execução.

4. Fluxo básico de funcionamento

1. O usuário acessa a aplicação pelo navegador.
2. O frontend envia uma requisição HTTP para o backend.
3. O backend processa a requisição, aplicando regras de negócio.
4. Caso necessário, o backend consulta ou altera dados no banco.
5. O backend retorna a resposta ao frontend.
6. O frontend atualiza a interface com base na resposta recebida.

5. Diagrama da arquitetura

graph TD
    Usuario[Usuário]
    Frontend[Frontend Web]
    Backend[Backend API]
    Banco[(Banco de Dados)]

    Usuario --> Frontend
    Frontend --> Backend
    Backend --> Banco