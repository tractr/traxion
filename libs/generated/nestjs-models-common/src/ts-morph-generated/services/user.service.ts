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
    findUnique<T extends Prisma.UserFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>, prisma: Prisma.UserDelegate<any> = this.prismaClient.user) {
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
    findFirst<T extends Prisma.UserFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>, prisma: Prisma.UserDelegate<any> = this.prismaClient.user) {
        return prisma.findFirst<T>(args);
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
    FindMany<T extends Prisma.UserFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>, prisma: Prisma.UserDelegate<any> = this.prismaClient.user) {
        return prisma.findMany<T>(args);
    }

    /**
     *       Create a User.
     *       @param {UserCreateArgs} args - Arguments to create a User.
     *       @example
     *       // Create one User
     *       const User = await this.userService.create({
     *         data: {
     *           // ... data to create a User
     *         }
     *       })
     *     
     *     
     */
    create<T extends Prisma.UserCreateArgs>(args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>, prisma: Prisma.UserDelegate<any> = this.prismaClient.user) {
        return prisma.create<T>(args);
    }

    /**
     *       * Create many Users.
     *       * @param {UserCreateManyArgs} args - Arguments to create many a Users.
     *       * @example
     *       * // Create many Users
     *       * const Users = await this.userService.createMany({
     *       *   data: {
     *       *     *     // ... provide data here
     *       *   }
     *       * })
     *       *
     *     
     */
    createMany<T extends Prisma.UserCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.UserCreateManyArgs>, prisma: Prisma.UserDelegate<any> = this.prismaClient.user) {
        return prisma.createMany<T>(args);
    }

    /**
     *        Update a User.
     *        @param {UserUpdateArgs} args - Arguments to update a User.
     *        @example
     *        // Update one User
     *        const user = await this.userService.update({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    update<T extends Prisma.UserUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>, prisma: Prisma.UserDelegate<any> = this.prismaClient.user) {
        return prisma.update<T>(args);
    }

    /**
     *     Delete a User.
     *     @param {UserDeleteArgs} args - Arguments to delete a User
     *     @example
     *     // Delete one User
     *     const user = await this.userService.delete({
     *       where: {
     *         // ... filter to delete one User
     *       }
     *     })
     *     
     */
    delete<T extends Prisma.UserDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>, prisma: Prisma.UserDelegate<any> = this.prismaClient.user) {
        return prisma.delete<T>(args);
    }

    /**
     *     Delete 0 or more Users.
     *     @param {UserDeleteArgs} args - Arguments to filter  Users to delete.
     *     @example
     *     // Delete a few Users
     *     const users = await this.userService.deleteMany({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    deleteMany<T extends Prisma.UserDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.UserDeleteManyArgs>, prisma: Prisma.UserDelegate<any> = this.prismaClient.user) {
        return prisma.deleteMany<T>(args);
    }
}
