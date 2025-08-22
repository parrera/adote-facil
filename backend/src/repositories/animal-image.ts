import { PrismaClient } from '@prisma/client';
import { prisma } from '../database.js';
import { CreateAnimalImageRepositoryDTO } from './animal-image.dto.js';

export class AnimalImageRepository {
  constructor(private readonly repository: PrismaClient) {}

  async create(
    params: CreateAnimalImageRepositoryDTO.Params
  ): Promise<CreateAnimalImageRepositoryDTO.Result> {
    return this.repository.animalImage.create({ data: params });
  }
}

export const animalImageRepositoryInstance = new AnimalImageRepository(prisma);
