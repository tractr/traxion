import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutSharedTasksInput } from './user-create-without-shared-tasks.input';

@InputType()
export class UserCreateOrConnectWithoutSharedTasksInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: UserWhereUniqueInput;

  @Field(() => UserCreateWithoutSharedTasksInput, { nullable: false })
  @Type(() => UserCreateWithoutSharedTasksInput)
  create!: UserCreateWithoutSharedTasksInput;
}
