import { registerEnumType } from '@nestjs/graphql';

export enum ProfileScalarFieldEnum {
  id = 'id',
  address = 'address',
  userId = 'userId',
}

registerEnumType(ProfileScalarFieldEnum, {
  name: 'ProfileScalarFieldEnum',
  description: undefined,
});
