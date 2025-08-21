import { GetUserChatService } from './get-user-chat.js'
import { MockProxy, mock } from 'jest-mock-extended'
import { ChatRepository } from '../../repositories/chat.js'

describe('GetUserChatService', () => {
  let sut: GetUserChatService
  let chatRepository: MockProxy<ChatRepository>
  const mockChat = {
    id: 'chat1',
    user1: { id: 'user1', name: 'User 1' },
    user2: { id: 'user2', name: 'User 2' },
    messages: [{ id: 'msg1' }, { id: 'msg2' }],
  }

  beforeAll(() => {
    chatRepository = mock<ChatRepository>()
    sut = new GetUserChatService(chatRepository)
    chatRepository.getChatWithMessagesByUserAndChatId.mockResolvedValue(
      // @ts-expect-error mock
      mockChat,
    )
  })

  const defaultParams = { userId: 'user1', chatId: 'chat1' }

  test('should return chat with messages for given userId and chatId', async () => {
    const result = await sut.execute(defaultParams)
    expect(
      chatRepository.getChatWithMessagesByUserAndChatId,
    ).toHaveBeenCalledWith(defaultParams.userId, defaultParams.chatId)
    expect(result).toEqual(mockChat)
  })
})
