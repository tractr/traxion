import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutRoleInput } from './user-create-without-role.input';

@InputType()
export class UserCreateOrConnectWithoutRoleInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: UserWhereUniqueInput;

    @Field(() => UserCreateWithoutRoleInput, {nullable:false})
    @Type(() => UserCreateWithoutRoleInput)
    create!: UserCreateWithoutRoleInput;
}
