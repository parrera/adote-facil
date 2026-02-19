
  # 🏛️ Análise da Arquitetura - Adote Fácil (CSI410)

  ## 1. Visão Geral do Sistema
  O sistema **Adote Fácil** é uma plataforma web desenvolvida para facilitar a conexão entre adotantes e organizações de proteção animal. A solução permite a gestão de animais disponíveis e a visualização detalhada de informações para os usuários.

  A aplicação é composta por três pilares fundamentais:
  * **Frontend Web**: Interface de interação com o usuário.
  * **Backend**: Motor de regras de negócio e lógica da API.
  * **Banco de Dados**: Persistência de dados do ecossistema.

  ---

  ## 2. Tipo de Arquitetura
  A aplicação adota uma **Arquitetura Monolítica em Camadas**, estruturada sob o modelo **Cliente-Servidor**:

  * **Cliente (Frontend)**: Responsável pela apresentação e experiência do usuário.
  * **Servidor (Backend)**: Concentra as regras de negócio e comunica-se com a persistência.
  * **Persistência**: Camada de dados acessada exclusivamente pelo backend para garantir integridade.

  > **Justificativa**: Esta escolha foi feita para simplificar o desenvolvimento e a implantação.

  ---

  ## 3. Componentes Principais

  ### 🖥️ Frontend
  Aplicação web responsável pela interface gráfica, que se comunica com o backend através de requisições **HTTP/JSON**.

  ### ⚙️ Backend
  API encarregada de processar requisições e aplicar regras de negócio. Sua estrutura é dividida em camadas para garantir alta coesão:
  * **Controllers**: Gerenciam os endpoints e validam dados de entrada.
  * **Services**: Onde reside a lógica de negócio principal.
  * **Repositories**: Isolam a lógica de persistência utilizando o **Prisma ORM**.
  * **Providers/Middlewares**: Camada de segurança para autenticação **JWT** e criptografia.

  ### 🗄️ Banco de Dados
  Repositório central para armazenamento de dados de usuários, animais e organizações.

  ---

  ## 4. Fluxo Básico de Funcionamento
  1. O usuário acessa a plataforma via navegador.
  2. O **Frontend** dispara uma requisição HTTP para o **Backend**.
  3. O **Backend** processa a solicitação e executa as regras de negócio.
  4. O sistema interage com o **Banco de Dados** (leitura ou escrita) conforme necessário.
  5. O **Backend** devolve a resposta processada ao cliente.
  6. O **Frontend** reflete os novos dados na interface.

  ---

  ## 5. Diagrama da Arquitetura
  O detalhamento visual desta estrutura pode ser consultado no arquivo:
  `(./diagrama.png)`