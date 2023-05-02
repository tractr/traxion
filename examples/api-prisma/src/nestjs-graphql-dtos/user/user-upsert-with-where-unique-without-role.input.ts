import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateWithoutRoleInput } from './user-create-without-role.input';
import { UserUpdateWithoutRoleInput } from './user-update-without-role.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUpsertWithWhereUniqueWithoutRoleInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: UserWhereUniqueInput;

  @Field(() => UserUpdateWithoutRoleInput, { nullable: false })
  @Type(() => UserUpdateWithoutRoleInput)
  update!: UserUpdateWithoutRoleInput;

  @Field(() => UserCreateWithoutRoleInput, { nullable: false })
  @Type(() => UserCreateWithoutRoleInput)
  create!: UserCreateWithoutRoleInput;
}
