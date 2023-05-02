import { Injectable, Inject } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { RightService, RIGHT_SERVICE } from "../../nestjs-services";
import { AppAbility } from "../../casl-target";

@Injectable()
export class RightAuthorizedService {
    constructor(@Inject(RIGHT_SERVICE) private readonly rightService: RightService) {
    }

    async findUnique<T extends Prisma.RightFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.RightFindUniqueArgs>, abilities: AppAbility, prisma?: Prisma.RightDelegate<undefined>) {
        return this.rightService.findUnique<T>(args, prisma);
    }

    async findMany<T extends Prisma.RightFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.RightFindManyArgs>, abilities: AppAbility, prisma?: Prisma.RightDelegate<undefined>) {
        return this.rightService.findMany<T>(args, prisma);
    }

    async create<T extends Prisma.RightCreateArgs>(args: Prisma.SelectSubset<T, Prisma.RightCreateArgs>, abilities: AppAbility, prisma?: Prisma.RightDelegate<undefined>) {
        return this.rightService.create<T>(args, prisma);
    }

    async update<T extends Prisma.RightUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.RightUpdateArgs>, abilities: AppAbility, prisma?: Prisma.RightDelegate<undefined>) {
        return this.rightService.findUnique<T>(args, prisma);
    }

    async delete<T extends Prisma.RightDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.RightDeleteArgs>, abilities: AppAbility, prisma?: Prisma.RightDelegate<undefined>) {
        return this.rightService.delete<T>(args, prisma);
    }

    async count<T extends Prisma.RightCountArgs>(args: Prisma.SelectSubset<T, Prisma.RightCountArgs>, abilities: AppAbility, prisma?: Prisma.RightDelegate<undefined>) {
        return this.rightService.count<T>(args, prisma);
    }
}
