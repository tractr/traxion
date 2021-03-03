import { Prisma } from '@prisma/client';
import { UserCountQueryDto, UserCreateBodyDto, UserDeleteParamsDto, UserFindManyQueryDto, UserFindUniqueParamsDto, UserUpdateBodyDto, UserUpdateParamsDto, UserUpsertBodyDto, UserUpsertParamsDto } from '../dtos';
export declare class UserRestDtoService {
    formatCreateDto(bodyDto: UserCreateBodyDto): Prisma.UserCreateArgs;
    formatCountDto(queryDto: UserCountQueryDto): Prisma.UserCountArgs;
    formatFindUniqueDtos(paramsDto: UserFindUniqueParamsDto): Prisma.UserFindUniqueArgs;
    formatFindManyDto(queryDto: UserFindManyQueryDto): Prisma.UserFindManyArgs;
    formatUpdateDtos(paramsDto: UserUpdateParamsDto, bodyDto: UserUpdateBodyDto): Prisma.UserUpdateArgs;
    formatUpsertDtos(paramsDto: UserUpsertParamsDto, bodyDto: UserUpsertBodyDto): Prisma.UserUpsertArgs;
    formatDeleteDto(paramsDto: UserDeleteParamsDto): Prisma.UserDeleteArgs;
}
