const accessTokenKey = 'accessToken';
const isCharacterCompletedKey = 'isCharacterCompleted';

export function saveAccessToken(token: string): void {
  localStorage.setItem(accessTokenKey, token);
}

export function getAccessToken(): string | null {
  return localStorage.getItem(accessTokenKey);
}

export function removeAccessToken(): void {
  localStorage.removeItem(accessTokenKey);
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}

export function saveCharacterCompleted(): void {
  localStorage.setItem(isCharacterCompletedKey, 'true');
}

export function getCharacterCompleted(): string | null {
  return localStorage.getItem(isCharacterCompletedKey);
}

export function removeCharacterCompleted(): void {
  localStorage.removeItem(isCharacterCompletedKey);
}

export function isCharacterCompleted(): boolean {
  return !!getCharacterCompleted();
}
