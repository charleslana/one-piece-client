import api from '@/config/api';
import type { UserMessage } from '@/interfaces/user-message';

export default class UserMessageService {
  private static baseUrl = '/user-message';

  static async getAll(): Promise<UserMessage[]> {
    const response = await api.get<UserMessage[]>(this.baseUrl);
    return response.data;
  }

  static async read(id: number): Promise<void> {
    await api.put<void>(`${this.baseUrl}/${id}`);
  }

  static async readAll(): Promise<void> {
    await api.put<void>(`${this.baseUrl}/read-all`);
  }
}
