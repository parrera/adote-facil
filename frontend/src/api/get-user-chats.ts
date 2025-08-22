import { makeRequest } from '.';

export function getUserChats(token: string) {
  return makeRequest({
    url: `${process.env.NEXT_PUBLIC_API_URL}/users/chats`,
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
}
