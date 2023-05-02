import { Injectable, Inject } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { UserService, USER_SERVICE } from "../../nestjs-services";
import { AppAbility } from "../../casl-target";

@Injectable()
export class UserAuthorizedService {
    constructor(@Inject(USER_SERVICE) private readonly userService: UserService) {
    }

    async findUnique<T extends Prisma.UserFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>, abilities: AppAbility, prisma?: Prisma.UserDelegate<undefined>) {
        return this.userService.findUnique<T>(args, prisma);
    }

    async findMany<T extends Prisma.UserFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>, abilities: AppAbility, prisma?: Prisma.UserDelegate<undefined>) {
        return this.userService.findMany<T>(args, prisma);
    }

    async create<T extends Prisma.UserCreateArgs>(args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>, abilities: AppAbility, prisma?: Prisma.UserDelegate<undefined>) {
        return this.userService.create<T>(args, prisma);
    }

    async update<T extends Prisma.UserUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>, abilities: AppAbility, prisma?: Prisma.UserDelegate<undefined>) {
        return this.userService.findUnique<T>(args, prisma);
    }

    async delete<T extends Prisma.UserDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>, abilities: AppAbility, prisma?: Prisma.UserDelegate<undefined>) {
        return this.userService.delete<T>(args, prisma);
    }

    async count<T extends Prisma.UserCountArgs>(args: Prisma.SelectSubset<T, Prisma.UserCountArgs>, abilities: AppAbility, prisma?: Prisma.UserDelegate<undefined>) {
        return this.userService.count<T>(args, prisma);
    }
}
