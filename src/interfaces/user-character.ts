import type { Breed } from '@/enums/breed';
import type { CharacterClass } from '@/enums/character-class';
import type { Faction } from '@/enums/faction';
import type { Sea } from '@/enums/sea';

export interface UserCharacter {
  name: string | null;
}

export interface UpdateUserCharacter {
  name: string;
  faction: Faction;
  sea: Sea;
  breed: Breed;
  class: CharacterClass;
}
