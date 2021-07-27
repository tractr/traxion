import { User } from '../../prisma/client';

export type UserWithEmailAndPassword = Pick<User, 'id' | 'email' | 'password'>;
