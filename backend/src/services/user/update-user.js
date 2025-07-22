import { userRepositoryInstance, } from '../../repositories/user.js';
import { encrypterInstance } from '../../providers/encrypter.js';
import { Failure, Success } from '../../utils/either.js';
export class UpdateUserService {
    encrypter;
    userRepository;
    constructor(encrypter, userRepository) {
        this.encrypter = encrypter;
        this.userRepository = userRepository;
    }
    async execute(params) {
        const { id, data } = params;
        if (!data.name && !data.email && !data.password) {
            return Failure.create({ message: 'Nenhum dado foi informado' });
        }
        const userExists = await this.userRepository.findById(id);
        if (!userExists) {
            return Failure.create({ message: 'Usuário não encontrado' });
        }
        const password = this.getPassword(data.password);
        const user = await this.userRepository.update({
            id,
            data: { ...data, password },
        });
        return Success.create(user);
    }
    getPassword(password) {
        return password ? this.encrypter.encrypt(password) : undefined;
    }
}
export const updateUserServiceInstance = new UpdateUserService(encrypterInstance, userRepositoryInstance);
