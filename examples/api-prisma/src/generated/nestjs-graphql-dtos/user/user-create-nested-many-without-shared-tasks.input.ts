import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';

import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedManyWithoutSharedTasksInput {
  @Field(() => [UserWhereUniqueInput], { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>>;
}
