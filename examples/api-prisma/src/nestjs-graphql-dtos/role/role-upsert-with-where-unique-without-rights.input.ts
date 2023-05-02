import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleWhereUniqueInput } from './role-where-unique.input';
import { Type } from 'class-transformer';
import { RoleUpdateWithoutRightsInput } from './role-update-without-rights.input';
import { RoleCreateWithoutRightsInput } from './role-create-without-rights.input';

@InputType()
export class RoleUpsertWithWhereUniqueWithoutRightsInput {
  @Field(() => RoleWhereUniqueInput, { nullable: false })
  @Type(() => RoleWhereUniqueInput)
  where!: RoleWhereUniqueInput;

  @Field(() => RoleUpdateWithoutRightsInput, { nullable: false })
  @Type(() => RoleUpdateWithoutRightsInput)
  update!: RoleUpdateWithoutRightsInput;

  @Field(() => RoleCreateWithoutRightsInput, { nullable: false })
  @Type(() => RoleCreateWithoutRightsInput)
  create!: RoleCreateWithoutRightsInput;
}
