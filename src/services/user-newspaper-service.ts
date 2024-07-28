import api from '@/config/api';
import type { CreateUserNewspaper } from '@/interfaces/user-newspaper';

export default class UserNewspaperService {
  private static baseUrl = '/user-newspaper';

  static async create(createUserNewspaper: CreateUserNewspaper): Promise<void> {
    await api.post<void>(this.baseUrl, createUserNewspaper);
  }

  static async exclude(id: number): Promise<void> {
    await api.delete<void>(`${this.baseUrl}/${id}`);
  }
}
