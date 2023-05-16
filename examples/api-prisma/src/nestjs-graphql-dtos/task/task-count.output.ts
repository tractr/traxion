import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class TaskCount {
  @Field(() => Int, { nullable: false })
  sharedWith?: number;
}
