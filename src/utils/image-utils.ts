import images from '@/data/image';

export function getHistory(id: number): string {
  switch (id) {
    case 1:
      return images.imageHistory1;
    default:
      return '';
  }
}
