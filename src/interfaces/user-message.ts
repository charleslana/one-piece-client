import type { User } from './user';

export interface UserMessage {
  id: number;
  isRead: boolean;
  title: string;
  description: string;
  createdAt: string;
  sender: User | null;
}

export interface CreateUserMessage {
  name: string;
  title: string;
  description: string;
}
