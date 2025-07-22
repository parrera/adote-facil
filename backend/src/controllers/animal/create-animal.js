import { createAnimalServiceInstance, } from '../../services/animal/create-animal.js';
class CreateAnimalController {
    createAnimal;
    constructor(createAnimal) {
        this.createAnimal = createAnimal;
    }
    async handle(request, response) {
        const { name, type, gender, race, description } = request.body;
        const { user } = request;
        const pictures = request.files;
        try {
            const pictureBuffers = pictures.map((file) => file.buffer);
            const result = await this.createAnimal.execute({
                name,
                type,
                gender,
                race,
                description,
                userId: user?.id || '',
                pictures: pictureBuffers,
            });
            const statusCode = result.isFailure() ? 400 : 201;
            return response.status(statusCode).json(result.value);
        }
        catch (err) {
            const error = err;
            console.error('Error creating animal:', error);
            return response.status(500).json({ error: error.message });
        }
    }
}
export const createAnimalControllerInstance = new CreateAnimalController(createAnimalServiceInstance);
