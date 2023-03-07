import { Tag, Answer, Message, Question, User, FindUniqueTagArgs, FindManyTagArgs, CreateOneTagArgs, UpdateOneTagArgs, DeleteOneTagArgs } from "../../generated/prisma-nestjs-graphql";
import { TagService, TAG_SERVICE } from "@trxn/generated-nestjs-models-common";
import { Inject } from "@nestjs/common";
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { GraphQLResolveInfo } from "graphql";
import { FindManyTagOutput } from "./find-many-tag-output.dto";

@Resolver(() => Tag)
export class TagResolver {
    constructor(@Inject(TAG_SERVICE) private readonly tagService: TagService) {
    }

    /** Query for a unique tag */
    @Query(() => Tag, { nullable: true })
    async findUniqueTag(@Info() info: GraphQLResolveInfo, @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueTagArgs) {

            const select = new PrismaSelect(info).value;
            const user =  await this.tagService.findUnique(where, ...select);
            return user;
          
    }

    /** Query for multiple tags. */
    @Query(() => FindManyTagOutput)
    async findManyTag(@Info() info: GraphQLResolveInfo, @Args({ nullable: true }) 
                {
                  where,
                  cursor,
                  distinct,
                  orderBy = [{ id: 'asc' }],
                  skip = 0,
                  take = 100,
                }
              : FindManyTagArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).valueOf('users', 'User');

            const users = await this.userService.findMany({
              ...select,
              where,
              cursor,
              distinct,
              orderBy,
              skip,
              take: take + 1,
            });

            const count = await this.userService.count({
              where,
            });

            return {
              users: users.slice(0, take),
              count,
              hasNextPage: typeof users[take] !== 'undefined',
            };
          
    }

    /** Create a single tag. */
    @Mutation(() => Tag, { nullable: true })
    async createTag(@Info() info: GraphQLResolveInfo, @Args() { data: rawData }: CreateOneTagArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).value;

            const data = {
              ...this.userService.getDefaultInternals(),
              ...rawData,
            };

            const user = await this.userService.create(
              { data, ...select },
              prisma.user,
            );

            return user;
          
    }

    /** Update a single tag. */
    @Mutation(() => Tag, { nullable: true })
    async updateTag(@Info() info: GraphQLResolveInfo, @Args() { data, where }: UpdateOneTagArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).value;

            const user = await this.userService.update(
              { where, data, ...select },
              prisma.user,
            );

            return user;
          
    }

    /** Delete a single Tag. */
    @Mutation(() => Tag, { nullable: true })
    async deleteTag(@Info() info: GraphQLResolveInfo, @Args() { where }: DeleteOneTagArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).value;

            const user = await this.userService.delete(
              { where, ...select },
              prisma.user,
            );

            return user;
          
    }

    @ResolveField(() => Answer)
    answers(@Parent() tag: Tag) {
        return tag.answers;
    }

    @ResolveField(() => Message)
    messages(@Parent() tag: Tag) {
        return tag.messages;
    }

    @ResolveField(() => Question)
    questions(@Parent() tag: Tag) {
        return tag.questions;
    }

    @ResolveField(() => Tag)
    owner(@Parent() tag: Tag) {
        return tag.owner;
    }
}
