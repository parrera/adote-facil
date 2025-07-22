import { createUserServiceInstance, } from '../../services/user/create-user.js';
class CreateUserController {
    createUser;
    constructor(createUser) {
        this.createUser = createUser;
    }
    async handle(request, response) {
        const { name, email, password } = request.body;
        try {
            const result = await this.createUser.execute({ name, email, password });
            const statusCode = result.isFailure() ? 400 : 201;
            return response.status(statusCode).json(result.value);
        }
        catch (err) {
            const error = err;
            console.log({ error });
            return response.status(500).json({ error: error.message });
        }
    }
}
export const createUserControllerInstance = new CreateUserController(createUserServiceInstance);
