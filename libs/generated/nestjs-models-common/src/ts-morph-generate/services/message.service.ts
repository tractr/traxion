import { Inject, Injectable } from "@nestjs/common";
import { DATABASE_SERVICE } from "@trxn/nestjs-database";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class MessageService {
    constructor(@Inject(DATABASE_SERVICE) private readonly prismaClient: PrismaClient) {
    }

    /**
     *     Find zero or one Message that matches the filter.
     *     @param {MessageFindUniqueArgs} args - Arguments to find a Message
     *     @example
     *     // Get one Message
     *     const message = await this.messageService.findUnique({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    findUnique<T extends Prisma.MessageFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.MessageFindUniqueArgs>, prisma: Prisma.MessageDelegate<any> = this.prismaClient.message) {
        return prisma.findUnique<T>(args);
    }

    /**
     *        Find the first Message that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {MessageFindFirstArgs} args - Arguments to find a Message
     *        @example
     *        // Get one Message
     *        const message = await this.messageService.findFirst({
     *          where: {
     *            // ... provide filter here
     *          }
     *        })
     *     
     */
    findFirst<T extends Prisma.MessageFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.MessageFindFirstArgs>, prisma: Prisma.MessageDelegate<any> = this.prismaClient.message) {
        return prisma.findFirst<T>(args);
    }

    /**
     *        Find zero or more Messages that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {MessageFindManyArgs=} args - Arguments to filter and select certain fields only.
     *        @example
     *        // Get all Messages
     *        const messages = await this.messageService.findMany()
     *       
     *        // Get first 10 Messages
     *        const Messages = await this.MessageService.findMany({ take: 10 })
     *       
     *        // Only select the 'id'
     *        const messageWithIdOnly = await this.MessageService.findMany({ select: { id: true } })
     *       
     *     
     */
    FindMany<T extends Prisma.MessageFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.MessageFindManyArgs>, prisma: Prisma.MessageDelegate<any> = this.prismaClient.message) {
        return prisma.findMany<T>(args);
    }

    /**
     *       Create a Message.
     *       @param {MessageCreateArgs} args - Arguments to create a Message.
     *       @example
     *       // Create one Message
     *       const Message = await this.messageService.create({
     *         data: {
     *           // ... data to create a Message
     *         }
     *       })
     *     
     *     
     */
    create<T extends Prisma.MessageCreateArgs>(args: Prisma.SelectSubset<T, Prisma.MessageCreateArgs>, prisma: Prisma.MessageDelegate<any> = this.prismaClient.message) {
        return prisma.create<T>(args);
    }

    /**
     *         Create many Messages.
     *         @param {MessageCreateManyArgs} args - Arguments to create many a 
     *         Messages.
     *         @example
     *         // Create many Messages
     *         const Messages = await this.messageService.createMany({
     *           data: {
     *             *     // ... provide data here
     *           }
     *         })
     */
    createMany<T extends Prisma.MessageCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.MessageCreateManyArgs>, prisma: Prisma.MessageDelegate<any> = this.prismaClient.message) {
        return prisma.createMany<T>(args);
    }

    /**
     *        Update a Message.
     *        @param {MessageUpdateArgs} args - Arguments to update a Message.
     *        @example
     *        // Update one Message
     *        const message = await this.messageService.update({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    update<T extends Prisma.MessageUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.MessageUpdateArgs>, prisma: Prisma.MessageDelegate<any> = this.prismaClient.message) {
        return prisma.update<T>(args);
    }

    /**
     *        Update 0 or more Messages.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {MessageUpdateManyArgs} args - Arguments to update one or more Messages.
     *        @example
     *        // Update many Messages
     *        const messages = await this.messageService.updateMany({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    updateMAny<T extends Prisma.MessageUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.MessageUpdateManyArgs>, prisma: Prisma.MessageDelegate<any> = this.prismaClient.message) {
        return prisma.updateMany<T>(args);
    }

    /**
     *       Create or update one Message.
     *        @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     *        @example
     *        // Upsert one Message
     *        const message = await this.messageService.upsert({
     *          create: {
     *            // ... data to create a Message
     *          },
     *          update: {
     *            // ... in case it already exists, update
     *          },
     *          where: {
     *            // ... the filter for the Message we want to update
     *          }
     *        })
     *     
     */
    upsert<T extends Prisma.MessageUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.MessageUpsertArgs>, prisma: Prisma.MessageDelegate<any> = this.prismaClient.message) {
        return prisma.upsert<T>(args);
    }

    /**
     *     Delete a Message.
     *     @param {MessageDeleteArgs} args - Arguments to delete a Message
     *     @example
     *     // Delete one Message
     *     const message = await this.messageService.delete({
     *       where: {
     *         // ... filter to delete one Message
     *       }
     *     })
     *     
     */
    delete<T extends Prisma.MessageDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.MessageDeleteArgs>, prisma: Prisma.MessageDelegate<any> = this.prismaClient.message) {
        return prisma.delete<T>(args);
    }

    /**
     *     Delete 0 or more Messages.
     *     @param {MessageDeleteArgs} args - Arguments to filter  Messages to delete.
     *     @example
     *     // Delete a few Messages
     *     const messages = await this.messageService.deleteMany({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    deleteMany<T extends Prisma.MessageDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.MessageDeleteManyArgs>, prisma: Prisma.MessageDelegate<any> = this.prismaClient.message) {
        return prisma.deleteMany<T>(args);
    }

    /**
     *       Count the number of Message.
     *       Note, that providing 'undefined' is treated as the value not being there.
     *       Read more here: https://pris.ly/d/null-undefined
     *       @param {MessageCountArgs} args - Arguments to filter Messages to count.
     *       @example
     *       // Count one Message
     *       const Message = await this.messageService.count({
     *         data: {
     *           // ... data to count a Message
     *         }
     *       })
     *     
     *     
     */
    count<T extends Prisma.MessageCountArgs>(args: Prisma.SelectSubset<T, Prisma.MessageCountArgs>, prisma: Prisma.MessageDelegate<any> = this.prismaClient.message) {
        return prisma.count<T>(args);
    }

    /**
     *         Allows you to perform aggregations operations on a Message.
     *         Note, that providing 'undefined' is treated as the value not being there.
     *         Read more here: https://pris.ly/d/null-undefined
     *         @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     *         @example
     *         // Ordered by age ascending
     *         // Where email contains prisma.io
     *         // Limited to the 10 messages
     *         const aggregations = await this.messageService.aggregate({
     *           avg: {
     *             age: true,
     *           },
     *           where: {
     *             email: {
     *               contains: "prisma.io",
     *             },
     *           },
     *           orderBy: {
     *             age: "asc",
     *           },
     *           take: 10,
     *         })
     *     
     */
    aggregate<T extends Prisma.MessageAggregateArgs>(args: Prisma.SelectSubset<T, Prisma.MessageAggregateArgs>, prisma: Prisma.MessageDelegate<any> = this.prismaClient.message) {
        return prisma.aggregate<T>(args);
    }
}
