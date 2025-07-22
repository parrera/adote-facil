import { Failure, Success } from '../../utils/either.js';
import { animalRepositoryInstance, } from '../../repositories/animal.js';
export class UpdateAnimalStatusService {
    animalRepository;
    constructor(animalRepository) {
        this.animalRepository = animalRepository;
    }
    async execute(params) {
        const { id, status, userId } = params;
        const animal = await this.animalRepository.updateStatus({
            id,
            status,
            userId,
        });
        if (!animal) {
            return Failure.create({
                message: 'Erro ao atualizar o status do animal.',
            });
        }
        return Success.create({ animal });
    }
}
export const updateAnimalStatusServiceInstance = new UpdateAnimalStatusService(animalRepositoryInstance);
