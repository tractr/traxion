import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutUserProfileInput } from './user-create-without-user-profile.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutUserProfileInput } from './user-create-or-connect-without-user-profile.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutUserProfileInput {
  @Field(() => UserCreateWithoutUserProfileInput, { nullable: true })
  @Type(() => UserCreateWithoutUserProfileInput)
  create?: UserCreateWithoutUserProfileInput;

  @Field(() => UserCreateOrConnectWithoutUserProfileInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutUserProfileInput)
  connectOrCreate?: UserCreateOrConnectWithoutUserProfileInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: UserWhereUniqueInput;
}
