# **Principais Histórias de Usuário e Cenários de Teste**

## Histórias de Usuário

1 – <u>Cadastro de usuário:</u>  
Como um visitante do sistema, eu gostaria de me cadastrar informando nome, email e senha.

2 – <u>Autenticação de usuário:</u>  
Como um usuário cadastrado, eu gostaria de realizar login com email e senha para acessar minha conta e funcionalidades do sistema.

3 – <u>Cadastro de animal para adoção:</u>  
Como um usuário autenticado, eu gostaria de cadastrar um animal para adoção com suas informações e imagens.

4 – <u>Visualização de animais disponíveis:</u>  
Como um usuário, eu gostaria de visualizar a lista de animais disponíveis para adoção.

5 – <u>Iniciar chat com outro usuário:</u>  
Como um usuário autenticado, eu gostaria de iniciar um chat com outro usuário.

6 – <u>Enviar mensagem em um chat:</u>  
Como um usuário autenticado, eu gostaria de enviar mensagens em um chat.

7 – <u>Interface mobile:</u>  
Como um usuário do app no celular, eu gostaria de ter uma interface com campos de login e senha para acessar minha conta facilmente no celular.

## **Cenários de Teste**

<u>**1 – Cenário Principal: Cadastro de usuário com sucesso**</u>  
Objetivo: Cadastrar usuário com informações válidas  
Pré-condição: Usuário na página de cadastro; email ainda não cadastrado.  
Entradas: nome=”João Silva”, email=”joao@email.com”, senha=”joao123”  
Ações: preencher os campos e clicar em “Cadastrar”  
Resultado esperado: usuário criado com sucesso; mensagem de confirmação exibida.

Cenário Alternativo: Email já cadastrado  
Objetivo: Impedir cadastro com email já existente  
Pré-condição: usuário na página de cadastro; email já cadastrado  
Entradas: nome=”João Silva”, email=”maria@email.com”, senha=”joao123”  
Ações: Preencher os campos e clicar em “Cadastrar”  
Resultado esperado: Mensagem de erro “Email já cadastrado”; usuário não criado.

<u>**2 – Cenário Principal: Autenticação de Usuário**</u>  
Objetivo: validar que o usuário cadastrado consegue se autenticar corretamente.  
Pré-condição: usuário já cadastrado com email e senha válidos.  
Entradas: email = “joao@email.com”, senha = “joao123”  
Ações: informar email e senha na tela de login e confirmar  
Resultado esperado: sistema autentica o usuário e retorna um token  

Cenário alternativo - Senha incorreta  
Objetivo: impedir autenticação com senha incorreta.  
Pré-condição: usuário já cadastrado com email válido.  
Entradas: email = “joao@email.com”, senha = “senhaErrada”  
Ações: informar email e senha e confirmar  
Resultado esperado: sistema retorna erro de autenticação; acesso negado

<u>**3 – Cenário Principal: Cadastro de animal**</u>  
Objetivo: validar que o usuário autenticado consegue cadastrar um animal corretamente.  
Pré-condição: usuário autenticado; acesso à tela de cadastro de animais.  
Entradas: nome: “Max”, tipo: “Cachorro”, gênero: “Macho”, raça: “Labrador”, descrição: “Amigável e brincalhão”, imagens: imagens válidas do animal  
Ações: preencher os campos e enviar o formulário de cadastro.  
Resultado esperado: animal cadastrado com status “disponível”; confirmação exibida ao usuário.

Cenário Alternativo: usuário não autenticado  
Objetivo: impedir cadastro de animal por usuários não autenticados.  
Pré-condição: usuário não autenticado; acesso à tela de cadastro.  
Entradas: qualquer dado de animal  
Ações: tentar enviar o formulário de cadastro.  
Resultado esperado: sistema bloqueia a operação e exibe mensagem de erro “Usuário não autenticado”.

<u>**4 – Cenário Principal: Visualização de animais disponíveis**</u>  
Objetivo: validar que o sistema exibe corretamente os animais disponíveis.  
Pré-condição: existem animais cadastrados com status “disponível”.  
Entradas: nenhuma específica.  
Ações: acessar a página de listagem.  
Resultado esperado: sistema exibe todos os animais disponíveis com seus dados.

Cenário Alternativo: nenhum animal disponível  
Objetivo: validar o comportamento quando não há animais disponíveis.  
Pré-condição: não existem animais disponíveis cadastrados.  
Entradas: nenhuma específica.  
Ações: acessar a página de listagem.  
Resultado esperado: sistema exibe mensagem informativa indicando que não há animais disponíveis.

<u>**5 – Cenário Principal: Iniciar chat**</u>  
Objetivo: validar que um usuário autenticado consegue iniciar um chat com outro usuário.  
Pré-condição: usuário autenticado; outro usuário existente no sistema.  
Entradas: ID do usuário destinatário.  
Ações: selecionar o usuário e iniciar um chat.  
Resultado esperado: sistema cria um novo chat com sucesso.

Cenário Alternativo: chat já existente  
Objetivo: garantir que não sejam criados chats duplicados.  
Pré-condição: já existe um chat entre os usuários.  
Entradas: ID do usuário destinatário.  
Ações: tentar iniciar novamente.  
Resultado esperado: sistema retorna o chat existente.

<u>**6 – Cenário Principal: Enviar Mensagem**</u>  
Objetivo: validar que o usuário consegue enviar mensagens em um chat existente.  
Pré-condição: chat existente; usuário autenticado.  
Entradas: conteúdo da mensagem.  
Ações: digitar a mensagem e clicar em “Enviar”.  
Resultado esperado: mensagem é salva e exibida no chat.

Cenário Alternativo: chat não existe  
Objetivo: impedir envio de mensagens em chats inexistentes.  
Pré-condição: chat não existe.  
Entradas: conteúdo da mensagem.  
Ações: tentar enviar.  
Resultado esperado: sistema retorna erro “chat inválido”.

<u>**7 – Cenário Principal: Acesso à interface de login**</u>  
Objetivo: validar que a interface de login é exibida corretamente.  
Pré-condição: aplicativo instalado; usuário possui cadastro.  
Entradas: nenhuma específica.  
Ações: abrir o app.  
Resultado esperado: campos de email e senha exibidos corretamente.

Cenário alternativo: aplicativo aberto sem usuário cadastrado  
Objetivo: garantir que o app exibe mensagem adequada.  
Pré-condição: nenhum usuário cadastrado.  
Entradas: nenhuma específica.  
Ações: abrir o app.  
Resultado esperado: opção para criar conta é exibida.
