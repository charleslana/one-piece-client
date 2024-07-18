import images from '@/data/image';

export function getAvatar(id: number): string {
  switch (id) {
    case 1:
      return images.imageAvatar1;
    case 2:
      return images.imageAvatar2;
    case 3:
      return images.imageAvatar3;
    case 4:
      return images.imageAvatar4;
    case 5:
      return images.imageAvatar5;
    default:
      return '';
  }
}

export function getAvatarMini(id: number): string {
  switch (id) {
    case 1:
      return images.imageAvatar1Mini;
    case 2:
      return images.imageAvatar2Mini;
    case 3:
      return images.imageAvatar3Mini;
    case 4:
      return images.imageAvatar4Mini;
    case 5:
      return images.imageAvatar5Mini;
    default:
      return '';
  }
}
