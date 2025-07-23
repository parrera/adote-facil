import { UserLoginService } from './user-login.js'
import { Failure, Success } from '../../utils/either.js'
import { MockProxy, mock } from 'jest-mock-extended'
import { UserRepository } from '../../repositories/user.js'
import { Encrypter } from '../../providers/encrypter.js'
import { Authenticator } from '../../providers/authenticator.js'
import { User } from '@prisma/client'

describe('UserLoginService', () => {
  let sut: UserLoginService
  let userRepository: MockProxy<UserRepository>
  let encrypter: MockProxy<Encrypter>
  let authenticator: MockProxy<Authenticator>

  const user = {
    id: 'user1',
    email: 'test@mail.com',
    name: 'Test User',
    password: 'hashed-password',
  } as User

  beforeEach(() => {
    userRepository = mock<UserRepository>()
    encrypter = mock<Encrypter>()
    authenticator = mock<Authenticator>()
    sut = new UserLoginService(userRepository, encrypter, authenticator)

    userRepository.findByEmail.mockResolvedValue(user)
    encrypter.compare.mockReturnValue(true)
    authenticator.generateToken.mockReturnValue('token')
  })

  const defaultParams = { email: 'email@mail.com', password: '12345678' }

  test('should call findByEmail with correct email', async () => {
    await sut.execute(defaultParams)
    expect(userRepository.findByEmail).toHaveBeenCalledWith(defaultParams.email)
  })

  test('should return failure if user not found', async () => {
    userRepository.findByEmail.mockResolvedValue(null)
    const result = await sut.execute(defaultParams)
    expect(result).toEqual(
      Failure.create({ message: 'Email ou senha inválidos.' }),
    )
  })

  test('should call compare with correct password', async () => {
    await sut.execute(defaultParams)
    expect(encrypter.compare).toHaveBeenCalledWith(
      defaultParams.password,
      user.password,
    )
  })

  test('should return failure if password is invalid', async () => {
    encrypter.compare.mockReturnValue(false)
    const result = await sut.execute(defaultParams)
    expect(result).toEqual(
      Failure.create({ message: 'Email ou senha inválidos.' }),
    )
  })

  test('should call generateToken with correct user data', async () => {
    await sut.execute(defaultParams)
    expect(authenticator.generateToken).toHaveBeenCalledWith({
      id: user.id,
      email: user.email,
      name: user.name,
    })
  })

  test('should return success with user and token', async () => {
    const result = await sut.execute(defaultParams)
    expect(result).toEqual(
      Success.create({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token: 'token',
      }),
    )
  })
})
