# Documentação de DevOps e CI/CD - Adote Fácil

  Este documento detalha as melhorias de infraestrutura, empacotamento e integração contínua implementadas no projeto.

## 1. Orquestração (`docker-compose.yml`)

  Removemos a linha `command: sh -c "until nc -z…"` do backend. Como adicionamos a diretiva `depends_on: condition: service_healthy`, o próprio Docker já sabe que deve segurar o backend até o banco de dados carregar 100%.

  Adicionado `env_file` tanto no serviço do backend quanto no frontend. A responsabilidade de injetar variáveis de ambiente não é da aplicação, mas sim do Docker Compose. Agora, ele lê os arquivos `.env` do lado de fora e injeta as variáveis nativamente no sistema operacional do contêiner.

  Adicionada a instrução `restart: unless-stopped` em todos os serviços (banco, backend e frontend) para que o Docker os reinicie automaticamente caso eles caiam.

## 2. Empacotamento do Backend (`backend/Dockerfile`)

  Substituímos npm install por npm ci para instalar as dependências exatas do package-lock.json. Isso garante builds mais rápidos e evita que atualizações acidentais quebrem a aplicação no servidor.
  
  Retiramos a linha `RUN npm run test`. O Dockerfile serve apenas para empacotar o software, não para homologá-lo. Se o teste falhar no Docker, a imagem nem termina de ser feita. Movemos essa responsabilidade para o pipeline de CI/CD, que é o lugar correto para rodar validações.

  Adicionada a linha `RUN npm prune --production`. Ferramentas como TypeScript são pesadas e só servem para o desenvolvedor. O `prune` deleta todo esse "lixo" do desenvolvimento antes de fechar a imagem, reduzindo consideravelmente o peso do contêiner final.

## 3. Empacotamento do Frontend (`frontend/Dockerfile`)

  Aplicamos a mesma lógica do backend. Trocamos para `npm ci` para garantir a trava de versões e adicionamos o `npm prune --production` para limpar dependências pesadas de desenvolvimento após o build.

## 4. Pipeline de CI/CD

  Adicionado o comando `cp ./backend/.env ./frontend/.env`. O pipeline antigo só criava o `.env` para o backend; essa mudança garante que o frontend também receba as variáveis antes do Docker subir.

  Adicionamos a flag `--wait` no comando de subida. Isso atrela o pipeline diretamente aos healthchecks do Docker, zerando a chance de o teste falhar por falta de sincronia de tempo.

  Removi a limitação de pasta (`working-directory: ./backend`) do comando do Docker Compose. Como o orquestrador está na raiz do projeto, forçar o pipeline a procurar ele dentro da pasta do backend fazia o teste quebrar na nuvem. Também fixamos o Node.js na versão 20 no pipeline para garantir que o ambiente de teste seja exatamente igual ao de produção.