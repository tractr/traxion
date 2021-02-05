import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User as PrismaUser } from '@prisma/client';

@ObjectType()
export class User implements PrismaUser {
  @Field(() => ID)
  id: string;

  name: string;

  email: string;

  password: string;

  role: string;

  banned: boolean;

  lastConnectedAt: Date;
}
