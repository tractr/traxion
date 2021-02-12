import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User as PrismaUser } from '@prisma/client';

@ObjectType()
export class User implements PrismaUser {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  role!: string;

  @Field()
  banned!: boolean;

  @Field(() => Date)
  lastConnectedAt!: Date | null;
}
