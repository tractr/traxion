import { User } from '@prisma/client';
import { UserService } from '../../common';
import { UserCountQueryDto, UserCreateBodyDto, UserDeleteParamsDto, UserFindManyQueryDto, UserFindUniqueParamsDto, UserUpdateBodyDto, UserUpdateParamsDto, UserUpsertBodyDto, UserUpsertParamsDto } from '../dtos';
import { UserRestDtoService } from '../services';
export declare class UserController {
    protected userService: UserService;
    protected userRestDtoService: UserRestDtoService;
    constructor(userService: UserService, userRestDtoService: UserRestDtoService);
    create(bodyDto: UserCreateBodyDto): Promise<User>;
    findUnique(paramsDto: UserFindUniqueParamsDto): Promise<User | null>;
    findMany(queryDto: UserFindManyQueryDto): Promise<User[]>;
    count(queryDto: UserCountQueryDto): Promise<number>;
    update(paramsDto: UserUpdateParamsDto, bodyDto: UserUpdateBodyDto): Promise<User>;
    upsert(paramsDto: UserUpsertParamsDto, bodyDto: UserUpsertBodyDto): Promise<User>;
    delete(paramsDto: UserDeleteParamsDto): Promise<User>;
}
