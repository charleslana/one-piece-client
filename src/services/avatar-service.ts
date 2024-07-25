import api from '@/config/api';
import type { Avatar } from '@/interfaces/avatar';

export default class AvatarService {
  private static baseUrl = '/avatar';

  static async getAll(): Promise<Avatar[]> {
    const response = await api.get<Avatar[]>(this.baseUrl);
    return response.data;
  }
}
