import { Injectable, Inject } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { UserService, USER_SERVICE } from "test";

@Injectable()
export class UserAuthorizedService {
    constructor(@Inject(USER_SERVICE) private readonly userService: UserService) {
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
    async findUnique<T extends Prisma.UserFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>, abilities: AppAbility) {
        return this.userService.findUnique<T>(args);
    }
}
