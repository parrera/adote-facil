import { CreateUserChatService } from './create-user-chat.js'
import { Failure, Success } from '../../utils/either.js'
import { MockProxy, mock } from 'jest-mock-extended'
import { ChatRepository } from '../../repositories/chat.js'
import { Chat } from '@prisma/client'

describe('CreateUserChatService', () => {
  let sut: CreateUserChatService
  let chatRepository: MockProxy<ChatRepository>

  beforeAll(() => {
    chatRepository = mock<ChatRepository>()
    sut = new CreateUserChatService(chatRepository)
  })

  const defaultParams = { user1Id: 'user1', user2Id: 'user2' }

  test('should fail if user creates chat with himself', async () => {
    const result = await sut.execute({ ...defaultParams, user2Id: 'user1' })
    expect(result).toEqual(
      Failure.create({ message: 'User cannot create a chat with himself' }),
    )
  })

  test('should return existing chat if found', async () => {
    chatRepository.findOneByUsersId.mockResolvedValueOnce({
      id: 'existing_chat',
    } as Chat)
    const result = await sut.execute(defaultParams)
    expect(chatRepository.findOneByUsersId).toHaveBeenCalledWith(
      'user1',
      'user2',
    )
    expect(result).toEqual(Success.create({ chat: { id: 'existing_chat' } }))
  })

  test('should create new chat if not found', async () => {
    chatRepository.create.mockResolvedValueOnce({ id: 'new_chat' } as Chat)
    const result = await sut.execute(defaultParams)
    expect(chatRepository.create).toHaveBeenCalledWith({
      user1Id: 'user1',
      user2Id: 'user2',
    })
    expect(result).toEqual(Success.create({ chat: { id: 'new_chat' } }))
  })
})
