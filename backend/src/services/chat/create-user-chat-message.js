import { userMessageRepositoryInstance, } from '../../repositories/user-message.js';
import { chatRepositoryInstance, } from '../../repositories/chat.js';
import { Failure, Success } from '../../utils/either.js';
export class CreateUserChatMessageService {
    chatRepository;
    userMessageRepository;
    constructor(chatRepository, userMessageRepository) {
        this.chatRepository = chatRepository;
        this.userMessageRepository = userMessageRepository;
    }
    async execute(params) {
        const { senderId, receiverId, content } = params;
        if (senderId === receiverId) {
            return Failure.create({ message: 'Sender id is equal to receiver id' });
        }
        const chat = await this.findOrCreateChat(senderId, receiverId);
        const message = await this.userMessageRepository.create({
            chatId: chat.id,
            senderId,
            content,
        });
        return Success.create(message);
    }
    async findOrCreateChat(senderId, receiverId) {
        const chat = await this.chatRepository.findOneByUsersId(senderId, receiverId);
        if (chat)
            return chat;
        return this.chatRepository.create({
            user1Id: senderId,
            user2Id: receiverId,
        });
    }
}
export const createUserChatMessageServiceInstance = new CreateUserChatMessageService(chatRepositoryInstance, userMessageRepositoryInstance);
