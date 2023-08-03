import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';

import { ProfileWhereUniqueInput } from './profile-where-unique.input';

@InputType()
export class ProfileUncheckedCreateNestedOneWithoutUserInput {
  @Field(() => ProfileWhereUniqueInput, { nullable: true })
  @Type(() => ProfileWhereUniqueInput)
  connect?: Prisma.AtLeast<ProfileWhereUniqueInput, 'id' | 'userId'>;
}
