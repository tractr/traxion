import { Injectable } from '@nestjs/common';

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

import { Prisma } from '@prisma/client';


@Injectable()
export class UserRestDtoService {
  /**
   * Format dtos to create a User
   *
   * @param bodyDto - A valid body dto to create a User
   * @returns prisma parameters to create a User
   */
  public formatCreateDto(bodyDto: UserCreateBodyDto): Prisma.UserCreateArgs {
    const { ...values } = bodyDto;
    const data = {
      ...values,
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
    const { ...values } = queryDto;
    const where = {
      ...values,
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
    const { sort, order, take, skip, ...values } = queryDto;
    const where: Prisma.UserWhereInput = {
      ...values,
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
    const { ...values } = bodyDto;
    const data = {
      ...values,
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
