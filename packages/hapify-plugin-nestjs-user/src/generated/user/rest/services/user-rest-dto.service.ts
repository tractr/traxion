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
  /**
   * Format dtos to create a User
   *
   * @param bodyDto - A valid body dto to create a User
   * @returns prisma parameters to create a User
   */
  public formatCreateDto(bodyDto: UserCreateBodyDto): Prisma.UserCreateArgs {
    const { name, email, password, role, banned } = bodyDto;
    const data = {
      name,
      email,
      password,
      role,
      banned,
    };
    return { data };
  }

  /**
   * Format dtos to count User entities
   *
   * @param queryDto - A valid query dto to filter User entities
   * @returns prisma parameters to count User entities
   */
  public formatCountDto(queryDto: UserCountQueryDto): Prisma.UserCountArgs {
    const { name, email, role, banned } = queryDto;
    const where = {
      name,
      email,
      role,
      banned,
    };
    return { where };
  }

  /**
   * Format dtos to find a unique User
   *
   * @param paramsDto - A valid params dto to find a unique User
   * @returns prisma parameters to find a unique User
   */
  public formatFindUniqueDtos(
    paramsDto: UserFindUniqueParamsDto,
  ): Prisma.UserFindUniqueArgs {
    return {
      where: { ...paramsDto },
    };
  }

  /**
   * Format dtos to find many User entities
   *
   * @param queryDto - A valid query dto to filter User entities
   * @returns prisma parameters to finde many User entities
   */
  public formatFindManyDto(
    queryDto: UserFindManyQueryDto,
  ): Prisma.UserFindManyArgs {
    const { name, email, role, banned, sort, order, take, skip } = queryDto;
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

  /**
   * Format dtos to update a User
   *
   * @param paramsDto - A valid params dto to find a unique User
   * @param bodyDto - A valid body dto to update a User
   * @returns prisma parameters to update a User
   */
  public formatUpdateDtos(
    paramsDto: UserUpdateParamsDto,
    bodyDto: UserUpdateBodyDto,
  ): Prisma.UserUpdateArgs {
    const { name, email, password, role, banned } = bodyDto;
    const data = {
      name,
      email,
      password,
      role,
      banned,
    };
    return { data, where: { ...paramsDto } };
  }

  /**
   * Format dtos to create or update a User
   *
   * @param paramsDto - A valid params dto to find a unique User
   * @param bodyDto - A valid body dto to create or update a User
   * @returns prisma parameters to create or update a User
   */
  public formatUpsertDtos(
    paramsDto: UserUpsertParamsDto,
    bodyDto: UserUpsertBodyDto,
  ): Prisma.UserUpsertArgs {
    const { name, email, password, role, banned } = bodyDto;
    const create = {
      name,
      email,
      password,
      role,
      banned,
    };
    const update = { ...create };
    return {
      create,
      update,
      where: { ...paramsDto },
    };
  }

  /**
   * Format dtos to delete a unique User
   *
   * @param paramsDto - A valid params dto to select a unique User to delete
   * @returns prisma parameters to deete a unique User
   */
  public formatDeleteDto(
    paramsDto: UserDeleteParamsDto,
  ): Prisma.UserDeleteArgs {
    return { where: { ...paramsDto } };
  }
}
