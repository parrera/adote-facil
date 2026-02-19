# Análise e Sugestões DevOps

## 1. Refatoração do Docker Compose (`docker-compose.yml`)

As seguintes alterações foram implementadas:

* **Remoção de script de espera:** O serviço `adote-facil-backend` utilizava um script manual, como `command: sh -c "until nc -z..."` para aguardar o banco de dados. Removemos isso, pois o banco já possui um `healthcheck` configurado e o backend utiliza a diretiva nativa `depends_on: condition: service_healthy`, o que torna a espera via script redundante e ineficiente.
* **Injeção Explícita de Variáveis de Ambiente:** Adicionamos a diretiva `env_file` nos serviços `adote-facil-backend` e `adote-facil-frontend`. É uma boa prática que o orquestrador de contêineres seja o responsável por injetar as variáveis de ambiente, garantindo que o contêiner seja agnóstico ao ambiente em que roda.
* **Políticas de Resiliência:** Implementamos a política `restart: unless-stopped` em todos os serviços. Isso garante alta disponibilidade, reiniciando os contêineres automaticamente em caso de falhas ou reinicialização do host.