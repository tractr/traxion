import { 
  User,
} from '../models';
import {
  UserGender,
} from '../enums';
import {
  datatype,
  random,
  internet,
  lorem,
  date,
} from 'faker';

export function mockUserIdFactory(): User['id'] {
  return datatype.uuid();
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
  return datatype.boolean();
}

export function mockUserLastConnectedAtFactory(): NonNullable<User['lastConnectedAt']> {
  return date.past();
}

export function mockUserGenderFactory(): User['gender'] {
  return random.arrayElement(Object.values(UserGender));
}

  
export function mockUserFactory(override: Partial< User > = {}): User {
  return {
    id: mockUserIdFactory(),
    name: mockUserNameFactory(),
    email: mockUserEmailFactory(),
    password: mockUserPasswordFactory(),
    role: mockUserRoleFactory(),
    banned: mockUserBannedFactory(),
    lastConnectedAt: mockUserLastConnectedAtFactory(),
    gender: mockUserGenderFactory(),
    ...override,
  };
}

