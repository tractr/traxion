import { Injectable, Inject, ForbiddenException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { accessibleBy } from "@casl/prisma";
import { subject } from "@casl/ability";
import { PrismaService } from "@trxn/nestjs-database";
import { Action } from "@trxn/nestjs-casl";
import { UserService, USER_SERVICE } from "../../nestjs-services";
import { AnyAbility } from "@casl/ability";

@Injectable()
export class UserAuthorizedService {
    constructor(@Inject(USER_SERVICE) private readonly userService: UserService, private readonly prisma: PrismaService) {
    }

    async findUnique<T extends Prisma.UserFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>, abilities: AnyAbility, prisma?: Prisma.UserDelegate<undefined>) {
        const user = await this.userService.findUnique<T>(args, prisma);
        if (user && abilities?.cannot(Action.Read, subject('User', user)))
          throw new ForbiddenException('cannot read this user');
        return user
    }

    async findMany<T extends Prisma.UserFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>, abilities: AnyAbility, prisma?: Prisma.UserDelegate<undefined>) {
        const where = {
                AND: [abilities ? accessibleBy(abilities).User : {}, args?.where ?? {}],
              };
        return this.userService.findMany<T>({ ...args, where }, prisma);
    }

    async create<T extends Prisma.UserCreateArgs>(args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>, abilities: AnyAbility, prisma?: Prisma.UserDelegate<undefined>) {
        const create = async(client: Prisma.UserDelegate<undefined>) => {
                const user = await this.userService.create<T>(args, client);

                if (abilities?.cannot(Action.Create, subject('User', user)))
                  throw new ForbiddenException('cannot create User');

                return user;
              }

        if (prisma) return create(prisma);
        return this.prisma.$transaction((client) => create(client.user));
    }

    async update<T extends Prisma.UserUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>, abilities: AnyAbility, prisma?: Prisma.UserDelegate<undefined>) {
        const update = async(client: Prisma.UserDelegate<undefined>) => {
                const user = await this.userService.update<T>(args, client);

                if (abilities?.cannot(Action.Update, subject('User', user)))
                  throw new ForbiddenException('cannot update User');

                return user;
              }

        if (prisma) return update(prisma);
        return this.prisma.$transaction((client) => update(client.user));
    }

    async delete<T extends Prisma.UserDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>, abilities: AnyAbility, prisma?: Prisma.UserDelegate<undefined>) {
        const deleteCb = async(client: Prisma.UserDelegate<undefined>) => {
                const user = await this.userService.delete<T>(args, client);

                if (abilities?.cannot(Action.Delete, subject('User', user)))
                  throw new ForbiddenException('cannot delete User');

                return user;
              }

        if (prisma) return deleteCb(prisma);
        return this.prisma.$transaction((client) => deleteCb(client.user));
    }

    async count<T extends Prisma.UserCountArgs>(args: Prisma.SelectSubset<T, Prisma.UserCountArgs>, abilities: AnyAbility, prisma?: Prisma.UserDelegate<undefined>) {
        const where = {
                AND: [abilities ? accessibleBy(abilities).User : {}, args?.where ?? {}],
              };
        return this.userService.count<T>({ ...args, where });
    }
}
