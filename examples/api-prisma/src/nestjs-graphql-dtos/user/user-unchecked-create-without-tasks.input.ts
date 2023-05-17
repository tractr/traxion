import { Field , InputType , Int } from '@nestjs/graphql';

import { Role } from '../prisma/role.enum';
import { TaskUncheckedCreateNestedManyWithoutSharedWithInput } from '../task/task-unchecked-create-nested-many-without-shared-with.input';

@InputType()
export class UserUncheckedCreateWithoutTasksInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => [Role], { nullable: true })
  roles?: Array<keyof typeof Role>;

  @Field(() => TaskUncheckedCreateNestedManyWithoutSharedWithInput, {
    nullable: true,
  })
  sharedTasks?: TaskUncheckedCreateNestedManyWithoutSharedWithInput;
}
