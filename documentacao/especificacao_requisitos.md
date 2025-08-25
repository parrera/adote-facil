# — Especificação de Requisitos

---

## Atores

- **Visitante**: usuário não autenticado que pode se cadastrar ou acessar a página de login.
- **Usuário autenticado**: pessoa logada que pode ver animais disponíveis, cadastrar animal para adoção, ver seus próprios anúncios, acessar conversas, editar dados pessoais e sair.

---

## Convenções
- Histórias identificadas como **USxx**.  
- Critérios de aceite listados como checklist.  
- Cenários descritos em **Gherkin** (Dado/Quando/Então) com **principal** e **alternativos**.

---

## US01 — Cadastrar conta
**Como** visitante, **eu quero** criar uma conta informando nome, e‑mail, senha e confirmação, **para** acessar a plataforma.

**Critérios de aceite**
- [ ] Campos obrigatórios: *Nome*, *Email*, *Senha* e *Confirme a senha*.
- [ ] Permitir visualizar/esconder senha nos campos de senha.
- [ ] Ao cadastrar com sucesso, exibir confirmação e orientar a fazer login.
- [ ] Link “Já possui uma conta? Faça login” leva à tela de login.

**Cenários de teste**
- **Principal**  
  **Dado** que estou na tela “Cadastrar”  
  **Quando** preencho *Nome*, *Email*, *Senha* e *Confirme a senha* com valores válidos e clico em **Cadastrar**  
  **Então** o sistema registra a conta e exibe mensagem de sucesso solicitando que eu faça login.
- **Alternativo A — Senhas diferentes**  
  **Dado** que preenchi senhas diferentes  
  **Quando** clico em **Cadastrar**  
  **Então** devo ver mensagem de validação informando que as senhas não coincidem e o cadastro não é concluído.
- **Alternativo B — Campos obrigatórios vazios**  
  **Dado** que omito algum campo obrigatório  
  **Quando** clico em **Cadastrar**  
  **Então** devo ver mensagens de obrigatoriedade e o botão não deve concluir o cadastro.
- **Alternativo C — Email inválido/já utilizado**  
  **Dado** que informo um e‑mail em formato inválido **ou** já cadastrado  
  **Quando** clico em **Cadastrar**  
  **Então** devo ver mensagem de erro apropriada e permanecer na tela de cadastro.

---

## US02 — Fazer login
**Como** visitante, **eu quero** autenticar com email e senha, **para** acessar a área logada.

**Critérios de aceite**
- [ ] Campos *Email* e *Senha* são obrigatórios.
- [ ] Permitir visualizar/esconder senha.
- [ ] Ao logar com sucesso, carregar a **área logada** com menu lateral e nome do usuário.
- [ ] Link “Ainda não tem uma conta? Cadastre‑se” leva à tela de cadastro.

**Cenários de teste**
- **Principal**  
  **Dado** que estou na tela de login  
  **Quando** preencho *Email* e *Senha* válidos e clico em **Login**  
  **Então** acesso a área logada e vejo meu nome no menu lateral.
- **Alternativo A — Credenciais inválidas**  
  **Dado** que informei email ou senha incorretos  
  **Quando** clico em **Login**  
  **Então** devo ver mensagem de erro e permanecer na tela de login.
- **Alternativo B — Campos vazios**  
  **Dado** que deixei algum campo obrigatório vazio  
  **Quando** tento logar  
  **Então** o sistema sinaliza o campo e não autentica.

---

## US03 — Ver animais disponíveis para adoção
**Como** usuário autenticado, **eu quero** visualizar a lista de animais disponíveis, **para** encontrar um pet para adoção.

**Critérios de aceite**
- [ ] A página “Animais disponíveis para adoção” lista os animais quando houver registros.
- [ ] Quando **não houver animais**, exibir estado vazio com mensagem informativa (ícone e texto).
- [ ] Cada item deve exibir informações mínimas do pet (nome e/ou atributos essenciais) quando existirem.

**Cenários de teste**
- **Principal**  
  **Dado** que existem animais cadastrados como disponíveis  
  **Quando** acesso “Animais disponíveis para adoção”  
  **Então** vejo a lista de animais.
- **Alternativo A — Estado vazio**  
  **Dado** que não há animais disponíveis  
  **Quando** acesso a página  
  **Então** vejo a mensagem “no momento não temos nenhum animal disponível para adoção”.

---

## US04 — Editar dados pessoais
**Como** usuário autenticado, **eu quero** alterar meu nome e e‑mail, **para** manter meus dados atualizados.

**Critérios de aceite**
- [ ] Página “Editar dados pessoais” exibe *Nome* e *Email* atuais.
- [ ] Botão **Salvar alterações** persiste mudanças válidas.
- [ ] Botão **Alterar senha** leva ao fluxo de troca de senha (ver US08).
- [ ] Validar formato de e‑mail e campos obrigatórios.

**Cenários de teste**
- **Principal**  
  **Dado** que alterei *Nome* e/ou *Email* com valores válidos  
  **Quando** clico **Salvar alterações**  
  **Então** os dados são atualizados e uma confirmação é exibida.
- **Alternativo A — Email inválido**  
  **Dado** que informei um e‑mail em formato inválido  
  **Quando** salvo  
  **Então** devo ver mensagem de validação e nada é alterado.


