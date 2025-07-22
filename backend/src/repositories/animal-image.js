import { prisma } from '../database.js';
export class AnimalImageRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(params) {
        return this.repository.animalImage.create({ data: params });
    }
}
export const animalImageRepositoryInstance = new AnimalImageRepository(prisma);
