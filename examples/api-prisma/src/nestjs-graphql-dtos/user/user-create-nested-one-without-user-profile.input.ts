import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutUserProfileInput } from './user-create-without-user-profile.input';
import { HideField } from '@nestjs/graphql';
import { UserCreateOrConnectWithoutUserProfileInput } from './user-create-or-connect-without-user-profile.input';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';

@InputType()
export class UserCreateNestedOneWithoutUserProfileInput {
  @HideField()
  create?: UserCreateWithoutUserProfileInput;

  @HideField()
  connectOrCreate?: UserCreateOrConnectWithoutUserProfileInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: UserWhereUniqueInput;
}
