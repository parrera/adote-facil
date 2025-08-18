# 📖 Histórias de Usuário - Adote Fácil

## 👤 Usuário Comum
- Como um usuário, eu quero poder fazer um cadastro no sistema, para que eu possa ter uma conta e usufruir do sistema Adote Fácil.
- Como um usuário, eu quero poder fazer login com meu e-mail e senha, para que eu possa acessar minha conta e utilizar os recursos do sistema.  
- Como um usuário, eu quero poder visualizar as minhas conversas, para que eu possa reler, relembrar e continuar a comunicação.  
- Como um usuário, eu quero poder editar meus dados pessoais de cadastro, para manter minhas informações atualizadas.  
- Como um usuário, eu quero poder fazer logout do sistema, para encerrar minha sessão com segurança.  

---

## 🐾 Adotante
- Como um adotante, eu quero poder visualizar todos os animais disponíveis para adoção, para que eu possa conhecer melhor os animais e escolher algum.  
- Como um adotante, eu quero poder *filtrar a pesquisa* para visualizar apenas os animais que atendem às minhas preferências (espécie, idade, gênero etc.).  
- Como um adotante, eu quero poder *entrar em contato com o doador*, para que eu possa obter informações sobre a adoção do animal.  

---

## 🐕 Doador
- Como um doador, eu quero poder *cadastrar animais para adoção*, informando nome, tipo, gênero e fotos, para disponibilizá-los na plataforma.  
- Como um doador, eu quero poder *visualizar os animais que cadastrei*, para acompanhar minhas publicações.  
- Como um doador, eu quero poder *responder os adotantes interessados* nos meus animais, para fornecer informações adicionais.  
- Como um doador, eu quero poder *excluir uma página de adoção de algum animal*, para evitar que anúncios com erros ou informações incompletas sejam divulgados.  
- Como um doador, eu quero poder *confirmar a doação de um animal*, para que o sistema atualize o status e os adotantes saibam que o animal não está mais disponível.

# 🐾 Cenários de Teste - Adote Fácil

## 🔑 Cadastro de Usuário
- *Principal:*  
  Dado que o usuário esteja na página de cadastro do sistema, quando ele preencher os campos com suas informações válidas e clicar em *"Cadastrar"*, então ele é redirecionado para a página de login.

- *Alternativos:*  
  - Nome com caracteres inválidos → Exibe aviso sobre a forma correta de preenchimento.  
  - E-mail sem @___.com → Exibe aviso sobre o formato correto.  
  - Senha com menos de 8 caracteres → Exibe aviso sobre a forma correta de preenchimento.  
  - Senha e confirmação de senha diferentes → Exibe aviso de que as senhas não coincidem.  
  - Campos obrigatórios não preenchidos → Exibe alerta solicitando preenchimento.  
  - Campos preenchidos incorretamente → Exibe aviso indicando a correção necessária.  

---

## 🔐 Autenticação (Login)
- *Principal:*  
  Dado que o usuário esteja na página de login do sistema, quando ele preencher *e-mail e senha corretos*, então ele é redirecionado para a página inicial.

- *Alternativo:*  
  E-mail e/ou senha incorretos ou inválidos → Exibe alerta informando que as credenciais são inválidas.  

---

## 🐕 Cadastro de Animal
- *Principal:*  
  Dado que o doador esteja na página de *"Disponibilizar animal para adoção", quando ele preencher todos os dados válidos e clicar em **"Cadastrar", então ele é redirecionado para a área **"Meus animais disponíveis para adoção"*.

- *Alternativo:*  
  Campos obrigatórios não preenchidos → Exibe alerta solicitando preenchimento.  

---

## 📝 Edição de Dados Pessoais
- *Principal:*  
  Dado que o usuário esteja na área de *"Editar dados pessoais", quando ele preencher os campos com suas informações válidas e clicar em **"Salvar alterações"*, então ele é notificado que os dados foram alterados com sucesso.

- *Alternativos:*  
  - Nome com caracteres inválidos → Exibe aviso sobre o preenchimento correto.  
  - E-mail sem @___.com → Exibe aviso sobre o formato correto.  
  - Senha com menos de 8 caracteres → Exibe aviso sobre a forma correta de preenchimento.  
  - Senha e confirmação diferentes → Exibe aviso de que as senhas não coincidem.  

---

## 💬 Troca de Mensagens
- *Principal:*  
  Dado que o adotante esteja na área de *"Animais disponíveis para adoção", quando ele clicar em **"Saber mais"* sobre o animal e enviar uma mensagem como *"Oi, gostaria de adotar o seu animal"*, então a mensagem é enviada pelo adotante e recebida pelo doador na área de conversas.  

---

## 🔎 Filtragem de Animais
- *Principal:*  
  Dado que o adotante esteja na área de *"Animais disponíveis para adoção", quando ele clicar em **"Filtrar"* e preencher os campos, então é exibida a lista de animais de acordo com o filtro aplicado.

- *Alternativos:*  
  - Clique em *"Filtrar"* sem preencher → Exibe aviso solicitando preenchimento dos campos.  
  - Clique em *"Limpar filtros"* → Exibe a lista com todos os animais disponíveis.  

---

## ✅ Confirmação de Adoção
- *Principal:*  
  Dado que o doador esteja na área de *"Meus animais disponíveis para adoção", quando ele clicar em **"Confirmar adoção"*, então o animal é removido da lista e passa a ser classificado como adotado.  

---

## ❌ Exclusão de Animal para Adoção
- *Principal:*  
  Dado que o doador esteja na área de *"Meus animais disponíveis para adoção", quando ele clicar no ícone de **lixeira* para excluir um animal, então a lista é atualizada sem o animal removido.
