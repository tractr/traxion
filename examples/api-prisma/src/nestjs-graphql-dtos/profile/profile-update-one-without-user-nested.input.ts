import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProfileCreateWithoutUserInput } from './profile-create-without-user.input';
import { HideField } from '@nestjs/graphql';
import { ProfileCreateOrConnectWithoutUserInput } from './profile-create-or-connect-without-user.input';
import { ProfileUpsertWithoutUserInput } from './profile-upsert-without-user.input';
import { ProfileWhereUniqueInput } from './profile-where-unique.input';
import { Type } from 'class-transformer';
import { ProfileUpdateWithoutUserInput } from './profile-update-without-user.input';

@InputType()
export class ProfileUpdateOneWithoutUserNestedInput {
  @HideField()
  create?: ProfileCreateWithoutUserInput;

  @HideField()
  connectOrCreate?: ProfileCreateOrConnectWithoutUserInput;

  @HideField()
  upsert?: ProfileUpsertWithoutUserInput;

  @Field(() => Boolean, { nullable: true })
  disconnect?: boolean;

  @HideField()
  delete?: boolean;

  @Field(() => ProfileWhereUniqueInput, { nullable: true })
  @Type(() => ProfileWhereUniqueInput)
  connect?: ProfileWhereUniqueInput;

  @HideField()
  update?: ProfileUpdateWithoutUserInput;
}
