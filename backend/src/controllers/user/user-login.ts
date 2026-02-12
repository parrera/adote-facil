import { Request, Response } from 'express'
import {
  UserLoginService,
  userLoginServiceInstance,
} from '../../services/user/user-login.js'
import { StatusCodes } from 'http-status-codes'

class UserLoginController {
  constructor(private readonly userLogin: UserLoginService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    try {
      const result = await this.userLogin.execute({ email, password })

      const statusCode = result.isFailure()
        ? StatusCodes.BAD_REQUEST
        : StatusCodes.CREATED

      return response.status(statusCode).json(result.value)
    } catch (err) {
      const error = err as Error
      console.log({ error })
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message })
    }
  }
}

export const userLoginControllerInstance = new UserLoginController(
  userLoginServiceInstance,
)
