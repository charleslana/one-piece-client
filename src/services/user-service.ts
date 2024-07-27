import api from '@/config/api';
import type ResultPaginated from '@/interfaces/result-paginated';
import type {
  CreateUser,
  UpdateUser,
  User,
  UserFilter,
  UserTopByCharacterClass,
  UserTopByFaction
} from '@/interfaces/user';

export default class UserService {
  private static baseUrl = '/user';

  static async register(createUser: CreateUser): Promise<void> {
    await api.post<void>(this.baseUrl, createUser);
  }

  static async getMe(): Promise<User> {
    const response = await api.get<User>(`${this.baseUrl}/me`);
    return response.data;
  }

  static async updateUser(updateUser: UpdateUser): Promise<void> {
    await api.put<void>(this.baseUrl, updateUser);
  }

  static async filterPaginated(filter: UserFilter): Promise<ResultPaginated<User>> {
    const response = await api.post<ResultPaginated<User>>(
      `${this.baseUrl}/filter?page=${filter.page}&pageSize=20`,
      filter
    );
    return response.data;
  }

  static async getTopByFaction(): Promise<UserTopByFaction> {
    const response = await api.get<UserTopByFaction>(`${this.baseUrl}/top-by-faction`);
    return response.data;
  }

  static async getTopByCharacterClass(): Promise<UserTopByCharacterClass> {
    const response = await api.get<UserTopByCharacterClass>(
      `${this.baseUrl}/top-by-character-class`
    );
    return response.data;
  }

  static async getTopByConsecutiveVictory(): Promise<User> {
    const response = await api.get<User>(`${this.baseUrl}/top-by-consecutive-victory`);
    return response.data;
  }

  static async getTopThreeByCoin(): Promise<User[]> {
    const response = await api.get<User[]>(`${this.baseUrl}/top-three-by-coin`);
    return response.data;
  }
}
