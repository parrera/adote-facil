# 🧪 Relatório dos Testes Automatizados 

Este documento apresenta a análise técnica da infraestrutura de testes do projeto **Adote Fácil** e a especificação dos cenários de aceitação (End-to-End) desenvolvidos com Cypress para a entrega do **PR 4**.

---

## 📊 Análise dos Testes Unitários

A atual suíte de testes unitários do projeto concentra-se na camada de **Services** com o framework **Jest**. Com base na análise do repositório, seguem as melhorias propostas para atender aos requisitos de qualidade:

### Sugestões de Melhorias
* **Isolamento do Prisma**: Recomenda-se o uso de *Prisma Mocks* para que os testes de serviço não dependam de uma conexão ativa com o banco de dados.
* **Cobertura de Middlewares**: É necessário expandir os testes para validar se os middlewares de autenticação estão bloqueando acessos indevidos.
* **Tratamento de Erros**: Implementar testes para caminhos alternativos, garantindo que falhas de conversão de tipos retornem erros amigáveis ao invés de falhas internas.

---

## 📋 Testes de Aceitação (Linguagem Natural Estruturada)

### 1. Cadastro de Animal (`caso1-cadastraranimal.cy.js`)
**O que este teste cobre**: A integridade do formulário de cadastro e a persistência correta de novos registros de animais no sistema.
* **1.1 Cenário Principal: Cadastro com sucesso**
    * **Dado que** o doador está autenticado
    * **E** está na página de cadastro
    * **Quando** preenche todos os campos obrigatórios (nome, tipo, raça, descrição)
    * **E** anexa uma foto válida
    * **Então** o sistema deve realizar o cadastro com sucesso
    * **E** o novo animal deve ser exibido na vitrine de adoção.
* **1.2 Cenário Alternativo: Cadastro sem nome**
    * **Quando** o doador preenche todos os dados
    * **E** deixa o campo "Nome" vazio
    * **Então** o sistema deve exibir um alerta de campo obrigatório
    * **E** impedir o envio do formulário.

### 2. Visualização de Detalhes (`caso2-detalhes-animal.cy.js`)
**O que este teste cobre**: A exibição correta dos dados vindos da API na interface e o fluxo de navegação do usuário adotante.
* **2.1 Cenário Principal: Consulta de detalhes válida**
    * **Dado que** o usuário está navegando na lista principal de animais
    * **Quando** seleciona o card de um animal específico
    * **Então** o sistema deve carregar a página de detalhes
    * **E** exibir a descrição, raça e fotos completas do registro.
* **2.2 Cenário Alternativo: Animal inexistente**
    * **Quando** o usuário tenta acessar via URL um ID de animal que já foi removido
    * **Então** o sistema deve exibir uma mensagem de erro
    * **E** retornar o usuário para a listagem principal.

### 3. Exclusão de Registro (`caso3-excluir-animal.cy.js`)
**O que este teste cobre**: A segurança na remoção de dados pelo doador e o funcionamento dos prompts de confirmação da interface.
* **3.1 Cenário Principal: Exclusão confirmada**
    * **Dado que** o doador está visualizando sua lista de animais disponibilizados
    * **Quando** aciona o comando de exclusão
    * **E** confirma a operação no modal de segurança
    * **Então** o registro deve ser removido do banco de dados
    * **E** sumir da interface instantaneamente.
* **3.2 Cenário Alternativo: Cancelamento de exclusão**
    * **Quando** o usuário aciona a exclusão
    * **E** seleciona "Cancelar" no prompt de confirmação
    * **Então** o registro do animal deve permanecer intacto
    * **E** continuar visível na listagem para o usuário.

---

## 🛠️ Instruções para Execução (Cypress)

Siga os passos abaixo para rodar os testes automatizados de aceitação:

1.  **Instalação**: Na raiz do projeto, instale o Cypress como dependência de desenvolvimento:
    `npm install cypress --save-dev`
2.  **Interface Gráfica**: Execute o comando abaixo para abrir o painel de testes:
    `npx cypress open`
3.  **Execução em Terminal**: Para rodar todos os testes de forma automatizada (headless):
    `npx cypress run`


> **Aviso de Autenticação**: Os testes utilizam contas pré-cadastradas para o login. Verifique se o usuário `eduardo.gandra12@icloud.com` está configurado em seu ambiente local antes de iniciar.