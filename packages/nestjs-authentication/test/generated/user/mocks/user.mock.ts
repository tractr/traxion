import { User } from '@prisma/client';
import { random, internet, lorem, date } from 'faker';

export function mockUserIdFactory(): User['id'] {
  return random.uuid();
}

export function mockUserNameFactory(): User['name'] {
  return lorem.words();
}

export function mockUserEmailFactory(): User['email'] {
  return internet.email();
}

export function mockUserPasswordFactory(): User['password'] {
  return internet.password();
}

export function mockUserRoleFactory(): User['role'] {
  return lorem.words();
}

export function mockUserBannedFactory(): User['banned'] {
  return random.boolean();
}

export function mockUserLastConnectedAtFactory(): NonNullable<
  User['lastConnectedAt']
> {
  return date.past();
}

export function mockUserFactory(override: Partial<User> = {}): User {
  return {
    id: mockUserIdFactory(),
    name: mockUserNameFactory(),
    email: mockUserEmailFactory(),
    password: mockUserPasswordFactory(),
    role: mockUserRoleFactory(),
    banned: mockUserBannedFactory(),
    lastConnectedAt: mockUserLastConnectedAtFactory(),
    ...override,
  };
}
