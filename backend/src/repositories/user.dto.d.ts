import { User } from '@prisma/client';

export namespace CreateUserRepositoryDTO {
  export type Params = {
    name: string;
    email: string;
    password: string;
  };

  export type Result = User;
}

export namespace UpdateUserRepositoryDTO {
  export type Params = {
    id: string;
    data: { name?: string; email?: string; password?: string };
  };

  export type Result = User;
}
