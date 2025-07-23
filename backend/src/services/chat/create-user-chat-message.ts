import { UserMessage } from '@prisma/client'

import {
  UserMessageRepository,
  userMessageRepositoryInstance,
} from '../../repositories/user-message.js'
import {
  ChatRepository,
  chatRepositoryInstance,
} from '../../repositories/chat.js'
import { Either, Failure, Success } from '../../utils/either.js'

export namespace CreateUserChatMessageDTO {
  export type Params = {
    senderId: string
    receiverId: string
    content: string
  }

  export type Failure = { message: string }

  export type Success = UserMessage

  export type Result = Either<Failure, Success>
}

export class CreateUserChatMessageService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly userMessageRepository: UserMessageRepository,
  ) {}

  async execute(
    params: CreateUserChatMessageDTO.Params,
  ): Promise<CreateUserChatMessageDTO.Result> {
    const { senderId, receiverId, content } = params

    if (senderId === receiverId) {
      return Failure.create({ message: 'Sender id is equal to receiver id' })
    }

    const chat = await this.findOrCreateChat(senderId, receiverId)

    const message = await this.userMessageRepository.create({
      chatId: chat.id,
      senderId,
      content,
    })

    return Success.create(message)
  }

  private async findOrCreateChat(senderId: string, receiverId: string) {
    const chat = await this.chatRepository.findOneByUsersId(
      senderId,
      receiverId,
    )

    if (chat) return chat

    return this.chatRepository.create({
      user1Id: senderId,
      user2Id: receiverId,
    })
  }
}

export const createUserChatMessageServiceInstance =
  new CreateUserChatMessageService(
    chatRepositoryInstance,
    userMessageRepositoryInstance,
  )
