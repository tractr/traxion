import { Field, InputType, Int } from '@nestjs/graphql';

import { Role } from '../prisma/role.enum';
import { ProfileUncheckedUpdateOneWithoutUserNestedInput } from '../profile/profile-unchecked-update-one-without-user-nested.input';
import { TaskUncheckedUpdateManyWithoutSharedWithNestedInput } from '../task/task-unchecked-update-many-without-shared-with-nested.input';

@InputType()
export class UserUncheckedUpdateWithoutTasksInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => [Role], { nullable: true })
  roles?: Array<keyof typeof Role>;

  @Field(() => ProfileUncheckedUpdateOneWithoutUserNestedInput, {
    nullable: true,
  })
  profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput;

  @Field(() => TaskUncheckedUpdateManyWithoutSharedWithNestedInput, {
    nullable: true,
  })
  sharedTasks?: TaskUncheckedUpdateManyWithoutSharedWithNestedInput;
}
