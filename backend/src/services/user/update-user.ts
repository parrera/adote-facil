import { User } from '@prisma/client';
import {
  UserRepository,
  userRepositoryInstance,
} from '../../repositories/user.js';
import { Encrypter, encrypterInstance } from '../../providers/encrypter.js';
import { Either, Failure, Success } from '../../utils/either.js';

namespace UpdateUserDTO {
  export type Params = {
    id: string;
    data: { name?: string; email?: string; password?: string };
  };

  export type Failure = { message: string };

  export type Success = User;

  export type Result = Either<Failure, Success>;
}

export class UpdateUserService {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly userRepository: UserRepository
  ) {}

  async execute(params: UpdateUserDTO.Params): Promise<UpdateUserDTO.Result> {
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

  private getPassword(password?: string) {
    return password ? this.encrypter.encrypt(password) : undefined;
  }
}

export const updateUserServiceInstance = new UpdateUserService(
  encrypterInstance,
  userRepositoryInstance
);
