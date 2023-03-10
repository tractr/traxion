import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RightScalarWhereInput } from './right-scalar-where.input';
import { Type } from 'class-transformer';
import { RightUpdateManyMutationInput } from './right-update-many-mutation.input';

@InputType()
export class RightUpdateManyWithWhereWithoutRolesInput {

    @Field(() => RightScalarWhereInput, {nullable:false})
    @Type(() => RightScalarWhereInput)
    where!: RightScalarWhereInput;

    @Field(() => RightUpdateManyMutationInput, {nullable:false})
    @Type(() => RightUpdateManyMutationInput)
    data!: RightUpdateManyMutationInput;
}
