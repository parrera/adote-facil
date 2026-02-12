import { Request, Response } from 'express'
import {
  GetUserChatsService,
  getUserChatsServiceInstance,
} from '../../services/chat/get-user-chats.js'
import { StatusCodes } from 'http-status-codes'

class GetUserChatsController {
  constructor(private readonly getUserChats: GetUserChatsService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request

    try {
      const result = await this.getUserChats.execute({
        userId: user?.id || '',
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

export const getUserChatsControllerInstance = new GetUserChatsController(
  getUserChatsServiceInstance,
)
