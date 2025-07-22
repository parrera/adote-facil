import { createUserChatServiceInstance, } from '../../services/chat/create-user-chat.js';
class CreateUserChatController {
    createUserChat;
    constructor(createUserChat) {
        this.createUserChat = createUserChat;
    }
    async handle(request, response) {
        const { userId } = request.body;
        const { user } = request;
        try {
            const result = await this.createUserChat.execute({
                user1Id: user?.id || '',
                user2Id: userId,
            });
            const status = result.isFailure() ? 400 : 201;
            return response.status(status).json(result.value);
        }
        catch (err) {
            const error = err;
            console.log({ error });
            return response.status(500).json({ error: error.message });
        }
    }
}
export const createUserChatControllerInstance = new CreateUserChatController(createUserChatServiceInstance);
