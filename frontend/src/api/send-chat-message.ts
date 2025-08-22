import { makeRequest } from '.';

type SendMessageData = {
  receiverId: string;
  content: string;
};

export function sendChatMessage(token: string, data: SendMessageData) {
  return makeRequest({
    url: `${process.env.NEXT_PUBLIC_API_URL}/users/chats/messages`,
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    data,
  });
}
