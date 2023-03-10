import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RoleCreateManyInput } from './role-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyRoleArgs {

    @Field(() => [RoleCreateManyInput], {nullable:false})
    @Type(() => RoleCreateManyInput)
    data!: Array<RoleCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
