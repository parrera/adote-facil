import { getUserChatServiceInstance, } from '../../services/chat/get-user-chat.js';
class GetUserChatController {
    getUserChat;
    constructor(getUserChat) {
        this.getUserChat = getUserChat;
    }
    async handle(request, response) {
        const { chatId } = request.params;
        const { user } = request;
        try {
            const result = await this.getUserChat.execute({
                userId: user?.id || '',
                chatId,
            });
            return response.status(200).json(result);
        }
        catch (err) {
            const error = err;
            console.log({ error });
            return response.status(500).json({ error: error.message });
        }
    }
}
export const getUserChatControllerInstance = new GetUserChatController(getUserChatServiceInstance);
