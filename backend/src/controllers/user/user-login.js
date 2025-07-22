import { userLoginServiceInstance, } from '../../services/user/user-login.js';
class UserLoginController {
    userLogin;
    constructor(userLogin) {
        this.userLogin = userLogin;
    }
    async handle(request, response) {
        const { email, password } = request.body;
        try {
            const result = await this.userLogin.execute({ email, password });
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
export const userLoginControllerInstance = new UserLoginController(userLoginServiceInstance);
