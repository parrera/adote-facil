import { Request, Response } from 'express'
import {
  CreateUserChatService,
  createUserChatServiceInstance,
} from '../../services/chat/create-user-chat.js'
import { StatusCodes } from 'http-status-codes'

class CreateUserChatController {
  constructor(private readonly createUserChat: CreateUserChatService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.body
    const { user } = request

    try {
      const result = await this.createUserChat.execute({
        user1Id: user?.id || '',
        user2Id: userId,
      })

      const status = result.isFailure()
        ? StatusCodes.BAD_REQUEST
        : StatusCodes.CREATED

      return response.status(status).json(result.value)
    } catch (err) {
      const error = err as Error
      console.log({ error })
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message })
    }
  }
}

export const createUserChatControllerInstance = new CreateUserChatController(
  createUserChatServiceInstance,
)
