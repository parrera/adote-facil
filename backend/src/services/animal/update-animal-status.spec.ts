import { mock, MockProxy } from 'jest-mock-extended'
import { AnimalRepository } from '../../repositories/animal.js'
import {
  UpdateAnimalStatusDTO,
  UpdateAnimalStatusService,
} from './update-animal-status.js'
import { Failure, Success } from '../../utils/either.js'
import { Animal, AnimalStatus } from '@prisma/client'

describe('UpdateAnimalStatusService', () => {
  let sut: UpdateAnimalStatusService
  let animalRepository: MockProxy<AnimalRepository>

  const mockAnimal = {
    id: '1',
    status: AnimalStatus.available,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Animal

  beforeAll(() => {
    animalRepository = mock<AnimalRepository>()
    sut = new UpdateAnimalStatusService(animalRepository)
    animalRepository.updateStatus.mockResolvedValue(mockAnimal)
  })

  const defaultParams: UpdateAnimalStatusDTO.Params = {
    id: '1',
    status: AnimalStatus.available,
    userId: '1',
  }

  test('should call animalRepository.updateStatus with correct values', async () => {
    await sut.execute(defaultParams)
    expect(animalRepository.updateStatus).toHaveBeenCalledWith(defaultParams)
  })

  test('should return failure if repository returns null', async () => {
    // @ts-expect-error mock
    animalRepository.updateStatus.mockResolvedValueOnce(null)
    const result = await sut.execute(defaultParams)
    expect(result).toEqual(
      Failure.create({ message: 'Erro ao atualizar o status do animal.' }),
    )
  })

  test('should return success with animal when updated', async () => {
    const result = await sut.execute(defaultParams)
    expect(result).toEqual(Success.create({ animal: mockAnimal }))
  })
})
