type Message = {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
};

type User = {
  id: string;
  name: string;
};

export type Chat = {
  id: string;
  user1: User;
  user2: User;
  messages: Message[];
};
