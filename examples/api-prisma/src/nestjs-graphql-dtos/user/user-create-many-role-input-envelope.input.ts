import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateManyRoleInput } from './user-create-many-role.input';
import { Type } from 'class-transformer';

@InputType()
export class UserCreateManyRoleInputEnvelope {

    @Field(() => [UserCreateManyRoleInput], {nullable:false})
    @Type(() => UserCreateManyRoleInput)
    data!: Array<UserCreateManyRoleInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
