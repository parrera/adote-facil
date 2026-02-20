# Testes Automatizados — Projeto Adote Fácil (PR4)

## 1) Análise dos testes unitários existentes

Os testes unitários do backend estão organizados principalmente na camada de serviços, abrangendo funcionalidades relacionadas a usuários, animais e chats. Eles utilizam Jest juntamente com mocks para simular dependências, permitindo testar a lógica do sistema sem depender diretamente do banco de dados.

De forma geral, os testes verificam corretamente os principais comportamentos das funcionalidades, como validação de usuários, criação de registros e retorno adequado em situações de sucesso ou erro.

Apesar disso, algumas melhorias podem ser consideradas para aumentar a qualidade da suíte de testes.

### 1.1 Melhorias propostas

- Adicionar mais testes para cenários alternativos ou entradas inválidas, aumentando a cobertura das regras de negócio.
- Reduzir repetição na criação de dados utilizados nos testes, tornando o código mais organizado e fácil de manter.
- Melhorar a padronização das verificações de erro, garantindo maior clareza na leitura dos testes.


