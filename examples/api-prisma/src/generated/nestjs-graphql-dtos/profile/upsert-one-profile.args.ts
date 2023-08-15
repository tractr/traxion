import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';

import { ProfileCreateInput } from './profile-create.input';
import { ProfileUpdateInput } from './profile-update.input';
import { ProfileWhereUniqueInput } from './profile-where-unique.input';

@ArgsType()
export class UpsertOneProfileArgs {
  @Field(() => ProfileWhereUniqueInput, { nullable: false })
  @Type(() => ProfileWhereUniqueInput)
  where!: Prisma.AtLeast<ProfileWhereUniqueInput, 'id' | 'userId'>;

  @Field(() => ProfileCreateInput, { nullable: false })
  @Type(() => ProfileCreateInput)
  create!: ProfileCreateInput;

  @Field(() => ProfileUpdateInput, { nullable: false })
  @Type(() => ProfileUpdateInput)
  update!: ProfileUpdateInput;
}
