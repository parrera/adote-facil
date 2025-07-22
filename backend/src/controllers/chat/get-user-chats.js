import { getUserChatsServiceInstance, } from '../../services/chat/get-user-chats.js';
class GetUserChatsController {
    getUserChats;
    constructor(getUserChats) {
        this.getUserChats = getUserChats;
    }
    async handle(request, response) {
        const { user } = request;
        try {
            const result = await this.getUserChats.execute({
                userId: user?.id || '',
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
export const getUserChatsControllerInstance = new GetUserChatsController(getUserChatsServiceInstance);
