import { authenticatorInstance, } from '../../providers/authenticator.js';
import { encrypterInstance } from '../../providers/encrypter.js';
import { userRepositoryInstance, } from '../../repositories/user.js';
import { Failure, Success } from '../../utils/either.js';
export class UserLoginService {
    userRepository;
    encrypter;
    authenticator;
    constructor(userRepository, encrypter, authenticator) {
        this.userRepository = userRepository;
        this.encrypter = encrypter;
        this.authenticator = authenticator;
    }
    async execute(params) {
        const { email, password } = params;
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            return Failure.create({ message: 'Email ou senha inválidos.' });
        }
        const isValidPassword = this.encrypter.compare(password, user.password);
        if (!isValidPassword) {
            return Failure.create({ message: 'Email ou senha inválidos.' });
        }
        const token = this.authenticator.generateToken({
            id: user.id,
            email: user.email,
            name: user.name,
        });
        return Success.create({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            token,
        });
    }
}
export const userLoginServiceInstance = new UserLoginService(userRepositoryInstance, encrypterInstance, authenticatorInstance);
