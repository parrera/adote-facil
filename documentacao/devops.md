# Análise DevOps do Projeto

## 1. Pipeline CI/CD
- Não, o workflow está configurado mas o pipeline não está ativo.

## 2. Testes Automatizados no Pipeline
-  Sim, no workflow teste teste unitários configurados.

## 3. Uso de Containers
- Sim, tanto no workflow, quanto para execução do projeto em ambientes de produção e/ou desenvolvimento.
### Melhorias rápidas aplicadas no `backend/Dockerfile`

- Usuário não-root: adicionado `appuser` para executar a aplicação com menos privilégios.
- Healthcheck: `HEALTHCHECK` que verifica `http://localhost:8080/health`.
- Redução de camadas: uso de `npm ci` e limpeza do cache (`npm cache clean --force`) em uma camada separada.
