## Visão geral do pipeline atual

- **Workflow principal**: `.github/workflows/experimento-ci-cd.yml`
- **Escopo de disparo**:
  - `pull_request` para a branch `main`
  - `workflow_dispatch` (execução manual)
- **Stack**:
  - Backend Node.js (`backend/`, Jest, Prisma, PostgreSQL)
  - Frontend Next.js (`frontend/`)
  - Orquestração local com `docker-compose.yml`

### Jobs existentes e papel de cada um

- **unit-test**
  - Executa testes unitários do backend com Jest e cobertura.
- **frontend-lint** (adicionado)
  - Garante qualidade do código do frontend via `next lint`.
- **build**
  - Valida o `docker-compose.yml`.
  - Faz build das imagens Docker do backend, frontend e banco.
- **up-containers**
  - Sobe o ambiente com `docker compose up`.
  - Realiza uma verificação simples dos serviços HTTP.
  - Coleta logs básicos e derruba o ambiente.
- **delivery**
  - Gera um `.zip` do projeto (artefato de entrega) e faz upload.

## Melhorias implementadas no CI/CD

### 1. Configuração explícita de Node.js + cache de dependências

- **Antes**
  - Apenas `actions/checkout` e uso de `npm install` sem cache.
- **Depois**
  - Adicionado `actions/setup-node@v4` nos jobs de backend e frontend:
    - Node 20 explicitamente configurado.
    - Cache de dependências via `cache: npm`.
    - `cache-dependency-path` apontando para `backend/package-lock.json` e `frontend/package-lock.json`.
  - Substituição de `npm install` por `npm ci`:
    - Builds mais reprodutíveis.
    - Instalação mais rápida em ambiente de CI.

**Benefícios**

- Mais desempenho no pipeline.
- Menos variação de dependências entre execuções.
- Facilita debugar problemas relacionados a versão de Node.

### 2. Job dedicado de lint do frontend (`frontend-lint`)

- **Antes**
  - Nenhuma verificação automática de qualidade de código do frontend no CI.
- **Depois**
  - Novo job `frontend-lint` que:
    - Faz checkout do código.
    - Configura Node 20 com cache.
    - Roda `npm ci` em `frontend/`.
    - Executa `npm run lint` (Next.js / ESLint).
  - O job `build` agora depende de:
    - `unit-test`
    - `frontend-lint`

**Benefícios**

- PRs só avançam para build Docker se:
  - Testes do backend passarem.
  - Lint do frontend estiver limpo.
- Reduz chance de quebrar o build do frontend por problemas simples de lint.

### 3. Validação do `docker-compose.yml` no CI

- **Antes**
  - O pipeline apenas rodava `docker compose build`.
  - Erros de sintaxe/variável em `docker-compose.yml` apareciam tarde.
- **Depois**
  - Passo explícito: `docker compose config --quiet`.

**Benefícios**

- Falha rápida (fail fast) quando:
  - A sintaxe do compose estiver inválida.
  - Faltarem variáveis de ambiente obrigatórias.

### 4. Teste básico dos containers de backend e frontend

- **Antes**
  - `docker compose up -d`, `sleep 10`, `docker compose down`.
  - Sem verificação objetiva se backend/frontend estavam respondendo.
- **Depois**
  - `docker compose up -d` sobe todo o ambiente.
  - Aguardar um tempo maior (`sleep 20`).
  - Verificações:
    - `curl -f http://localhost:8080/` (backend) – falha controlada se não responder.
    - `curl -f http://localhost:3000/` (frontend) – idem.
    - Logs impressos:
      - `docker compose logs adote-facil-backend`
      - `docker compose logs adote-facil-frontend`
  - `docker compose down` ao final, mesmo que os curls falhem.

**Benefícios**

- Feedback mínimo de integração entre:
  - Backend + banco.
  - Frontend + backend (ao menos a subida dos serviços).
- Logs ficam disponíveis na execução do workflow para facilitar troubleshooting.

### 5. Entrega de artefato `.zip` mantida

- **Antes**
  - Geração de `.zip` com exclusão de pastas como `.git`, `.github`, `node_modules`.
  - Upload via `actions/upload-artifact`.
- **Depois**
  - Mantido, apenas com ajustes cosméticos (mesma semântica).

**Benefícios**

- Continua sendo possível baixar o projeto completo da execução do pipeline.

## Melhorias implementadas em Dockerfiles

### Backend (`backend/Dockerfile`)

- **Antes**
  - `node:20-alpine` sem `NODE_ENV` definido.
  - Uso de `npm install`.
- **Depois**

```12:22:backend/Dockerfile
FROM node:20-alpine

ENV NODE_ENV=production

RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run generate

RUN npm run test

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
```

**Impactos**

- `NODE_ENV=production` garante comportamento de bibliotecas otimizadas.
- `npm ci` garante instalação determinística baseada no `package-lock.json`.
- Fluxo de testes/build permanece igual, reduzindo risco.

