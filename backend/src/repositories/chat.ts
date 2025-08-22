import { PrismaClient } from '@prisma/client';
import { prisma } from '../database.js';
import { CreateChatRepositoryDTO } from './chat.dto.js';

export class ChatRepository {
  constructor(private readonly repository: PrismaClient) {}

  async create(
    params: CreateChatRepositoryDTO.Params
  ): Promise<CreateChatRepositoryDTO.Result> {
    return this.repository.chat.create({ data: params });
  }

  async findOneByUsersId(user1Id: string, user2Id: string) {
    return this.repository.chat.findFirst({
      where: {
        OR: [
          { user1Id, user2Id },
          { user1Id: user2Id, user2Id: user1Id },
        ],
      },
    });
  }

  async getChatsAndLastMessageByUserId(userId: string) {
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

  async getChatWithMessagesByUserAndChatId(userId: string, chatId: string) {
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
