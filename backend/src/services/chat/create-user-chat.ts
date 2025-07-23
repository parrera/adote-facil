import { Chat } from '@prisma/client'

import {
  ChatRepository,
  chatRepositoryInstance,
} from '../../repositories/chat.js'
import { Either, Failure, Success } from '../../utils/either.js'

export namespace CreateUserChatDTO {
  export type Params = {
    user1Id: string
    user2Id: string
  }

  export type Failure = { message: string }

  export type Success = { chat: Chat }

  export type Result = Either<Failure, Success>
}

export class CreateUserChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  async execute(
    params: CreateUserChatDTO.Params,
  ): Promise<CreateUserChatDTO.Result> {
    const { user1Id, user2Id } = params

    if (user1Id === user2Id) {
      return Failure.create({
        message: 'User cannot create a chat with himself',
      })
    }

    const chatAlreadyExists = await this.chatRepository.findOneByUsersId(
      user1Id,
      user2Id,
    )

    if (chatAlreadyExists) {
      return Success.create({ chat: chatAlreadyExists })
    }

    const chat = await this.chatRepository.create({ user1Id, user2Id })

    return Success.create({ chat })
  }
}

export const createUserChatServiceInstance = new CreateUserChatService(
  chatRepositoryInstance,
)
