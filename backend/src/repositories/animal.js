import { prisma } from '../database.js';
var AnimalStatusEnum;
(function (AnimalStatusEnum) {
    AnimalStatusEnum["available"] = "available";
    AnimalStatusEnum["adopted"] = "adopted";
    AnimalStatusEnum["removed"] = "removed";
})(AnimalStatusEnum || (AnimalStatusEnum = {}));
export class AnimalRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(params) {
        return this.repository.animal.create({ data: params });
    }
    async updateStatus({ id, status, userId, }) {
        return this.repository.animal.update({
            where: { id, userId },
            data: { status },
        });
    }
    async findAllAvailableNotFromUser(userId) {
        return this.repository.animal.findMany({
            where: { userId: { not: userId }, status: AnimalStatusEnum.available },
            include: { images: true },
        });
    }
    async findAllByUserId(userId) {
        return this.repository.animal.findMany({
            where: { userId, status: AnimalStatusEnum.available },
            include: { images: true },
        });
    }
}
export const animalRepositoryInstance = new AnimalRepository(prisma);
