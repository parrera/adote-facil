# Testes de Aceitação Automatizados — Adote Fácil (Selenium)

Este diretório contém os testes de aceitação automatizados do sistema Adote Fácil, implementados com Selenium IDE.

## Estrutura

- tests/Adote Facil - Testes/: arquivo .side (Selenium IDE)
- tests/README.md: instruções de execução

## Pré-requisitos

- Firefox instalado
- Extensão *Selenium IDE* instalada no Firefox
- Aplicação rodando localmente:
  - Frontend: http://localhost:3000

## Como executar

1. Inicie o sistema.
2. Abra o Firefox.
3. Abra o Selenium IDE:
   - Menu do Firefox → Extensões → Selenium IDE (ou ícone do Selenium).
4. No Selenium IDE, clique em *Open an existing project*.
5. Selecione o arquivo .side em tests/selenium/.
6. Rode o teste:
   - *Run current test* para um teste específico (comece pelo de login)
   - *Run all tests* para rodar todos do arquivo

## Testes implementados

- *Login com cadastro*: autenticação com credenciais válidas
- *Editar dados pessoais*: atualizar nome/email/senha
- *Cadastrar animal*: disponibilizar animal para adoção
- *Confirmar adoção*: remove animal da lista de disponíveis (Para esse teste é necessário que tenha um animal cadastrado)
