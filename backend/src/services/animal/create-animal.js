import { Failure, Success } from '../../utils/either.js';
import { animalRepositoryInstance, } from '../../repositories/animal.js';
import { animalImageRepositoryInstance, } from '../../repositories/animal-image.js';
export class CreateAnimalService {
    animalRepository;
    animalImageRepository;
    constructor(animalRepository, animalImageRepository) {
        this.animalRepository = animalRepository;
        this.animalImageRepository = animalImageRepository;
    }
    async execute(params) {
        const { name, type, gender, race, description, userId, pictures } = params;
        const animal = await this.animalRepository.create({
            name,
            type,
            gender,
            race,
            description,
            userId,
        });
        if (!animal) {
            return Failure.create({ message: 'Erro ao criar o animal.' });
        }
        const images = await Promise.all(pictures.map((picture) => this.animalImageRepository.create({
            animalId: animal.id,
            imageData: picture,
        })));
        if (!images) {
            return Failure.create({
                message: 'Erro ao salvar as imagens do animal.',
            });
        }
        return Success.create({ animal });
    }
}
export const createAnimalServiceInstance = new CreateAnimalService(animalRepositoryInstance, animalImageRepositoryInstance);
