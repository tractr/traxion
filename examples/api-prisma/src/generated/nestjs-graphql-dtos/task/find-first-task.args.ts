import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';

import { TaskOrderByWithRelationInput } from './task-order-by-with-relation.input';
import { TaskScalarFieldEnum } from './task-scalar-field.enum';
import { TaskWhereUniqueInput } from './task-where-unique.input';
import { TaskWhereInput } from './task-where.input';

@ArgsType()
export class FindFirstTaskArgs {
  @Field(() => TaskWhereInput, { nullable: true })
  @Type(() => TaskWhereInput)
  where?: TaskWhereInput;

  @Field(() => [TaskOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<TaskOrderByWithRelationInput>;

  @Field(() => TaskWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [TaskScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof TaskScalarFieldEnum>;
}
