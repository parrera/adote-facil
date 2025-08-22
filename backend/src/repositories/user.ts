import { PrismaClient } from '@prisma/client';
import { prisma } from '../database.js';
import {
  CreateUserRepositoryDTO,
  UpdateUserRepositoryDTO,
} from './user.dto.js';

export class UserRepository {
  constructor(private readonly repository: PrismaClient) {}

  async create(
    params: CreateUserRepositoryDTO.Params
  ): Promise<CreateUserRepositoryDTO.Result> {
    return this.repository.user.create({ data: params });
  }

  async update(params: UpdateUserRepositoryDTO.Params) {
    return this.repository.user.update({
      where: { id: params.id },
      data: params.data,
    });
  }

  async findById(id: string) {
    return this.repository.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.repository.user.findUnique({ where: { email } });
  }
}

export const userRepositoryInstance = new UserRepository(prisma);
