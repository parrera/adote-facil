import {
  ChatRepository,
  chatRepositoryInstance,
} from '../../repositories/chat.js'

export class ChatDomainService {
  constructor(private readonly chatRepository: ChatRepository) {}

  async findOrCreateChat(user1Id: string, user2Id: string) {
    const chat = await this.chatRepository.findOneByUsersId(user1Id, user2Id)

    if (chat) return chat

    return this.chatRepository.create({ user1Id, user2Id })
  }
}

export const chatDomainServiceInstance = new ChatDomainService(
  chatRepositoryInstance,
)
