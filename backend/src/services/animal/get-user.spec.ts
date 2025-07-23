import { GetUserAnimalsService } from './get-user.js'
import { Success } from '../../utils/either.js'
import { Animal, AnimalImage, AnimalStatus } from '@prisma/client'
import { MockProxy, mock } from 'jest-mock-extended'
import { AnimalRepository } from '../../repositories/animal.js'

describe('GetUserAnimalsService', () => {
  let sut: GetUserAnimalsService
  let animalRepository: MockProxy<AnimalRepository>

  const mockAnimals: Array<Animal & { images: AnimalImage[] }> = [
    {
      id: '1',
      name: 'name',
      type: 'type',
      gender: 'Macho',
      race: 'race',
      description: 'description',
      userId: '2',
      status: AnimalStatus.available,
      createdAt: new Date(),
      updatedAt: new Date(),
      images: [{ imageData: Buffer.from('image1') } as AnimalImage],
    },
  ]

  beforeAll(() => {
    animalRepository = mock<AnimalRepository>()
    sut = new GetUserAnimalsService(animalRepository)
    animalRepository.findAllByUserId.mockResolvedValue(mockAnimals)
  })

  const defaultParams = { userId: '1' }

  test('should call animalRepository.findAllByUserId with correct userId', async () => {
    await sut.execute(defaultParams)
    expect(animalRepository.findAllByUserId).toHaveBeenCalledWith(
      defaultParams.userId,
    )
  })

  test('should return success with formatted animals', async () => {
    const result = await sut.execute(defaultParams)
    expect(result).toEqual(
      Success.create({
        animals: mockAnimals.map((animal) => {
          return {
            ...animal,
            images: animal.images.map((image) => {
              return image.imageData.toString('base64')
            }),
          }
        }),
      }),
    )
  })
})
