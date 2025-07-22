import { prisma } from '../database.js';
export class UserMessageRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(data) {
        return this.repository.userMessage.create({ data });
    }
}
export const userMessageRepositoryInstance = new UserMessageRepository(prisma);
