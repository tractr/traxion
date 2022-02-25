import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { UserRoles } from '@prisma/client';

import { User as UserType } from '@tractr/generated-models';

@ObjectType()
export class User extends UserType {
  @Field(() => ID)
  id!: string;

  name!: string;

  email!: string;

  @HideField()
  password: string | null = null;
}
