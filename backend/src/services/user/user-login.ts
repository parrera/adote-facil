import {
  Authenticator,
  authenticatorInstance,
} from "../../providers/authenticator.js";
import { Encrypter, encrypterInstance } from "../../providers/encrypter.js";
import {
  UserRepository,
  userRepositoryInstance,
} from "../../repositories/user.js";
import { Either, Failure, Success } from "../../utils/either.js";

export type UserLoginParams = {
  email: string;
  password: string;
};

export type UserLoginFailure = {
  message: string;
};

export type UserLoginSuccess = {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
};

export type UserLoginResult = Either<UserLoginFailure, UserLoginSuccess>;

export class UserLoginService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypter: Encrypter,
    private readonly authenticator: Authenticator
  ) {}

  async execute(params: UserLoginParams): Promise<UserLoginResult> {
    const { email, password } = params;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return Failure.create({ message: "Email ou senha invÃ¡lidos." });
    }

    const isValidPassword = this.encrypter.compare(password, user.password);

    if (!isValidPassword) {
      return Failure.create({ message: "Email ou senha invÃ¡lidos." });
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

export const userLoginServiceInstance = new UserLoginService(
  userRepositoryInstance,
  encrypterInstance,
  authenticatorInstance
);
