import { Request, Response } from 'express'
import {
  GetUserAnimalsService,
  getUserAnimalsServiceInstance,
} from '../../services/animal/get-user.js'
import { StatusCodes } from 'http-status-codes'

class GetUserAnimalsController {
  constructor(private readonly getUserAnimals: GetUserAnimalsService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request

    try {
      const result = await this.getUserAnimals.execute({
        userId: user?.id || '',
      })

      const statusCode = result.isFailure()
        ? StatusCodes.BAD_REQUEST
        : StatusCodes.OK

      return response.status(statusCode).json(result.value)
    } catch (err) {
      const error = err as Error
      console.error('Error creating animal:', error)
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message })
    }
  }
}

export const getUserAnimalsControllerInstance = new GetUserAnimalsController(
  getUserAnimalsServiceInstance,
)
