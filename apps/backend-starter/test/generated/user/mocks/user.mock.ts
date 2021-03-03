import { User } from '@prisma/client';
import { random, internet, lorem, date } from 'faker';

export function mockUserFactory(override: Partial<User> = {}): User {
  return {
    id: random.uuid(),
    name: lorem.words(),
    email: internet.email(),
    password: internet.password(),
    banned: random.boolean(),
    lastConnectedAt: date.past(),
    age: random.number(),
    blogUrl: internet.url(),
    list: new Array(3).map(() => lorem.words()),
    roleId: random.uuid(),
    ...override,
  };
}
