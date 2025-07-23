import { mock, MockProxy } from 'jest-mock-extended'

import { AnimalImageRepository } from '../../repositories/animal-image.js'
import { AnimalRepository } from '../../repositories/animal.js'
import { CreateAnimalDTO, CreateAnimalService } from './create-animal.js'
import { Failure, Success } from '../../utils/either.js'
import { Animal, AnimalStatus } from '@prisma/client'

describe('CreateAnimalService', () => {
  let sut: CreateAnimalService
  let animalRepository: MockProxy<AnimalRepository>
  let animalImageRepository: MockProxy<AnimalImageRepository>

  const mockAnimal = {
    id: '1',
    name: 'name',
    type: 'type',
    gender: 'Macho',
    race: 'race',
    description: 'description',
    userId: '1',
    status: AnimalStatus.available,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Animal

  beforeAll(() => {
    animalRepository = mock<AnimalRepository>()
    animalImageRepository = mock<AnimalImageRepository>()

    sut = new CreateAnimalService(animalRepository, animalImageRepository)

    animalRepository.create.mockResolvedValue(mockAnimal)
  })

  const defaultParams: CreateAnimalDTO.Params = {
    name: 'name',
    type: 'type',
    gender: 'Macho',
    race: 'race',
    description: 'description',
    userId: '1',
    pictures: [Buffer.from('pic1'), Buffer.from('pic2')],
  }

  test('should call animal repository with correct values', async () => {
    await sut.execute(defaultParams)

    expect(animalRepository.create).toHaveBeenCalledWith({
      name: defaultParams.name,
      type: defaultParams.type,
      gender: defaultParams.gender,
      race: defaultParams.race,
      description: defaultParams.description,
      userId: defaultParams.userId,
    })
  })

  test('should return failure if animal repository returns null', async () => {
    // @ts-expect-error mock
    animalRepository.create.mockResolvedValueOnce(null)

    const result = await sut.execute(defaultParams)

    expect(result).toEqual(
      Failure.create({ message: 'Erro ao criar o animal.' }),
    )
  })

  test('should call animal image repository with correct values', async () => {
    await sut.execute(defaultParams)

    for (const pic of defaultParams.pictures) {
      expect(animalImageRepository.create).toHaveBeenCalledWith({
        animalId: mockAnimal.id,
        imageData: pic,
      })
    }
  })

  test('should return success with animal if everything goes right', async () => {
    const result = await sut.execute(defaultParams)

    expect(result).toEqual(Success.create({ animal: mockAnimal }))
  })
})
