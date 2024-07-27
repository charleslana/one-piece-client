import type { Breed } from '@/enums/breed';
import type { CharacterClass } from '@/enums/character-class';
import type { Faction } from '@/enums/faction';
import type { Sea } from '@/enums/sea';
import type { Page } from './page';
import type { UserAttribute } from './user-attribute';

export interface CreateUser {
  email: string;
  password: string;
}

export interface User {
  name: string | null;
  faction: Faction | null;
  sea: Sea | null;
  breed: Breed | null;
  characterClass: CharacterClass;
  level: number;
  coin: number;
  gold: number;
  exp: number;
  stamina: number;
  victoryPve: number;
  defeatPve: number;
  victoryPvp: number;
  defeatPvp: number;
  createdAt: string;
  updatedAt: string;
  guildTag: string | null;
  avatar: string | null;
  attribute: UserAttribute;
  battlePower: number;
  consecutiveVictory: number;
}

export interface UpdateUser {
  name: string;
  faction: Faction;
  sea: Sea;
  breed: Breed;
  characterClass: CharacterClass;
  avatarId: number;
}

export interface UserFilter extends Page {
  name?: string;
}

export interface UserTopByFaction {
  pirate: User[];
  marine: User[];
  revolutionary: User[];
}

export interface UserTopByCharacterClass {
  swordsman: User[];
  shooter: User[];
  fighter: User[];
}
