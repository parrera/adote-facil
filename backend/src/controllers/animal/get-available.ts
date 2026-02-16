import { Request, Response } from 'express'
import {
  GetAvailableAnimalsService,
  getAvailableAnimalsServiceInstance,
} from '../../services/animal/get-available.js'

class GetAvailableAnimalsController {
  constructor(
    private readonly getAvailableAnimals: GetAvailableAnimalsService,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request
    const { gender, type, name } = request.query

try {
  const genderParam =
    typeof gender === 'string' ? gender : undefined

  const typeParam =
    typeof type === 'string' ? type : undefined

  const nameParam =
    typeof name === 'string' ? name : undefined

  const result = await this.getAvailableAnimals.execute({
    userId: user?.id || '',
    gender: genderParam,
    type: typeParam,
    name: nameParam,
  })

      const statusCode = result.isFailure() ? 400 : 200

      return response.status(statusCode).json(result.value)
    } catch (err) {
      const error = err as Error
      console.error('Error creating animal:', error)
      return response.status(500).json({ error: error.message })
    }
  }
}

export const getAvailableAnimalsControllerInstance =
  new GetAvailableAnimalsController(getAvailableAnimalsServiceInstance)
