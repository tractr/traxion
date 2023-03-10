import { registerEnumType } from '@nestjs/graphql';

export enum RightScalarFieldEnum {
  id = 'id',
  name = 'name',
}

registerEnumType(RightScalarFieldEnum, {
  name: 'RightScalarFieldEnum',
  description: undefined,
});
