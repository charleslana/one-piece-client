import type { UserCharacter } from './user-character';

export interface CreateUser {
  email: string;
  password: string;
}

export interface User {
  userCharacter: UserCharacter;
}
