import { Field , ID , ObjectType } from '@nestjs/graphql';

import { UserCount } from './user-count.output';
import { Role } from '../prisma/role.enum';
import { Profile } from '../profile/profile.model';
import { Task } from '../task/task.model';

@ObjectType()
export class User {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => [Role], { nullable: true })
  roles!: Array<keyof typeof Role>;

  @Field(() => Profile, { nullable: true })
  profile?: Profile | null;

  @Field(() => [Task], { nullable: true })
  tasks?: Array<Task>;

  @Field(() => [Task], { nullable: true })
  sharedTasks?: Array<Task>;

  @Field(() => UserCount, { nullable: false })
  _count?: UserCount;
}
