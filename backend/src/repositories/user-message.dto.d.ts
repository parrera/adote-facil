import { UserMessage } from '@prisma/client';

export namespace CreateUserChatMessageRepositoryDTO {
  export type Params = {
    chatId: string;
    senderId: string;
    content: string;
  };

  export type Result = UserMessage;
}
