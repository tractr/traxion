import { Profile, FindUniqueProfileArgs, FindManyProfileArgs, CreateOneProfileArgs, UpdateOneProfileArgs, DeleteOneProfileArgs } from "../../nestjs-graphql-dtos";
import { FindManyPagination } from "@trxn/nestjs-graphql";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FindManyProfileOutput extends FindManyPagination {
    @Field(() => [Profile])
    profiles!: Profile[];
}
