import { Inject, Injectable } from "@nestjs/common";
import { DATABASE_SERVICE } from "@trxn/nestjs-database";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable
export class UserService {
    constructor(@Inject(DATABASE_SERVICE) private readonly prismaClient: PrismaClient) {
    }

    /**
     *     Find zero or one User that matches the filter.
     *     @param {UserFindUniqueArgs} args - Arguments to find a User
     *     @example
     *     // Get one User
     *     const user = await this.userService.findUnique({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    findUnique<T extends Prisma.UserFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>, prisma: Prisma.UserDelegate<any> = this.prismaClient.User) {
        return prisma.findUnique<T>(args);
    }
}
