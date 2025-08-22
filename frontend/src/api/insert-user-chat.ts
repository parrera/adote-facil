import { makeRequest } from '.';

export async function insertUserChat(userId: string, token: string) {
  return makeRequest({
    url: `${process.env.NEXT_PUBLIC_API_URL}/users/chats`,
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    data: { userId },
  });
}
