import { User } from '@prisma/client';

export function userMockFactory(user: Partial<User> = {}): User {
  return {
    id: 1,
    email: 'test@tractr.net',
    name: 'Test',
    password: 'test',
    banned: false,
    lastConnectedAt: new Date(),
    role: 'admin',
    ...user,
  };
}
