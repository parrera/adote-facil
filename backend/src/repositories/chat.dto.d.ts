import { Chat } from '@prisma/client';

export namespace CreateChatRepositoryDTO {
  export type Params = {
    user1Id: string;
    user2Id: string;
  };

  export type Result = Chat;
}
