import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  UserCountQueryDto,
  UserCreateBodyDto,
  UserFindManyQueryDto,
  UserFindUniqueParamsDto,
  UserFindUniqueQueryDto,
  UserUpdateBodyDto,
  UserUpdateParamsDto,
  UserDeleteParamsDto,
} from '../dtos';

@Injectable()
export class UserRestDtoService {
  public formatCreateDto(bodyDto: UserCreateBodyDto): Prisma.UserCreateArgs {
    return {
      data: { ...bodyDto },
    };
  }

  public formatCountDto(queryDto: UserCountQueryDto): Prisma.UserCountArgs {
    return {
      where: { ...queryDto },
    };
  }

  public formatFindUniqueDtos(
    paramsDto: UserFindUniqueParamsDto,
    queryDto: UserFindUniqueQueryDto
  ): Prisma.UserFindUniqueArgs {
    return {
      where: { ...paramsDto },
      include: { ...queryDto },
    };
  }

  public formatFindManyDto(
    queryDto: UserFindManyQueryDto
  ): Prisma.UserFindManyArgs {
    return {
      where: { ...queryDto },
    };
  }

  public formatUpdateDtos(
    paramsDto: UserUpdateParamsDto,
    bodyDto: UserUpdateBodyDto
  ): Prisma.UserUpdateArgs {
    return {
      data: { ...bodyDto },
      where: { ...paramsDto },
    };
  }

  public formatDeleteDto(
    paramsDto: UserDeleteParamsDto
  ): Prisma.UserDeleteArgs {
    return {
      where: { ...paramsDto },
    };
  }
}
