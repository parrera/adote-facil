# Documentação de Melhorias DevOps - CI/CD

Análise e descrição das implementações de otimização no ciclo de vida de desenvolvimento do projeto, focando em: **Segurança**, **Performance de Build**, **Automação de Testes e Ciclo de Entregas** 

<br>



## Análise do Cenário Original (Diagnóstico)

No código original, o projeto apresentava os seguintes pontos de atenção em seus arquivos de configuração (**Dockerfile** e **workflow**):

1.  **Dockerfiles Monolíticos:**
    * As imagens incluíam código fonte completo, ferramentas de compilação (TypeScript) e dependências de desenvolvimento (`devDependencies`) na versão final.
    * **Impacto:** Imagens pesadas, deploy lento e maior vulnerável à ataques.

2.  **Execução com Privilégios Elevados (Root):**
    * Os containers rodavam com o usuário padrão `root`.
    * **Impacto:** Risco crítico de segurança. Em caso de vulnerabilidade na aplicação, o atacante teria controle total do container.

3.  **Mistura de Responsabilidades (Testes no Build):**
    * Os testes (`npm run test`) eram executados dentro do comando `docker build`.
    * **Impacto:** Builds lentos e falhas de teste que impediam a criação da imagem, mas sem reportar adequadamente em um pipeline de CI.

4.  **Gestão de Dependências Imprecisa:**
    * Uso de `npm install` em vez de `npm ci`.
    * **Impacto:** Possibilidade de inconsistência entre o ambiente de desenvolvimento e produção (versões diferentes instaladas apesar do `package-lock.json`).

5.  **Pipeline Manual/Incompleto:**
    * Dependência de processos manuais ou workflows que geravam artefatos legados (.zip) ao invés de imagens Docker.

---

<br>

## Melhorias Implementadas

### A. Otimização de Dockerfiles (Multi-stage Build)

Foi aplicada a estratégia de **Multi-stage Building** (Construção em Múltiplos Estágios) para Backend e Frontend.

#### Backend (`backend/Dockerfile`)
* **Estágio Builder:** Instala dependências, gera o cliente Prisma e compila o TypeScript.
* **Estágio Runner:** Uma imagem Alpine limpa que recebe apenas a pasta `dist`, `package.json` e as dependências de produção (`node_modules` limpo via `npm prune`).
* **Segurança:** Configurado para rodar com o usuário não-privilegiado `node`.

#### Frontend (`frontend/Dockerfile`)
* **Modo Standalone:** Configuração otimizada para Next.js. O build gera apenas os arquivos estritamente necessários para rodar o servidor.
* **Redução Drástica de Tamanho:** A imagem final contém apenas a pasta `.next/standalone` e recursos estáticos, reduzindo drasticamente o tamanho.
* **Segurança:** Criação e uso de usuário específico `nextjs` (UID 1001).

### B. Pipeline de Integração Contínua (GitHub Actions)

Um novo workflow unificado foi criado em `.github/workflows/ci.yml`, substituindo experimentos anteriores.

**Principais Características:**
1.  **Execução Condicional (Smart Paths):**
    * Jobs do Backend só rodam se houver mudanças na pasta `backend/`.
    * Jobs do Frontend só rodam se houver mudanças na pasta `frontend/`.
    * *Benefício:* Economia de recursos computacionais e feedback mais rápido.

2.  **Pipeline de Qualidade (Fail Fast):**
    * Antes de qualquer build Docker, o código passa por:
        * `Linting` (Análise padrão de código).
        * `Type Checking` (Compilação TypeScript).
        * `Unit Tests` (Jest com cobertura).

3.  **Smoke Test / Teste de Integração:**
    * O pipeline sobe o ambiente completo usando `docker compose` (Banco + Backend + Frontend).
    * Verifica se os containers iniciam e permanecem rodando (`docker inspect`), validando a comunicação entre serviços e a integridade das imagens geradas.

4.  **Publicação Automatizada**

    * O pipeline inclui uma etapa final de CD que publica as imagens no Docker Hub automaticamente, mas apenas se todas as etapas de qualidade passarem e a mudança for na branch main.
