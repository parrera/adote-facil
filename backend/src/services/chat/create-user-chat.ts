import { Chat } from '@prisma/client'

import { Either, Failure, Success } from '../../utils/either.js'
import {
  ChatDomainService,
  chatDomainServiceInstance,
} from './chat-domain-service.js'

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
  constructor(private readonly chatDomainService: ChatDomainService) {}

  async execute(
    params: CreateUserChatDTO.Params,
  ): Promise<CreateUserChatDTO.Result> {
    const { user1Id, user2Id } = params

    if (user1Id === user2Id) {
      return Failure.create({
        message: 'User cannot create a chat with himself',
      })
    }

    const chat = await this.chatDomainService.findOrCreateChat(user1Id, user2Id)
    return Success.create({ chat })
  }
}

export const createUserChatServiceInstance = new CreateUserChatService(
  chatDomainServiceInstance,
)
