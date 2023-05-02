import { Injectable, Inject } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ProfileService, PROFILE_SERVICE } from "../../nestjs-services";
import { AppAbility } from "../../casl-target";

@Injectable()
export class ProfileAuthorizedService {
    constructor(@Inject(PROFILE_SERVICE) private readonly profileService: ProfileService) {
    }

    async findUnique<T extends Prisma.ProfileFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.ProfileFindUniqueArgs>, abilities: AppAbility, prisma?: Prisma.ProfileDelegate<undefined>) {
        return this.profileService.findUnique<T>(args, prisma);
    }

    async findMany<T extends Prisma.ProfileFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.ProfileFindManyArgs>, abilities: AppAbility, prisma?: Prisma.ProfileDelegate<undefined>) {
        return this.profileService.findMany<T>(args, prisma);
    }

    async create<T extends Prisma.ProfileCreateArgs>(args: Prisma.SelectSubset<T, Prisma.ProfileCreateArgs>, abilities: AppAbility, prisma?: Prisma.ProfileDelegate<undefined>) {
        return this.profileService.create<T>(args, prisma);
    }

    async update<T extends Prisma.ProfileUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.ProfileUpdateArgs>, abilities: AppAbility, prisma?: Prisma.ProfileDelegate<undefined>) {
        return this.profileService.findUnique<T>(args, prisma);
    }

    async delete<T extends Prisma.ProfileDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.ProfileDeleteArgs>, abilities: AppAbility, prisma?: Prisma.ProfileDelegate<undefined>) {
        return this.profileService.delete<T>(args, prisma);
    }

    async count<T extends Prisma.ProfileCountArgs>(args: Prisma.SelectSubset<T, Prisma.ProfileCountArgs>, abilities: AppAbility, prisma?: Prisma.ProfileDelegate<undefined>) {
        return this.profileService.count<T>(args, prisma);
    }
}
