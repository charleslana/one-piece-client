import api from '@/config/api';
import type { Newspaper } from '@/interfaces/newspaper';

export default class NewspaperService {
  private static baseUrl = '/newspaper';

  static async getAll(): Promise<Newspaper[]> {
    const response = await api.get<Newspaper[]>(this.baseUrl);
    return response.data;
  }
}
