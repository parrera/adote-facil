import { Animal, AnimalStatus } from '@prisma/client'
import { Either, Failure, Success } from '../../utils/either.js'
import {
  AnimalRepository,
  animalRepositoryInstance,
} from '../../repositories/animal.js'

export namespace UpdateAnimalStatusDTO {
  export type Params = {
    id: string
    status: AnimalStatus
    userId: string
  }

  export type Failure = { message: string }

  export type Success = { animal: Animal }

  export type Result = Either<Failure, Success>
}

export class UpdateAnimalStatusService {
  constructor(private readonly animalRepository: AnimalRepository) {}

  async execute(
    params: UpdateAnimalStatusDTO.Params,
  ): Promise<UpdateAnimalStatusDTO.Result> {
    const { id, status, userId } = params

    const animal = await this.animalRepository.updateStatus({
      id,
      status,
      userId,
    })

    if (!animal) {
      return Failure.create({
        message: 'Erro ao atualizar o status do animal.',
      })
    }

    return Success.create({ animal })
  }
}

export const updateAnimalStatusServiceInstance = new UpdateAnimalStatusService(
  animalRepositoryInstance,
)
