import { GetUserChatsService } from './get-user-chats.js'
import { MockProxy, mock } from 'jest-mock-extended'
import { ChatRepository } from '../../repositories/chat.js'

describe('GetUserChatsService', () => {
  let sut: GetUserChatsService
  let chatRepository: MockProxy<ChatRepository>
  const mockChats = [{ id: 'chat1', messages: [{ id: 'msg1' }] }]

  beforeAll(() => {
    chatRepository = mock<ChatRepository>()
    sut = new GetUserChatsService(chatRepository)
    // @ts-expect-error mock
    chatRepository.getChatsAndLastMessageByUserId.mockResolvedValue(mockChats)
  })

  test('should return chats for given userId', async () => {
    const userId = 'user1'
    const result = await sut.execute({ userId })
    expect(chatRepository.getChatsAndLastMessageByUserId).toHaveBeenCalledWith(
      userId,
    )
    expect(result).toEqual(mockChats)
  })
})
