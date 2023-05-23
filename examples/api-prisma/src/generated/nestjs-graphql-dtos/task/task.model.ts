import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { TaskCount } from './task-count.output';
import { TaskStatus } from '../prisma/task-status.enum';
import { User } from '../user/user.model';

@ObjectType()
export class Task {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => TaskStatus, { nullable: false, defaultValue: 'draft' })
  status!: keyof typeof TaskStatus;

  @Field(() => Int, { nullable: false })
  authorId!: number;

  @Field(() => User, { nullable: false })
  author?: User;

  /**
   * @trxn/permissions: readOnly
   */
  @Field(() => [User], {
    nullable: true,
    description: '@trxn/permissions: readOnly',
  })
  sharedWith?: Array<User>;

  @Field(() => TaskCount, { nullable: false })
  _count?: TaskCount;
}
