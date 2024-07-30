import type { User } from './user';

export interface UserMessage {
  id: number;
  isRead: boolean;
  title: string;
  description: string;
  createdAt: string;
  sender: User | null;
}
