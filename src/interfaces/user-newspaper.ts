export interface CreateUserNewspaper {
  newspaperId: number;
  like: boolean;
}

export interface UserNewspaper {
  id: number;
  like: boolean;
  userId: number;
  newspaperId: number;
}
