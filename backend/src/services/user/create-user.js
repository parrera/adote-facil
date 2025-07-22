import { userRepositoryInstance, } from '../../repositories/user.js';
import { encrypterInstance } from '../../providers/encrypter.js';
import { Failure, Success } from '../../utils/either.js';
export class CreateUserService {
    encrypter;
    userRepository;
    constructor(encrypter, userRepository) {
        this.encrypter = encrypter;
        this.userRepository = userRepository;
    }
    async execute(params) {
        const { password } = params;
        const userAlreadyExists = await this.userRepository.findByEmail(params.email);
        if (userAlreadyExists) {
            return Failure.create({ message: 'Email já cadastrado.' });
        }
        const hashedPassword = this.encrypter.encrypt(password);
        const user = await this.userRepository.create({
            ...params,
            password: hashedPassword,
        });
        return Success.create(user);
    }
}
export const createUserServiceInstance = new CreateUserService(encrypterInstance, userRepositoryInstance);
