import { Field , InputType } from '@nestjs/graphql';

import { Role } from '../prisma/role.enum';
import { TaskUpdateManyWithoutAuthorNestedInput } from '../task/task-update-many-without-author-nested.input';

@InputType()
export class UserUpdateWithoutSharedTasksInput {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => [Role], { nullable: true })
  roles?: Array<keyof typeof Role>;

  @Field(() => TaskUpdateManyWithoutAuthorNestedInput, { nullable: true })
  tasks?: TaskUpdateManyWithoutAuthorNestedInput;
}
