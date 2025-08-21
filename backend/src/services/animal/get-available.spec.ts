import { mock, MockProxy } from 'jest-mock-extended'
import { AnimalRepository } from '../../repositories/animal.js'
import {
  GetAvailableAnimalsDTO,
  GetAvailableAnimalsService,
} from './get-available.js'
import { Success } from '../../utils/either.js'
import { Animal, AnimalImage, AnimalStatus } from '@prisma/client'

describe('GetAvailableAnimalsService', () => {
  let sut: GetAvailableAnimalsService
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
    sut = new GetAvailableAnimalsService(animalRepository)
    animalRepository.findAllAvailableNotFromUser.mockResolvedValue(mockAnimals)
  })

  const defaultParams: GetAvailableAnimalsDTO.Params = {
    userId: '1',
    gender: 'Macho',
    type: 'type',
    name: 'name',
  }

  test('should call animalRepository.findAllAvailableNotFromUser with correct filters', async () => {
    await sut.execute(defaultParams)
    expect(animalRepository.findAllAvailableNotFromUser).toHaveBeenCalledWith(
      defaultParams,
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
