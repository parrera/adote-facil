import { Animal } from '@prisma/client'
import { Either, Failure, Success } from '../../utils/either.js'
import {
  AnimalRepository,
  animalRepositoryInstance,
} from '../../repositories/animal.js'
import {
  AnimalImageRepository,
  animalImageRepositoryInstance,
} from '../../repositories/animal-image.js'

namespace CreateAnimalDTO {
  export type Params = {
    name: string
    type: string
    gender: 'macho' | 'femea'
    race?: string
    description?: string
    userId: string
    pictures: Buffer[] // Array de buffers contendo os dados das imagens
  }

  export type Failure = { message: string }

  export type Success = { animal: Animal }

  export type Result = Either<Failure, Success>
}

export class CreateAnimalService {
  constructor(
    private readonly animalRepository: AnimalRepository,
    private readonly animalImageRepository: AnimalImageRepository,
  ) {}

  async execute(
    params: CreateAnimalDTO.Params,
  ): Promise<CreateAnimalDTO.Result> {
    const { name, type, gender, race, description, userId, pictures } = params

    const animal = await this.animalRepository.create({
      name,
      type,
      gender,
      race,
      description,
      userId,
    })

    if (!animal) {
      return Failure.create({ message: 'Erro ao criar o animal.' })
    }

    const images = await Promise.all(
      pictures.map((picture) =>
        this.animalImageRepository.create({
          animalId: animal.id,
          imageData: picture,
        }),
      ),
    )

    if (!images) {
      return Failure.create({
        message: 'Erro ao salvar as imagens do animal.',
      })
    }

    return Success.create({ animal })
  }
}

export const createAnimalServiceInstance = new CreateAnimalService(
  animalRepositoryInstance,
  animalImageRepositoryInstance,
)
