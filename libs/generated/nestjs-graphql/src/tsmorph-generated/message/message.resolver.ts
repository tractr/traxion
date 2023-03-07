import { Message, Tag, Question, FindUniqueMessageArgs, FindManyMessageArgs, CreateOneMessageArgs, UpdateOneMessageArgs, DeleteOneMessageArgs } from "../../generated/prisma-nestjs-graphql";
import { MessageService, MESSAGE_SERVICE } from "@trxn/generated-nestjs-models-common";
import { Inject } from "@nestjs/common";
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { GraphQLResolveInfo } from "graphql";
import { FindManyMessageOutput } from "./find-many-message-output.dto";

@Resolver(() => Message)
export class MessageResolver {
    constructor(@Inject(MESSAGE_SERVICE) private readonly messageService: MessageService) {
    }

    /** Query for a unique message */
    @Query(() => Message, { nullable: true })
    async findUniqueMessage(@Info() info: GraphQLResolveInfo, @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueMessageArgs) {

            const select = new PrismaSelect(info).value;
            const user =  await this.messageService.findUnique(where, ...select);
            return user;
          
    }

    /** Query for multiple messages. */
    @Query(() => FindManyMessageOutput)
    async findManyMessage(@Info() info: GraphQLResolveInfo, @Args({ nullable: true }) 
                {
                  where,
                  cursor,
                  distinct,
                  orderBy = [{ id: 'asc' }],
                  skip = 0,
                  take = 100,
                }
              : FindManyMessageArgs) {

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

    /** Create a single message. */
    @Mutation(() => Message, { nullable: true })
    async createMessage(@Info() info: GraphQLResolveInfo, @Args() { data: rawData }: CreateOneMessageArgs) {

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

    /** Update a single message. */
    @Mutation(() => Message, { nullable: true })
    async updateMessage(@Info() info: GraphQLResolveInfo, @Args() { data, where }: UpdateOneMessageArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).value;

            const user = await this.userService.update(
              { where, data, ...select },
              prisma.user,
            );

            return user;
          
    }

    /** Delete a single Message. */
    @Mutation(() => Message, { nullable: true })
    async deleteMessage(@Info() info: GraphQLResolveInfo, @Args() { where }: DeleteOneMessageArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).value;

            const user = await this.userService.delete(
              { where, ...select },
              prisma.user,
            );

            return user;
          
    }

    @ResolveField(() => Message)
    messages(@Parent() message: Message) {
        return message.messages;
    }

    @ResolveField(() => Message)
    messages(@Parent() message: Message) {
        return message.messages;
    }
}
