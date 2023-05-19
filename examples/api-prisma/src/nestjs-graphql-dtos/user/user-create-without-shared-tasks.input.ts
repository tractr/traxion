import { Field, InputType } from '@nestjs/graphql';

import { Role } from '../prisma/role.enum';
import { TaskCreateNestedManyWithoutAuthorInput } from '../task/task-create-nested-many-without-author.input';

@InputType()
export class UserCreateWithoutSharedTasksInput {
  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => [Role], { nullable: true })
  roles?: Array<keyof typeof Role>;

  @Field(() => TaskCreateNestedManyWithoutAuthorInput, { nullable: true })
  tasks?: TaskCreateNestedManyWithoutAuthorInput;
}
