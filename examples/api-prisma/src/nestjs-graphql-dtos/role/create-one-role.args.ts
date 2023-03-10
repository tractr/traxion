import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RoleCreateInput } from './role-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneRoleArgs {

    @Field(() => RoleCreateInput, {nullable:false})
    @Type(() => RoleCreateInput)
    data!: RoleCreateInput;
}
