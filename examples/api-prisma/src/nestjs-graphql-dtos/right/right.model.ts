import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Role } from '../role/role.model';
import { RightCount } from './right-count.output';

@ObjectType()
export class Right {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => [Role], { nullable: true })
  roles?: Array<Role>;

  @Field(() => RightCount, { nullable: false })
  _count?: RightCount;
}
