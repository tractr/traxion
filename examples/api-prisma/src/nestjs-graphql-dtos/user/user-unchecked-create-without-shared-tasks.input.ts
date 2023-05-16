import { Field, InputType, Int } from '@nestjs/graphql';

import { Role } from '../prisma/role.enum';
import { TaskUncheckedCreateNestedManyWithoutAuthorInput } from '../task/task-unchecked-create-nested-many-without-author.input';

@InputType()
export class UserUncheckedCreateWithoutSharedTasksInput {
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

  @Field(() => TaskUncheckedCreateNestedManyWithoutAuthorInput, {
    nullable: true,
  })
  tasks?: TaskUncheckedCreateNestedManyWithoutAuthorInput;
}
