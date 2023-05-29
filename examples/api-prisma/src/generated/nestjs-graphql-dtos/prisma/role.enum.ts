import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  admin = 'admin',
  user = 'user',
}

registerEnumType(Role, { name: 'Role', description: undefined });
