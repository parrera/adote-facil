import { Request, Response } from 'express';
import {
  GetAvailableAnimalsService,
  getAvailableAnimalsServiceInstance,
} from '../../services/animal/get-available.js';

class GetAvailableAnimalsController {
  constructor(
    private readonly getAvailableAnimals: GetAvailableAnimalsService
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    try {
      const result = await this.getAvailableAnimals.execute({
        userId: user?.id || '',
      });

      const statusCode = result.isFailure() ? 400 : 200;

      return response.status(statusCode).json(result.value);
    } catch (err) {
      const error = err as Error;
      console.error('Error creating animal:', error);
      return response.status(500).json({ error: error.message });
    }
  }
}

export const getAvailableAnimalsControllerInstance =
  new GetAvailableAnimalsController(getAvailableAnimalsServiceInstance);
