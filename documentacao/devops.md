# Análise DevOps e Melhorias de Infraestrutura — Adote Fácil

Este documento apresenta a análise técnica da infraestrutura e as melhorias implementadas no pipeline de CI/CD e na orquestração de containers do projeto Adote Fácil para o PR 5.

## 1. Melhorias no Pipeline de Automação (`.github/workflows/`)

O pipeline é como uma "esteira de fábrica" que confere se o código está bom antes de aceitá-lo.

### 1.1. Teste de Inicialização (Smoke Test)
* **O que foi feito**: Criamos um passo chamado `up-containers` que tenta ligar o sistema inteiro dentro do GitHub.
* **Por que é bom**: Isso evita que a gente envie um código que até passa nos testes de lógica, mas que faz o sistema nem conseguir ligar por erro de configuração.

### 1.2. Entrega Automática (Releases)
* **O que foi feito**: Agora, toda vez que terminamos uma etapa, o GitHub cria automaticamente uma "versão" oficial (ex: v1.0.1).
* **Por que é bom**: Facilita muito o controle de qual versão do sistema está funcionando e deixa o projeto pronto para download em um arquivo ZIP organizado.

---

## 2. Melhorias no Docker (`Dockerfile` e `docker-compose.yml`)

Melhoramos a forma como os "containers" conversam entre si.

### 2.1. Redes Separadas (Segurança)
* **O que foi feito**: Criamos duas redes diferentes: uma para o que o usuário vê (frontend) e outra para o que fica escondido (banco de dados).
* **Por que é bom**: Se alguém mal-intencionado tentar invadir pelo site, ele não terá um caminho direto para o banco de dados, pois as redes estão isoladas.

### 2.2. Espera Inteligente (Healthchecks)
* **O que foi feito**: O sistema agora só tenta ligar o Backend depois que o Banco de Dados avisa que está "saudável" e pronto.
* **Por que é bom**: Acaba com aqueles erros chatos onde o sistema trava na hora de ligar porque o banco de dados ainda estava "carregando".

### 2.3. Limites de Uso e Imagens Leves
* **O que foi feito**: Definimos um limite de memória e CPU para o banco e usamos o `target: runner` para criar imagens menores.
* **Por que é bom**: Garante que o sistema não vai travar o computador por usar memória demais e deixa o processo de baixar e rodar o sistema muito mais rápido.

---

## 3. Sugestões para o Futuro

* **Varredura de Vírus/Falhas**: Instalar ferramentas que avisam se alguma biblioteca que estamos usando tem furos de segurança.
* **Segredos Externos**: Migrar a gestão de variáveis sensíveis totalmente para o *GitHub Secrets* em vez de depender de arquivos `.env` em ambiente de produção.