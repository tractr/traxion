import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleWhereUniqueInput } from './role-where-unique.input';
import { Type } from 'class-transformer';
import { RoleUpdateWithoutRightsInput } from './role-update-without-rights.input';

@InputType()
export class RoleUpdateWithWhereUniqueWithoutRightsInput {
  @Field(() => RoleWhereUniqueInput, { nullable: false })
  @Type(() => RoleWhereUniqueInput)
  where!: RoleWhereUniqueInput;

  @Field(() => RoleUpdateWithoutRightsInput, { nullable: false })
  @Type(() => RoleUpdateWithoutRightsInput)
  data!: RoleUpdateWithoutRightsInput;
}
