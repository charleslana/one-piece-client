import { Breed } from '@/enums/breed';
import { CharacterClass } from '@/enums/character-class';
import { Faction } from '@/enums/faction';
import { Sea } from '@/enums/sea';

export function getFaction(faction: Faction): string {
  switch (faction) {
    case Faction.Pirate:
      return 'Pirata';
    case Faction.Marine:
      return 'Marinha';
    case Faction.Revolutionary:
      return 'Revolucionário';
    default:
      return '';
  }
}

export function getSea(sea: Sea): string {
  switch (sea) {
    case Sea.NorthBlue:
      return 'North Blue';
    case Sea.EastBlue:
      return 'East Blue';
    case Sea.SouthBlue:
      return 'South Blue';
    case Sea.WestBlue:
      return 'West Blue';
    default:
      return '';
  }
}

export function getBreed(breed: Breed): string {
  switch (breed) {
    case Breed.Human:
      return 'Humano';
    case Breed.Dwarf:
      return 'Anão';
    case Breed.Giant:
      return 'Gigante';
    case Breed.Merman:
      return 'Tritão';
    case Breed.Cyborg:
      return 'Ciborgue';
    default:
      return '';
  }
}

export function getCharacterClass(characterClass: CharacterClass): string {
  switch (characterClass) {
    case CharacterClass.Swordsman:
      return 'Espadachim';
    case CharacterClass.Shooter:
      return 'Atirador';
    case CharacterClass.Fighter:
      return 'Lutador';
    default:
      return '';
  }
}
