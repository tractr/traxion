import { registerEnumType } from '@nestjs/graphql';

export enum RoleScalarFieldEnum {
  id = 'id',
  name = 'name',
}

registerEnumType(RoleScalarFieldEnum, {
  name: 'RoleScalarFieldEnum',
  description: undefined,
});
