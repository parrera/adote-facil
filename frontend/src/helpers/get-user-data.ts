import { UserData } from '@/@types/user-data';

export function getUserData(): UserData | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const user = localStorage.getItem('user');

  if (!user) return null;

  return JSON.parse(user);
}
