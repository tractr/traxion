import { User } from '@prisma/client';
import { UserService } from '../../../../src/user/services/user.service';

export function mockUserServiceFactory(): UserService {
  return ({
    readOne: jest.fn(),
    create: jest.fn(),
    read: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown) as UserService;
}
export const mockUser: User = {
  id: 1,
  email: 'test@tractr.net',
  name: 'Test',
  password: 'test',
  banned: false,
  lastConnectedAt: new Date(),
  role: 'admin',
};
