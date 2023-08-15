import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';

import { ProfileOrderByWithRelationInput } from './profile-order-by-with-relation.input';
import { ProfileScalarFieldEnum } from './profile-scalar-field.enum';
import { ProfileWhereUniqueInput } from './profile-where-unique.input';
import { ProfileWhereInput } from './profile-where.input';

@ArgsType()
export class FindManyProfileArgs {
  @Field(() => ProfileWhereInput, { nullable: true })
  @Type(() => ProfileWhereInput)
  where?: ProfileWhereInput;

  @Field(() => [ProfileOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<ProfileOrderByWithRelationInput>;

  @Field(() => ProfileWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<ProfileWhereUniqueInput, 'id' | 'userId'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [ProfileScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof ProfileScalarFieldEnum>;
}
