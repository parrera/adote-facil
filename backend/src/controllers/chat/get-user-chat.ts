import { Request, Response } from 'express'
import {
  GetUserChatService,
  getUserChatServiceInstance,
} from '../../services/chat/get-user-chat.js'
import { StatusCodes } from 'http-status-codes'

class GetUserChatController {
  constructor(private readonly getUserChat: GetUserChatService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { chatId } = request.params

    const { user } = request

    try {
      const result = await this.getUserChat.execute({
        userId: user?.id || '',
        chatId,
      })

      return response.status(StatusCodes.OK).json(result)
    } catch (err) {
      const error = err as Error
      console.log({ error })
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message })
    }
  }
}

export const getUserChatControllerInstance = new GetUserChatController(
  getUserChatServiceInstance,
)
