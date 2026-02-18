# Histórias de Usuário – Sistema Adote Fácil

## 1. Cadastro de novo animal para adoção

**Como** um usuário autenticado (doador) do sistema, **quero** cadastrar um novo animal para adoção **para** disponibilizá-lo aos interessados.

- **Cenário principal:** O usuário preenche corretamente o formulário de cadastro do animal com nome, tipo (cão, gato etc.), sexo, raça (ou deixa vazio), descrição, e faz upload de uma ou mais fotos. Ao submeter o formulário, o sistema envia os dados e imagens para o servidor. Se todos os campos obrigatórios estiverem preenchidos, o servidor cadastra o animal com status “available” e retorna sucesso. O novo animal aparece em “Meus Animais” como disponível para adoção.
- **Cenários alternativos:** (a) Se o usuário esquecer de preencher um campo obrigatório (por exemplo, nome), o servidor responde com erro e o formulário exibe mensagem indicando o campo faltante. (b) Se as imagens enviadas tiverem formato inválido ou excederem tamanho permitido, o upload falha e o sistema alerta que houve erro nas imagens, permitindo tentar novamente.

## 2. Visualização e filtragem de animais disponíveis

**Como** usuário (autenticado) interessado em adoção, **quero** ver a lista de todos os animais disponíveis (exceto meus próprios) e poder filtrar por nome, tipo ou sexo **para** encontrar facilmente o animal desejado.

- **Cenário principal:** O usuário acessa a página de “Animais Disponíveis” e o sistema faz requisição à API de animais disponíveis, retornando todos os animais cadastrados por outros usuários com status “available”. A página exibe cartões com foto e nome. Então o usuário utiliza os filtros (por exemplo, digita parte do nome ou escolhe “fêmea” e tipo “gato”) e clica em “Filtrar”. O sistema consulta novamente a API incluindo os parâmetros, e exibe apenas os animais que correspondem aos critérios.
- **Cenários alternativos:** (a) Se o filtro aplicado não encontrar nenhum animal, o sistema mostra uma tela vazia com uma mensagem “Nenhum animal encontrado”. (b) Se o filtro for limpo ou reiniciado, o sistema volta a exibir todos os animais disponíveis. (c) Se ocorrer falha de conexão com o servidor durante a busca, o sistema exibe mensagem de erro (“Falha ao carregar animais disponíveis, tente novamente”).

## 3. Visualizar detalhes de um animal

**Como** usuário interessado, **quero** visualizar os detalhes completos de um animal selecionado **para** conhecer mais informações antes de adotá-lo.

- **Cenário principal:** Na lista de animais disponíveis, o usuário clica no botão “Saiba mais” de um animal. O sistema abre a página de detalhes desse animal, exibindo um carrossel de imagens, nome, tipo, sexo, raça (ou “SRD” se vazio) e descrição (ou “N/D” se vazio). O usuário pode navegar pelas fotos e ler os dados para avaliar o animal.
- **Cenários alternativos:** (a) Se a descrição do animal estiver vazia, exibe “N/D”. (c) Se o servidor não encontrar o animal (ID inválido), o usuário vê mensagem de erro ou retorna para lista anterior.

## 4. Entrar em contato com o dono do animal

**Como** usuário interessado, **quero** entrar em contato com o dono do animal via chat **para** combinar detalhes da adoção.

- **Cenário principal:** Na página de detalhes do animal, o usuário clica no botão “Entrar em contato com o dono”. O sistema chama a API de criação de chat. Se ainda não existe chat entre eles, o servidor cria um novo chat; caso contrário retorna o chat existente. Em seguida, o usuário é redirecionado para a página de conversas, já aberta na conversa com aquele dono (pelo ID de chat obtido). O usuário pode então visualizar mensagens prévias e continuar a conversa.
- **Cenários alternativos:** (a) Se já havia um chat existente, o sistema apenas redireciona para ele, evitando duplicar. (b) Se ocorrer erro ao criar o chat (por exemplo, falha de conexão), exibe mensagem de alerta (“Erro ao contatar o dono, tente novamente”).

## 5. Visualizar lista de conversas (chats)

**Como** usuário autenticado, **quero** ver a lista de todas as minhas conversas **para** selecionar uma e continuar as conversas em andamento.

