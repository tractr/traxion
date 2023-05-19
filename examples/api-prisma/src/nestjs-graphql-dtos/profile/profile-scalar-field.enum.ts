import { registerEnumType } from '@nestjs/graphql';

export enum ProfileScalarFieldEnum {
  id = 'id',
  firstName = 'firstName',
  lastName = 'lastName',
  bio = 'bio',
  userId = 'userId',
}

registerEnumType(ProfileScalarFieldEnum, {
  name: 'ProfileScalarFieldEnum',
  description: undefined,
});
