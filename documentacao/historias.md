# Especificação de Requisitos

## História 1: Cadastrar novo animal para adoção
- **Ator**: Doador
- **Cenário Principal**:
  O doador acessa a área "Cadastrar animal para adoção". Preenche os campos de informações (foto, nome, tipo, gênero, raça, descrição). Faz upload de até 5 fotos. Clica em "Salvar". O sistema registra os dados e confirma: "Cadastro realizado com sucesso".
- **Cenários Alternativos**:
  - Se o usuário tentar enviar mais de 5 fotos → o sistema bloqueia o envio extra.
  - Se faltar um campo obrigatório → o sistema exibe alerta específico.

## História 2: Visualizar animais disponíveis para adoção
- **Ator**: Interessado
- **Cenário Principal**:
  O interessado acessa a opção "Animais disponíveis para adoção". O sistema exibe uma lista com fotos e informações resumidas. O usuário pode clicar em um animal para ver a ficha completa.
- **Cenários Alternativos**:
  - Se não houver animais cadastrados → o sistema exibe a mensagem "Nenhum animal disponível no momento".
  - Se houver muitos animais → o sistema oferece filtros de busca (tipo, gênero, raça).


  ## História 3: Visualizar detalhes de um animal
- **Ator**: Interessado
- **Cenário Principal**:
  O interessado clica em um animal da lista. O sistema abre a ficha detalhada com informações completas e fotos.
- **Cenários Alternativos**:
  - Se as fotos não carregarem → o sistema exibe "Não foi possível carregar as imagens".
  - Se o animal já estiver adotado → o sistema exibe a mensagem "Este animal já não está disponível".


## História 4: Enviar mensagem a um doador
- **Ator**: Interessado
- **Cenário Principal**:
  O interessado acessa o perfil de um animal, clica em "Enviar mensagem ao doador". Digita a mensagem e clica em "Enviar". O sistema entrega a mensagem e mostra: "Mensagem enviada com sucesso".
- **Cenários Alternativos**:
  - Se a caixa de texto estiver vazia → o sistema alerta "Digite uma mensagem".
  - Se houver falha de conexão → o sistema informa "Não foi possível enviar, tente novamente".

  ## História 5: Receber resposta de mensagem enviada
- **Ator**: Interessado
- **Cenário Principal**:
  O interessado acessa a área "Mensagens". O sistema exibe respostas enviadas pelos doadores.
- **Cenários Alternativos**:
  - Se não houver respostas → o sistema mostra "Nenhuma resposta recebida ainda".
  - Se a resposta for removida pelo doador → o sistema exibe "Mensagem indisponível".

## História 6: Excluir cadastro de animal
- **Ator**: Doador
- **Cenário Principal**:
  O doador acessa "Animais cadastrados", escolhe um animal e clica em "Excluir". O sistema pede confirmação. Ao confirmar, o sistema remove o animal e mostra "Cadastro excluído com sucesso".
- **Cenários Alternativos**:
  - Se o doador cancelar a exclusão → o sistema mantém o cadastro intacto.
  - Se o animal já tiver um processo de adoção em andamento → o sistema bloqueia a exclusão e exibe mensagem explicativa.

  ## História 7: Editar dados pessoais
- **Ator**: Usuário (doador ou interessado)
- **Cenário Principal**:
  O usuário acessa seu perfil, clica em "Editar dados pessoais", altera informações como nome, e-mail ou senha. Clica em "Salvar alterações". O sistema atualiza os dados e mostra: "Alterações salvas com sucesso".
- **Cenários Alternativos**:
  - Se o usuário tentar salvar com e-mail já cadastrado → o sistema avisa "E-mail já em uso".
  - Se deixar campos obrigatórios em branco → o sistema pede correção antes de salvar.

## História 8: Alterar senha de acesso
- **Ator**: Usuário
- **Cenário Principal**:
  O usuário acessa "Editar dados pessoais", escolhe "Alterar senha". Informa a senha atual, digita e confirma a nova senha. O sistema valida e confirma: "Senha alterada com sucesso".
- **Cenários Alternativos**:
  - Se a senha atual estiver incorreta → o sistema exibe "Senha inválida".
  - Se a nova senha não atender aos requisitos de segurança → o sistema exibe orientações.