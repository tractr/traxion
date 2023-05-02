import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Right } from '../right/right.model';
import { RoleCount } from './role-count.output';

@ObjectType()
export class Role {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => [User], {nullable:true})
    users?: Array<User>;

    @Field(() => [Right], {nullable:true})
    rights?: Array<Right>;

    @Field(() => RoleCount, {nullable:false})
    _count?: RoleCount;
}
