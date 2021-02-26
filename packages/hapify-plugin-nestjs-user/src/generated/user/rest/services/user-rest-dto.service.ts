import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  UserCountQueryDto,
  UserCreateBodyDto,
  UserDeleteParamsDto,
  UserFindManyQueryDto,
  UserFindUniqueParamsDto,
  UserUpdateBodyDto,
  UserUpdateParamsDto,
  UserUpsertBodyDto,
  UserUpsertParamsDto,
} from '../dtos';

@Injectable()
export class UserRestDtoService {
  public formatCreateDto({
    name,
    email,
    password,
    role,
    banned,
  }: UserCreateBodyDto): Prisma.UserCreateArgs {
    const data = {
      name,
      email,
      password,
      role,
      banned,
    };
    return { data };
  }

  public formatCountDto({
    name,
    email,
    role,
    banned,
  }: UserCountQueryDto): Prisma.UserCountArgs {
    const where = {
      name,
      email,
      role,
      banned,
    };
    return { where };
  }

  public formatFindUniqueDtos(
    paramsDto: UserFindUniqueParamsDto,
  ): Prisma.UserFindUniqueArgs {
    return {
      where: { ...paramsDto },
    };
  }

  public formatFindManyDto({
    name,
    email,
    role,
    banned,
    sort,
    order,
    take,
    skip,
  }: UserFindManyQueryDto): Prisma.UserFindManyArgs {
    const where: Prisma.UserWhereInput = {
      name,
      email,
      role,
      banned,
    };
    const orderBy = { [sort]: order };
    return {
      where,
      take,
      skip,
      orderBy,
    };
  }

  public formatUpdateDtos(
    paramsDto: UserUpdateParamsDto,
    { name, email, password, role, banned }: UserUpdateBodyDto,
  ): Prisma.UserUpdateArgs {
    const data = {
      name,
      email,
      password,
      role,
      banned,
    };
    return { data, where: { ...paramsDto } };
  }

  public formatUpsertDtos(
    paramsDto: UserUpsertParamsDto,
    { name, email, password, role, banned }: UserUpsertBodyDto,
  ): Prisma.UserUpsertArgs {
    const create = {
      name,
      email,
      password,
      role,
      banned,
    };
    const update = {
      name,
      email,
      password,
      role,
      banned,
    };
    return {
      create,
      update,
      where: { ...paramsDto },
    };
  }

  public formatDeleteDto(
    paramsDto: UserDeleteParamsDto,
  ): Prisma.UserDeleteArgs {
    return { where: { ...paramsDto } };
  }
}
