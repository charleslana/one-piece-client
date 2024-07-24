import api from '@/config/api';
import type { CreateUser } from '@/interfaces/user';

export default class UserService {
  private static baseUrl = '/user';

  static async register(createUser: CreateUser): Promise<void> {
    await api.post<void>(this.baseUrl, createUser);
  }
}
