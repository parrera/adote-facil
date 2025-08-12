# Como Rodar os Testes Automatizados

Este guia rápido mostra como executar os testes do projeto.

## Testes do Backend (Unitários)

Os testes do backend usam Jest. Para executá-los:

1.  Acesse a pasta `backend`:
    ```bash
    cd backend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Rode o comando de teste:
    ```bash
    npm test
    ```

## Testes do Frontend (Aceitação com Cypress)

Os testes de ponta a ponta usam Cypress. Siga os passos:

1.  Acesse a pasta `frontend`:
    ```bash
    cd frontend
    ```
2.  Instale as dependências (se for a primeira vez):
    ```bash
    npm install cypress --save-dev
    ```
3.  Abra a interface do Cypress:
    ```bash
    npx cypress open
    ```
4.  Com o Cypress aberto, basta clicar no nome do arquivo de teste que você quer executar.

**Importante:** Para os testes do Cypress funcionarem, o backend e o frontend da aplicação precisam estar rodando na sua máquina.
