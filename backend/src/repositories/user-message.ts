import { PrismaClient } from '@prisma/client';
import { prisma } from '../database.js';
import { CreateUserChatMessageRepositoryDTO } from './user-message.dto.js';

export class UserMessageRepository {
  constructor(private readonly repository: PrismaClient) {}

  async create(
    data: CreateUserChatMessageRepositoryDTO.Params
  ): Promise<CreateUserChatMessageRepositoryDTO.Result> {
    return this.repository.userMessage.create({ data });
  }
}

export const userMessageRepositoryInstance = new UserMessageRepository(prisma);
