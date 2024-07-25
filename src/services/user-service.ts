import api from '@/config/api';
import type { CreateUser, UpdateUser, User } from '@/interfaces/user';

export default class UserService {
  private static baseUrl = '/user';

  static async register(createUser: CreateUser): Promise<void> {
    await api.post<void>(this.baseUrl, createUser);
  }

  static async getMe(): Promise<User> {
    const response = await api.get<User>(`${this.baseUrl}/profile/me`);
    return response.data;
  }

  static async updateUser(updateUser: UpdateUser): Promise<void> {
    await api.put<void>(this.baseUrl, updateUser);
  }
}
