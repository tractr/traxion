import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RightCreateWithoutRolesInput } from './right-create-without-roles.input';
import { Type } from 'class-transformer';
import { RightCreateOrConnectWithoutRolesInput } from './right-create-or-connect-without-roles.input';
import { RightWhereUniqueInput } from './right-where-unique.input';

@InputType()
export class RightUncheckedCreateNestedManyWithoutRolesInput {
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
