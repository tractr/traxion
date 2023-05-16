import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserCount } from './user-count.output';
import { Role } from '../prisma/role.enum';
import { Task } from '../task/task.model';

@ObjectType()
export class User {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: true })
  name!: string | null;

  @Field(() => [Role], { nullable: true })
  roles!: Array<keyof typeof Role>;

  @Field(() => [Task], { nullable: true })
  tasks?: Array<Task>;

  @Field(() => [Task], { nullable: true })
  sharedTasks?: Array<Task>;

  @Field(() => UserCount, { nullable: false })
  _count?: UserCount;
}
