import { registerEnumType } from '@nestjs/graphql';

export enum UserScalarFieldEnum {
  id = 'id',
  email = 'email',
  password = 'password',
  roles = 'roles',
}

registerEnumType(UserScalarFieldEnum, {
  name: 'UserScalarFieldEnum',
  description: undefined,
});
