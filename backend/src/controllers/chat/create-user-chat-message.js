import { createUserChatMessageServiceInstance, } from '../../services/chat/create-user-chat-message.js';
class CreateUserChatMessageController {
    createUserChatMessage;
    constructor(createUserChatMessage) {
        this.createUserChatMessage = createUserChatMessage;
    }
    async handle(request, response) {
        const { receiverId, content } = request.body;
        const { user } = request;
        try {
            const result = await this.createUserChatMessage.execute({
                senderId: user?.id || '',
                receiverId,
                content,
            });
            return response.status(201).json(result);
        }
        catch (err) {
            const error = err;
            console.log({ error });
            return response.status(500).json({ error: error.message });
        }
    }
}
export const createUserChatMessageControllerInstance = new CreateUserChatMessageController(createUserChatMessageServiceInstance);
