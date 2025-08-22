import { Chat } from '@prisma/client';

import {
  ChatRepository,
  chatRepositoryInstance,
} from '../../repositories/chat.js';

namespace GetUserChatsDTO {
  export type Params = { userId: string };

  export type Result = Chat[];
}
export class GetUserChatsService {
  constructor(private readonly chatRepository: ChatRepository) {}

  async execute(
    params: GetUserChatsDTO.Params
  ): Promise<GetUserChatsDTO.Result> {
    const { userId } = params;

    return this.chatRepository.getChatsAndLastMessageByUserId(userId);
  }
}

export const getUserChatsServiceInstance = new GetUserChatsService(
  chatRepositoryInstance
);
