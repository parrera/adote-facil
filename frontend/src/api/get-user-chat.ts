import { makeRequest } from '.';

export function getUserChat(token: string, chatId: string) {
  return makeRequest({
    url: `${process.env.NEXT_PUBLIC_API_URL}/users/chats/${chatId}`,
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
}
