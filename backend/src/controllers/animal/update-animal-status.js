import { updateAnimalStatusServiceInstance, } from '../../services/animal/update-animal-status.js';
class UpdateAnimalStatusController {
    updateAnimalStatus;
    constructor(updateAnimalStatus) {
        this.updateAnimalStatus = updateAnimalStatus;
    }
    async handle(request, response) {
        const { status } = request.body;
        const { id } = request.params;
        const { user } = request;
        try {
            const result = await this.updateAnimalStatus.execute({
                id,
                status,
                userId: user?.id || '',
            });
            const statusCode = result.isFailure() ? 400 : 200;
            return response.status(statusCode).json(result.value);
        }
        catch (err) {
            const error = err;
            console.error('Error updating animal:', error);
            return response.status(500).json({ error: error.message });
        }
    }
}
export const updateAnimalStatusControllerInstance = new UpdateAnimalStatusController(updateAnimalStatusServiceInstance);
