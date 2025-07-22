import { Success } from '../../utils/either.js';
import { animalRepositoryInstance, } from '../../repositories/animal.js';
export class GetUserAnimalsService {
    animalRepository;
    constructor(animalRepository) {
        this.animalRepository = animalRepository;
    }
    async execute(params) {
        const { userId } = params;
        const animals = await this.animalRepository.findAllByUserId(userId);
        const formattedAnimals = animals.map((animal) => {
            return {
                ...animal,
                images: animal.images.map((image) => {
                    return image.imageData.toString('base64');
                }),
            };
        });
        return Success.create({ animals: formattedAnimals });
    }
}
export const getUserAnimalsServiceInstance = new GetUserAnimalsService(animalRepositoryInstance);
