# Análise e Sugestões DevOps

## 1. Refatoração do Docker Compose (`docker-compose.yml`)

As seguintes alterações foram implementadas:

* **Remoção de script de espera:** O serviço `adote-facil-backend` utilizava um script manual, como `command: sh -c "until nc -z..."` para aguardar o banco de dados. Removemos isso, pois o banco já possui um `healthcheck` configurado e o backend utiliza a diretiva nativa `depends_on: condition: service_healthy`, o que torna a espera via script redundante e ineficiente.
* **Injeção Explícita de Variáveis de Ambiente:** Adicionamos a diretiva `env_file` nos serviços `adote-facil-backend` e `adote-facil-frontend`. É uma boa prática que o orquestrador de contêineres seja o responsável por injetar as variáveis de ambiente, garantindo que o contêiner seja agnóstico ao ambiente em que roda.
* **Políticas de Resiliência:** Implementamos a política `restart: unless-stopped` em todos os serviços. Isso garante alta disponibilidade, reiniciando os contêineres automaticamente em caso de falhas ou reinicialização do host.

## 2. Otimização do Dockerfile do Backend (`backend/Dockerfile`)

O Dockerfile original do backend apresentava alguns anti-padrões de CI/CD e empacotamento. As seguintes melhorias foram aplicadas:

* **Remoção da execução de testes na build:** A instrução `RUN npm run test` foi removida. A responsabilidade de executar testes e barrar código quebrado pertence à esteira de Integração Contínua (CI), e não ao artefato de build. Isso reduz o tempo de empacotamento e separa as responsabilidades.
* **Uso de Instalação Determinística:** Substituição do `npm install` por `npm ci`. Isso garante que o Docker instale exatamente as versões das dependências "lockadas" no `package-lock.json`, evitando quebra de builds por atualizações inesperadas de pacotes.
* **Limpeza de dependências de desenvolvimento:** Adição do comando `RUN npm prune --production` após a etapa de compilação. Isso remove da imagem final bibliotecas usadas apenas em tempo de desenvolvimento, reduzindo o tamanho do contêiner.

## 3. Otimização do Dockerfile do Frontend (`frontend/Dockerfile`)

o Dockerfile do frontend foi otimizado para produção:

* **Instalação Determinística:** Substituição de `npm install` por `npm ci` para garantir reprodutibilidade das builds.

Adição do comando `RUN npm prune --production` logo após o passo de build. Removê-las da imagem final reduz drasticamente o peso do contêiner e melhora a segurança e o tempo de deploy.


## 4. Melhorias no Pipeline de CI/CD (`.github/workflows/experimento-ci-cd.yml`)

* **Controle de Versão do Ambiente:** Inclusão do passo `actions/setup-node@v4` para fixar a versão do Node.js (v20), evitando incompatibilidades entre o ambiente do runner e o contêiner de produção.
* **Correção de Contexto de Execução:** O diretório de trabalho (working directory) dos jobs de integração foi ajustado para a raiz do repositório, refletindo a nova localização do `docker-compose.yml`. A injeção de variáveis `.env` também foi corrigida para abastecer ambos os serviços (backend e frontend).
* **Espera Inteligente de Contêineres:** Remoção do anti-padrão de temporização manual `sleep 10` no job de testes de integração. Foi implementada a flag `--wait` no `docker compose up`, que aproveita os `healthchecks` nativos dos serviços para sincronizar o pipeline e evitar flaky tests.