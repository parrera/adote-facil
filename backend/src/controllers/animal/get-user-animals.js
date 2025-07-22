import { getUserAnimalsServiceInstance, } from '../../services/animal/get-user.js';
class GetUserAnimalsController {
    getUserAnimals;
    constructor(getUserAnimals) {
        this.getUserAnimals = getUserAnimals;
    }
    async handle(request, response) {
        const { user } = request;
        try {
            const result = await this.getUserAnimals.execute({
                userId: user?.id || '',
            });
            const statusCode = result.isFailure() ? 400 : 200;
            return response.status(statusCode).json(result.value);
        }
        catch (err) {
            const error = err;
            console.error('Error creating animal:', error);
            return response.status(500).json({ error: error.message });
        }
    }
}
export const getUserAnimalsControllerInstance = new GetUserAnimalsController(getUserAnimalsServiceInstance);
