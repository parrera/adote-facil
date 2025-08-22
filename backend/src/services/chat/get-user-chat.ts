import { Chat } from '@prisma/client';

import {
  ChatRepository,
  chatRepositoryInstance,
} from '../../repositories/chat.js';

namespace GetUserChatDTO {
  export type Params = { userId: string; chatId: string };
  export type Result = Chat | null;
}

export class GetUserChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  async execute(params: GetUserChatDTO.Params): Promise<GetUserChatDTO.Result> {
    const { userId, chatId } = params;

    return this.chatRepository.getChatWithMessagesByUserAndChatId(
      userId,
      chatId
    );
  }
}

export const getUserChatServiceInstance = new GetUserChatService(
  chatRepositoryInstance
);
