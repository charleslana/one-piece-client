import api from '@/config/api';
import type { UpdateUserCharacter } from '@/interfaces/user-character';

export default class UserCharacterService {
  private static baseUrl = '/user-character';

  static async updateUserCharacter(updateUserCharacter: UpdateUserCharacter): Promise<void> {
    await api.put<void>(this.baseUrl, updateUserCharacter);
  }
}
