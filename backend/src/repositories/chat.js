import { prisma } from '../database.js';
export class ChatRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(params) {
        return this.repository.chat.create({ data: params });
    }
    async findOneByUsersId(user1Id, user2Id) {
        return this.repository.chat.findFirst({
            where: {
                OR: [
                    { user1Id, user2Id },
                    { user1Id: user2Id, user2Id: user1Id },
                ],
            },
        });
    }
    async getChatsAndLastMessageByUserId(userId) {
        return this.repository.chat.findMany({
            where: {
                OR: [{ user1Id: userId }, { user2Id: userId }],
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 1,
                },
                user1: { select: { id: true, name: true } },
                user2: { select: { id: true, name: true } },
            },
        });
    }
    async getChatWithMessagesByUserAndChatId(userId, chatId) {
        return this.repository.chat.findFirst({
            where: {
                id: chatId,
                OR: [{ user1Id: userId }, { user2Id: userId }],
            },
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' },
                },
                user1: { select: { id: true, name: true } },
                user2: { select: { id: true, name: true } },
            },
        });
    }
}
export const chatRepositoryInstance = new ChatRepository(prisma);
