import { User } from '@prisma/client';
import { date, internet, lorem, random } from 'faker';

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

export function mockUserBannedFactory(): User['banned'] {
  return random.boolean();
}

export function mockUserLastConnectedAtFactory(): NonNullable<
  User['lastConnectedAt']
> {
  return date.past();
}

export function mockUserAgeFactory(): User['age'] {
  return random.number();
}

export function mockUserBlogUrlFactory(): User['blogUrl'] {
  return internet.url();
}

export function mockUserListFactory(): User['list'] {
  return [...Array(3)].map(() => lorem.words());
}

export function mockUserRoleIdFactory(): User['roleId'] {
  return random.uuid();
}

export function mockUserFactory(override: Partial<User> = {}): User {
  return {
    id: mockUserIdFactory(),
    name: mockUserNameFactory(),
    email: mockUserEmailFactory(),
    password: mockUserPasswordFactory(),
    banned: mockUserBannedFactory(),
    lastConnectedAt: mockUserLastConnectedAtFactory(),
    age: mockUserAgeFactory(),
    blogUrl: mockUserBlogUrlFactory(),
    list: mockUserListFactory(),
    roleId: mockUserRoleIdFactory(),
    ...override,
  };
}
