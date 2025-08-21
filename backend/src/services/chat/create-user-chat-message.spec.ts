import { CreateUserChatMessageService } from './create-user-chat-message.js'
import { Failure, Success } from '../../utils/either.js'
import { MockProxy, mock } from 'jest-mock-extended'
import { ChatRepository } from '../../repositories/chat.js'
import { UserMessageRepository } from '../../repositories/user-message.js'
import { Chat } from '@prisma/client'

describe('CreateUserChatMessageService', () => {
  let sut: CreateUserChatMessageService
  let chatRepository: MockProxy<ChatRepository>
  let userMessageRepository: MockProxy<UserMessageRepository>

  beforeAll(() => {
    chatRepository = mock<ChatRepository>()
    userMessageRepository = mock<UserMessageRepository>()
    sut = new CreateUserChatMessageService(
      chatRepository,
      userMessageRepository,
    )

    chatRepository.findOneByUsersId.mockResolvedValue(null)
    chatRepository.create.mockResolvedValue({ id: 'new_chat' } as Chat)
  })

  const defaultParams = {
    senderId: 'user1',
    receiverId: 'user2',
    content: 'Hello',
  }

  test('should fail if senderId equals receiverId', async () => {
    const result = await sut.execute({
      ...defaultParams,
      senderId: 'user1',
      receiverId: 'user1',
    })
    expect(result).toEqual(
      Failure.create({ message: 'Sender id is equal to receiver id' }),
    )
  })

  test('should check if chat already exists', async () => {
    await sut.execute(defaultParams)
    expect(chatRepository.findOneByUsersId).toHaveBeenCalledWith(
      defaultParams.senderId,
      defaultParams.receiverId,
    )
  })

  test('should use existing chat id to create message', async () => {
    chatRepository.findOneByUsersId.mockResolvedValueOnce({
      id: 'existing_chat',
    } as Chat)
    await sut.execute(defaultParams)
    expect(userMessageRepository.create).toHaveBeenCalledWith({
      chatId: 'existing_chat',
      senderId: defaultParams.senderId,
      content: defaultParams.content,
    })
  })

  test('should create a new chat and use its id to create message if it not exists', async () => {
    await sut.execute(defaultParams)
    expect(chatRepository.create).toHaveBeenCalledWith({
      user1Id: defaultParams.senderId,
      user2Id: defaultParams.receiverId,
    })
    expect(userMessageRepository.create).toHaveBeenCalledWith({
      chatId: 'new_chat',
      senderId: defaultParams.senderId,
      content: defaultParams.content,
    })
  })

  test('should return message on success', async () => {
    // @ts-expect-error mock
    userMessageRepository.create.mockResolvedValue({ id: 'message1' })
    const result = await sut.execute(defaultParams)
    expect(result).toEqual(Success.create({ id: 'message1' }))
  })
})
