import api from '@/config/api';
import type { CreateUserMessage, UserMessage } from '@/interfaces/user-message';

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

  static async delete(id: number): Promise<void> {
    await api.delete<void>(`${this.baseUrl}/${id}`);
  }

  static async deleteAll(): Promise<void> {
    await api.delete<void>(`${this.baseUrl}/all`);
  }

  static async create(createUserMessage: CreateUserMessage): Promise<void> {
    await api.post<void>(this.baseUrl, createUserMessage);
  }
}
