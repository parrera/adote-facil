import { CreateUserService } from './create-user.js'
import { Failure, Success } from '../../utils/either.js'
import { MockProxy, mock } from 'jest-mock-extended'
import { UserRepository } from '../../repositories/user.js'
import { Encrypter } from '../../providers/encrypter.js'
import { User } from '@prisma/client'

describe('CreateUserService', () => {
  let sut: CreateUserService
  let encrypter: MockProxy<Encrypter>
  let userRepository: MockProxy<UserRepository>

  beforeAll(() => {
    encrypter = mock<Encrypter>()
    userRepository = mock<UserRepository>()
    sut = new CreateUserService(encrypter, userRepository)

    userRepository.findByEmail.mockResolvedValue(null)
    userRepository.create.mockResolvedValue({ id: '1' } as User)
    encrypter.encrypt.mockReturnValue('encrypted-password')
  })

  const defaultParams = {
    name: 'Test',
    email: 'test@mail.com',
    password: 'password',
  }

  test('should call findByEmail with correct email', async () => {
    await sut.execute(defaultParams)
    expect(userRepository.findByEmail).toHaveBeenCalledWith(defaultParams.email)
  })

  test('should return failure if email already exists', async () => {
    userRepository.findByEmail.mockResolvedValueOnce({ id: '1' } as User)
    const result = await sut.execute(defaultParams)
    expect(result).toEqual(Failure.create({ message: 'Email já cadastrado.' }))
  })

  test('should hash password before creating user', async () => {
    await sut.execute(defaultParams)
    expect(encrypter.encrypt).toHaveBeenCalledWith(defaultParams.password)
  })

  test('should create user with correct data', async () => {
    await sut.execute(defaultParams)
    expect(userRepository.create).toHaveBeenCalledWith({
      name: defaultParams.name,
      email: defaultParams.email,
      password: `encrypted-password`,
    })
  })

  test('should return created user', async () => {
    const result = await sut.execute(defaultParams)
    expect(result).toEqual(Success.create({ id: '1' }))
  })

  test('should propagate error when encrypter throws', async () => {
    encrypter.encrypt.mockImplementationOnce(() => {
      throw new Error('encryption error')
    })

    await expect(sut.execute(defaultParams)).rejects.toThrow('encryption error')
  })

  test('should propagate error when repository.create rejects', async () => {
    userRepository.create.mockRejectedValueOnce(new Error('DB failure'))

    await expect(sut.execute(defaultParams)).rejects.toThrow('DB failure')
  })

  test('success result should not expose password property', async () => {
    const result = await sut.execute(defaultParams)
    expect(result.isSuccess()).toBeTruthy()
    const value = (result as any).value
    expect(value).toHaveProperty('id')
    expect(value).not.toHaveProperty('password')
  })
})
