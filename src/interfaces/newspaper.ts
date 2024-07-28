import type { UserNewspaper } from './user-newspaper';

export interface Newspaper {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  usersNewspaper: UserNewspaper[];
}
