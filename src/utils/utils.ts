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

export function logout(): void {
  router.push('/login');
}