### Frontend (`frontend/Dockerfile`)

- **Antes**
  - `node:20-alpine` sem `NODE_ENV`.
  - `npm install`.
- **Depois**

```1:15:frontend/Dockerfile
FROM node:20-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**Impactos**

- Mesmos benefícios de `NODE_ENV=production` + `npm ci`.
- Mantido o mesmo comando de start.

## Sugestões de melhorias futuras

### 1. Multi-stage builds para imagens menores

- **Motivação**
  - Hoje as imagens incluem dependências de build/test.
- **Sugestão**
  - Implementar multi-stage build:
    - Stage 1: build + testes.
    - Stage 2: apenas artefatos necessários para rodar (`dist/`, `node_modules` de produção).

### 2. Publicação de imagens em registro

- **Cenário**
  - Atualmente o job `build` apenas constrói localmente.
- **Sugestão**
  - Incluir job opcional usando `docker/build-push-action`:
    - Push para GitHub Container Registry ou outro registry.
    - Tag por branch/commit.

### 3. Jobs de verificação mais ricos

- **Ideias**
  - Backend:
    - `npm run lint` (com ESLint configurado).
    - `npm run test:coverage` com upload para Codecov ou similar.
  - Frontend:
    - Rodar um conjunto básico de testes E2E (ex.: Playwright/Cypress) em jobs separados.

### 4. Gate de qualidade em PRs

- **Sugestão**
  - Configurar branch protection para `main`:
    - Exigir sucesso do workflow `experimento-ci-cd`.
    - Exigir aprovação de review antes de merge.

### 5. Parâmetros de ambiente e segurança

- **Sugestão**
  - Centralizar variáveis sensíveis em `secrets` do GitHub:
    - Ex.: credenciais de banco, tokens externos.
  - Validar no início do workflow que segredos obrigatórios existem.

## Como usar estas melhorias no PR 5

- **Contexto**
  - As alterações de CI/CD e Docker já estão implementadas no repositório local.
- **Para incluir no PR 5**
  - Subir os commits contendo:
    - `.github/workflows/experimento-ci-cd.yml`
    - `backend/Dockerfile`
    - `frontend/Dockerfile`
    - `documentacao/devops.md`
  - Garantir que:
    - O workflow executa com sucesso no PR 5.
    - O reviewer tenha o link para este arquivo (`documentacao/devops.md`) na descrição do PR.

### Texto sugerido para a descrição do PR 5

**Título sugerido**  
Melhorias de CI/CD e Docker + documentação DevOps

**Resumo**
- Atualiza o workflow `experimento-ci-cd` com cache de dependências, lint do frontend, validação do `docker-compose.yml` e teste básico de containers.
- Melhora os `Dockerfile`s de backend e frontend para builds mais reprodutíveis e adequados a produção.
- Adiciona documentação de DevOps em `documentacao/devops.md`, detalhando a análise e sugestões futuras.

**Mudanças principais**
- **CI/CD (`.github/workflows/experimento-ci-cd.yml`)**
  - Configuração explícita de Node 20 com `actions/setup-node@v4` e cache de dependências (`cache: npm`) para backend e frontend.
  - Uso de `npm ci` em vez de `npm install` nos jobs de CI.
  - Novo job `frontend-lint` rodando `npm run lint` no `frontend/`; o job `build` agora depende de `unit-test` (backend) e `frontend-lint`.
  - Validação do `docker-compose.yml` com `docker compose config --quiet` antes do build.
  - Job `up-containers` ajustado para:
    - Subir os serviços com `docker compose up -d`.
    - Aguardar a subida e fazer verificações HTTP básicas em `http://localhost:8080` (backend) e `http://localhost:3000` (frontend).
    - Coletar logs de backend/frontend e derrubar o ambiente com `docker compose down`.
  - Mantido o job `delivery` que gera e publica o `.zip` do projeto.

- **Docker**
  - **Backend (`backend/Dockerfile`)**
    - Define `NODE_ENV=production`.
    - Troca `npm install` por `npm ci`, mantendo `generate`, `test` e `build`.
  - **Frontend (`frontend/Dockerfile`)**
    - Define `NODE_ENV=production`.
    - Troca `npm install` por `npm ci`, mantendo `build` e `start`.

- **Documentação**
  - Criação de `documentacao/devops.md` com:
    - Visão geral do pipeline atual.
    - Descrição das melhorias implementadas.
    - Sugestões de melhorias futuras (multi-stage builds, publicação de imagens em registry, mais checks de qualidade, branch protection, gestão de segredos).
    - Orientação de uso dessas mudanças no contexto do projeto.

**Impacto**
- Builds mais rápidos e reprodutíveis em CI.
- Maior qualidade garantida para o frontend via lint obrigatório.
- Falha mais rápida em caso de problemas no `docker-compose.yml`.
- Feedback mínimo de integração entre backend, banco e frontend.
- Base de documentação para evoluir o pipeline DevOps no futuro.

