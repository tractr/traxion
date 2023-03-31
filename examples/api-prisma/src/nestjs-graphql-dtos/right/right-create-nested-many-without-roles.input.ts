import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RightCreateOrConnectWithoutRolesInput } from './right-create-or-connect-without-roles.input';
import { RightCreateWithoutRolesInput } from './right-create-without-roles.input';
import { RightWhereUniqueInput } from './right-where-unique.input';

@InputType()
export class RightCreateNestedManyWithoutRolesInput {
  @Field(() => [RightCreateWithoutRolesInput], { nullable: true })
  @Type(() => RightCreateWithoutRolesInput)
  create?: Array<RightCreateWithoutRolesInput>;

  @Field(() => [RightCreateOrConnectWithoutRolesInput], { nullable: true })
  @Type(() => RightCreateOrConnectWithoutRolesInput)
  connectOrCreate?: Array<RightCreateOrConnectWithoutRolesInput>;

  @Field(() => [RightWhereUniqueInput], { nullable: true })
  @Type(() => RightWhereUniqueInput)
  connect?: Array<RightWhereUniqueInput>;
}
