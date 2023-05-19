import { ArgsType , Field , Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ProfileOrderByWithRelationInput } from './profile-order-by-with-relation.input';
import { ProfileScalarFieldEnum } from './profile-scalar-field.enum';
import { ProfileWhereUniqueInput } from './profile-where-unique.input';
import { ProfileWhereInput } from './profile-where.input';

@ArgsType()
export class FindFirstProfileArgs {
  @Field(() => ProfileWhereInput, { nullable: true })
  @Type(() => ProfileWhereInput)
  where?: ProfileWhereInput;

  @Field(() => [ProfileOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<ProfileOrderByWithRelationInput>;

  @Field(() => ProfileWhereUniqueInput, { nullable: true })
  cursor?: ProfileWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [ProfileScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof ProfileScalarFieldEnum>;
}
