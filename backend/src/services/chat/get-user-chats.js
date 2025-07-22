import { chatRepositoryInstance, } from '../../repositories/chat.js';
export class GetUserChatsService {
    chatRepository;
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
    }
    async execute(params) {
        const { userId } = params;
        return this.chatRepository.getChatsAndLastMessageByUserId(userId);
    }
}
export const getUserChatsServiceInstance = new GetUserChatsService(chatRepositoryInstance);
