import { prisma } from '../database.js';
export class UserRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(params) {
        return this.repository.user.create({ data: params });
    }
    async update(params) {
        return this.repository.user.update({
            where: { id: params.id },
            data: params.data,
        });
    }
    async findById(id) {
        return this.repository.user.findUnique({ where: { id } });
    }
    async findByEmail(email) {
        return this.repository.user.findUnique({ where: { email } });
    }
}
export const userRepositoryInstance = new UserRepository(prisma);