- **Cenário principal:** O usuário acessa a área de “Conversas”. O sistema chama a API de chats do usuário, que retorna todos os chats em que ele participa. Para cada chat, a lista exibe o nome do outro participante e o último trecho de mensagem. O usuário vê, por exemplo, “Chat com Maria – Última mensagem: ‘Vou buscá-lo amanhã’.”. Ele pode clicar em um chat para abrir a conversa completa.
- **Cenários alternativos:** (a) Se o usuário não tiver nenhuma conversa, a interface exibe mensagem “Você ainda não tem conversas”. (b) Em caso de erro no servidor, exibe alerta de erro (“Não foi possível carregar suas conversas, tente novamente”).

## 6. Enviar mensagem em uma conversa

**Como** usuário participante de um chat, **quero** digitar e enviar uma mensagem **para** continuar a conversa e combinar detalhes.

- **Cenário principal:** O usuário abre uma conversa existente e vê todo o histórico de mensagens ordenadas por data. Na interface há um campo de texto. O usuário digita uma nova mensagem e clica em “Enviar”. O sistema chama a API de criação de mensagem. A mensagem é salva no banco e imediatamente adicionada à exibição no final do chat, mantendo a ordem cronológica.
- **Cenários alternativos:** (a) Se o usuário tentar enviar uma mensagem em branco, o sistema não chama a API. (b) Se o servidor falhar ao enviar, aparece um alerta (“Erro ao enviar mensagem, tente novamente”).

## 7. Confirmar adoção do animal

**Como** dono de um animal cadastrado, **quero** marcar meu animal como adotado **para** atualizar seu status e removê-lo da lista de disponíveis.

- **Cenário principal:** Na página “Meus Animais”, o usuário vê o cartão do animal com botões “Confirmar adoção” e “Remover”. Ao clicar em “Confirmar adoção”, o sistema chama a API de atualização de status enviando `{ id: animalId, status: "adopted" }`. Se o servidor confirmar a atualização, aparece mensagem “Confirmada a adoção do animal!” e a página recarrega (o animal desaparece da lista disponível). O status do animal fica como “adotado” no banco de dados.
- **Cenários alternativos:** (a) Se houver falha de conexão, aparece alerta (“Ocorreu um erro ao confirmar a adoção do animal, tente novamente”).

## 8. Remover animal da lista de adoção

**Como** dono do animal, **quero** excluir/remover meu anúncio de adoção **para** impedir novos interessados.

- **Cenário principal:** Na página “Meus Animais”, o usuário clica no ícone de lixeira (“Remover”) em um card de animal. O sistema chama a mesma API de atualização de status com `{ status: "removed" }`. Se bem-sucedido, exibe “Animal removido com sucesso!” e retira o animal da lista de disponíveis (simulando exclusão lógica).
- **Cenários alternativos:** (a) Se houver erro de rede, exibe alerta (“Ocorreu um erro ao remover o animal, tente novamente”).

## 9. Visualizar meus animais cadastrados

**Como** usuário autenticado, **quero** ver a lista de todos os meus animais que estão cadastrados para adoção **para** gerenciar cada um (confirmar adoção, remover, etc.).

- **Cenário principal:** O usuário acessa a página “Meus Animais”. O sistema chama a API de animais do usuário e retorna todos os animais cadastrados por ele com status “available”. Cada um é exibido em um cartão (igual aos da lista geral, porém com botões adicionais). O usuário vê nome, foto principal, tipo, sexo, e os botões “Confirmar adoção” e “Remover” em cada card.
- **Cenários alternativos:** (a) Se o usuário não tiver nenhum animal cadastrado (lista vazia), o sistema mostra um componente de estado vazio (“Você não cadastrou nenhum animal ainda”).

## 10. Atualizar informações do usuário

**Como** usuário autenticado, **quero** atualizar meus dados pessoais (nome, email e senha) **para** manter meu perfil correto no sistema.

- **Cenário principal:** O usuário vai à página de perfil (ou configurações) e altera, por exemplo, seu nome ou email no formulário. Ao submeter, o sistema chama a API de atualização de usuário enviando `{ id: userId, data: { name, email, password }}`. Se válido, a resposta é sucesso e o sistema exibe “Dados atualizados com sucesso!”.
- **Cenários alternativos:** (a) Se o email escolhido já existir em outro cadastro, a API retorna erro (“Email já cadastrado”) e a interface mostra a mensagem de validação correspondente. (b) Se o servidor rejeitar por erro qualquer campo, o sistema exibe a mensagem de falha e não altera os dados.
