import api from '@/config/api';
import type { CreateUser, User } from '@/interfaces/user';

export default class UserService {
  private static baseUrl = '/user';

  static async register(createUser: CreateUser): Promise<void> {
    await api.post<void>(this.baseUrl, createUser);
  }

  static async getMe(): Promise<User> {
    const response = await api.get<User>(`${this.baseUrl}/profile/me`);
    return response.data;
  }
}
