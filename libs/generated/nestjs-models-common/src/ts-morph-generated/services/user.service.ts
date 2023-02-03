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

    /**
     *        Find the first User that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {UserFindFirstArgs} args - Arguments to find a User
     *        @example
     *        // Get one User
     *        const user = await this.userService.findFirst({
     *          where: {
     *            // ... provide filter here
     *          }
     *        })
     *     
     */
    findFirst<T extends Prisma.UserFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>, prisma: Prisma.UserDelegate<any> = this.prismaClient.User) {
        return prisma.FindFirst<T>(args);
    }

    /**
     *        Find zero or more Users that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     *        @example
     *        // Get all Users
     *        const users = await this.userService.findMany()
     *       
     *        // Get first 10 Users
     *        const Users = await this.UserService.findMany({ take: 10 })
     *       
     *        // Only select the 'id'
     *        const userWithIdOnly = await this.UserService.findMany({ select: { id: true } })
     *       
     *     
     */
    FindMany<T extends Prisma.UserFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>, prisma: Prisma.UserDelegate<any> = this.prismaClient.User) {
        return prisma.FindMany<T>(args);
    }
}
