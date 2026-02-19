# 1.Como cadastrador quero adicionar os dados do animal a ser entregue para adoção no sistema
## Inicial: O cliente vai para tela de "disponibilizar animal para adoção"
## Normal: O cliente coloca imagem, nome, peso, tamanho, idade, raça, genêro e outras observações necessárias dentro do sistema para serem vísiveis aos outros usuários
## O que pode dar errado: É possível colocar cópias do mesmo pet com os mesmos dados no sistema(não se verifica repetição)
## Outros: Falta de moderação nos conteúdos(ambos de pet e de conversas) pode ser problemático
## Conclusão: O pet fica na tela de disponível para adoção no site

# 2.Como cadastrador quero colocar o pet cadastrado do sistema como adotado
## Inicial: O cliente vai a tela de pets cadastrado por ele
## Normal: O pet clica no botão de "adotado"
## O que pode dar errado: missclicks sem confirmação
## Outros: Ele pode também remover o pet caso precise recadastrar ou simplesmente não tem mais o pet com ele
## Conclusão: Os dados do pet se removem do banco de dados

# 3.Como usuário quero adotar um pet
## Inicial: Vendo os animais disponíveis para adoção, clico em algum deles
## Normal: Os dados do pet aparecem na tela, e uma opção de "saiba mais", que envia a tela de chat
## O que pode dar errado: 
## Outros: Possível filtrar pets por caracteristicas deles
## Conclusão: A tela de chat aparece e a comunicação com o cadastrador do pet inicia

# 4.Como cadastrador conversar com os interessados pelo pet que eu cadastrei
## Inicial: Na tela inicial vejo a notificação de que recebi uma mensagem de um usuário
## Normal: O cadastrador manda mensagens para o usuário na tela de chatting
## O que pode dar errado: Não se informa por qual pet a pessoa entrou em contato automaticamente
## Outros: O nome de ambos o cadastrador e usuário podem mudar, na tela de chat também mudam
## Conclusão: A tela de chat aparece e a comunicação com o cadastrador do pet inicia

# 5.Como administrador quero enviar mensagem à um usuário que colocou um pet para adoção
## Inicial: O administrador clica no usuário e aparece a tela de chat
## Normal: Ele manda a mensagem desejada e talvez remova o pet colocado para adoção tmeporariamente
## O que pode dar errado: 
## Outros: Os dados de presença do usuário podem ser vísiveis para o administrador
## Conclusão: O administrador se resolveu com o usuário
