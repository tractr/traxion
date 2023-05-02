import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutUserProfileInput } from './user-create-without-user-profile.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutUserProfileInput } from './user-create-or-connect-without-user-profile.input';
import { UserUpsertWithoutUserProfileInput } from './user-upsert-without-user-profile.input';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateWithoutUserProfileInput } from './user-update-without-user-profile.input';

@InputType()
export class UserUpdateOneRequiredWithoutUserProfileNestedInput {
  @Field(() => UserCreateWithoutUserProfileInput, { nullable: true })
  @Type(() => UserCreateWithoutUserProfileInput)
  create?: UserCreateWithoutUserProfileInput;

  @Field(() => UserCreateOrConnectWithoutUserProfileInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutUserProfileInput)
  connectOrCreate?: UserCreateOrConnectWithoutUserProfileInput;

  @Field(() => UserUpsertWithoutUserProfileInput, { nullable: true })
  @Type(() => UserUpsertWithoutUserProfileInput)
  upsert?: UserUpsertWithoutUserProfileInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: UserWhereUniqueInput;

  @Field(() => UserUpdateWithoutUserProfileInput, { nullable: true })
  @Type(() => UserUpdateWithoutUserProfileInput)
  update?: UserUpdateWithoutUserProfileInput;
}
