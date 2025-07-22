import { chatRepositoryInstance, } from '../../repositories/chat.js';
import { Failure, Success } from '../../utils/either.js';
export class CreateUserChatService {
    chatRepository;
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
    }
    async execute(params) {
        const { user1Id, user2Id } = params;
        if (user1Id === user2Id) {
            return Failure.create({
                message: 'User cannot create a chat with himself',
            });
        }
        const chatAlreadyExists = await this.chatRepository.findOneByUsersId(user1Id, user2Id);
        if (chatAlreadyExists) {
            return Success.create({ chat: chatAlreadyExists });
        }
        const chat = await this.chatRepository.create({ user1Id, user2Id });
        return Success.create({ chat });
    }
}
export const createUserChatServiceInstance = new CreateUserChatService(chatRepositoryInstance);
