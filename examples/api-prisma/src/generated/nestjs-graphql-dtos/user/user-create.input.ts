import { Field , InputType } from '@nestjs/graphql';

import { Role } from '../prisma/role.enum';
import { ProfileCreateNestedOneWithoutUserInput } from '../profile/profile-create-nested-one-without-user.input';
import { TaskCreateNestedManyWithoutAuthorInput } from '../task/task-create-nested-many-without-author.input';
import { TaskCreateNestedManyWithoutSharedWithInput } from '../task/task-create-nested-many-without-shared-with.input';

@InputType()
export class UserCreateInput {
  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => [Role], { nullable: true })
  roles?: Array<keyof typeof Role>;

  @Field(() => ProfileCreateNestedOneWithoutUserInput, { nullable: true })
  profile?: ProfileCreateNestedOneWithoutUserInput;

  @Field(() => TaskCreateNestedManyWithoutAuthorInput, { nullable: true })
  tasks?: TaskCreateNestedManyWithoutAuthorInput;

  @Field(() => TaskCreateNestedManyWithoutSharedWithInput, { nullable: true })
  sharedTasks?: TaskCreateNestedManyWithoutSharedWithInput;
}
