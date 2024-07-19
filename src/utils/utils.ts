import router from '@/router';

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidName(name: string): boolean {
  const regex = /^[a-zA-Z ]*$/;
  return regex.test(name);
}

export function isDaytimeNow(): boolean {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 6 && hour < 18;
}

export function formatDate(data: Date): string {
  const dia = data.getDate().toString().padStart(2, '0');
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const ano = data.getFullYear().toString().slice(-2);
  return `${dia}/${mes}/${ano}`;
}

export function formatFullDate(data: Date): string {
  const day = data.getDate().toString().padStart(2, '0');
  const month = (data.getMonth() + 1).toString().padStart(2, '0');
  const year = data.getFullYear().toString();
  const hours = data.getHours().toString().padStart(2, '0');
  const minutes = data.getMinutes().toString().padStart(2, '0');
  const seconds = data.getSeconds().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export function logout(): void {
  router.push('/login');
}
