import { User } from '@prisma/client';
import { random, internet, lorem, date } from 'faker';

export function mockUserFactory(override: Partial<User> = {}): User {
  return {
    id: random.uuid(),
    name: lorem.words(),
    email: internet.email(),
    password: internet.password(),
    role: lorem.words(),
    banned: random.boolean(),
    lastConnectedAt: date.past(),
    ...override,
  };
}
