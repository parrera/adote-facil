import { chatRepositoryInstance, } from '../../repositories/chat.js';
export class GetUserChatService {
    chatRepository;
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
    }
    async execute(params) {
        const { userId, chatId } = params;
        return this.chatRepository.getChatWithMessagesByUserAndChatId(userId, chatId);
    }
}
export const getUserChatServiceInstance = new GetUserChatService(chatRepositoryInstance);
