import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class UserCount {
  @Field(() => Int, { nullable: false })
  tasks?: number;

  @Field(() => Int, { nullable: false })
  sharedTasks?: number;
}
