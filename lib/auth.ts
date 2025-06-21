import { User } from './users';
interface AuthData {
  isAuthenticated: boolean;
  userId: string;
  allowed: boolean;
  user?: Pick<User, 'name' | 'email'>;
}
export const setAuthToken = (user: User) => {
  const authData: AuthData = {
    isAuthenticated: true,
    userId: user.id,
    allowed: user.allowed,
    user: {
      name: user.name,
      email: user.email
    }
  };
  localStorage.setItem('authToken', JSON.stringify(authData));
  document.cookie = `authToken=${JSON.stringify(authData)}; path=/; max-age=86400`; 
};
export const getAuthData = (): AuthData | null => {
  if (typeof window === 'undefined') return null;
  const authToken = localStorage.getItem('authToken');
  if (!authToken) return null;
  try {
    return JSON.parse(authToken);
  } catch (e) {
    console.error('Failed to parse auth token', e);
    return null;
  }
};
export const isAuthenticated = (): boolean => {
  const authData = getAuthData();
  return authData?.isAuthenticated === true;
};
export const isAllowed = (): boolean => {
  const authData = getAuthData();
  return authData?.allowed === true;
};
export const getCurrentUser = (): Pick<User, 'name' | 'email'> | null => {
  const authData = getAuthData();
  return authData?.user || null;
};
export const clearAuth = (): void => {
  localStorage.removeItem('authToken');
  document.cookie = 'authToken=; path=/; max-age=0';
};
