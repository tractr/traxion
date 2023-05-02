import { Injectable, Inject } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { RoleService, ROLE_SERVICE } from "../../nestjs-services";
import { AppAbility } from "../../casl-target";

@Injectable()
export class RoleAuthorizedService {
    constructor(@Inject(ROLE_SERVICE) private readonly roleService: RoleService) {
    }

    async findUnique<T extends Prisma.RoleFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.RoleFindUniqueArgs>, abilities: AppAbility, prisma?: Prisma.RoleDelegate<undefined>) {
        return this.roleService.findUnique<T>(args, prisma);
    }

    async findMany<T extends Prisma.RoleFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.RoleFindManyArgs>, abilities: AppAbility, prisma?: Prisma.RoleDelegate<undefined>) {
        return this.roleService.findMany<T>(args, prisma);
    }

    async create<T extends Prisma.RoleCreateArgs>(args: Prisma.SelectSubset<T, Prisma.RoleCreateArgs>, abilities: AppAbility, prisma?: Prisma.RoleDelegate<undefined>) {
        return this.roleService.create<T>(args, prisma);
    }

    async update<T extends Prisma.RoleUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.RoleUpdateArgs>, abilities: AppAbility, prisma?: Prisma.RoleDelegate<undefined>) {
        return this.roleService.findUnique<T>(args, prisma);
    }

    async delete<T extends Prisma.RoleDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.RoleDeleteArgs>, abilities: AppAbility, prisma?: Prisma.RoleDelegate<undefined>) {
        return this.roleService.delete<T>(args, prisma);
    }

    async count<T extends Prisma.RoleCountArgs>(args: Prisma.SelectSubset<T, Prisma.RoleCountArgs>, abilities: AppAbility, prisma?: Prisma.RoleDelegate<undefined>) {
        return this.roleService.count<T>(args, prisma);
    }
}
