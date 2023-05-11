import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutUserProfileInput } from './user-create-without-user-profile.input';
import { HideField } from '@nestjs/graphql';
import { UserCreateOrConnectWithoutUserProfileInput } from './user-create-or-connect-without-user-profile.input';
import { UserUpsertWithoutUserProfileInput } from './user-upsert-without-user-profile.input';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutUserProfileInput } from './user-update-without-user-profile.input';

@InputType()
export class UserUpdateOneRequiredWithoutUserProfileNestedInput {
  @HideField()
  create?: UserCreateWithoutUserProfileInput;

  @HideField()
  connectOrCreate?: UserCreateOrConnectWithoutUserProfileInput;

  @HideField()
  upsert?: UserUpsertWithoutUserProfileInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: UserWhereUniqueInput;

  @HideField()
  update?: UserUpdateWithoutUserProfileInput;
}
