export interface User {
  id: string;
  email: string;
  password: string; 
  name: string;
  allowed: boolean;
}
export const users: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'password123',
    name: 'Admin User',
    allowed: true
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'password123',
    name: 'Regular User',
    allowed: false
  }
];
export function findUserByEmail(email: string): User | undefined {
  return users.find(user => user.email === email);
}
export function findUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}
