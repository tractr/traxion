import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { UserService } from '../../common';
import { USER_SERVICE } from '../../common/user-model.constant';
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
import { UserRestDtoService } from '../services';
import { USER_REST_DTO_SERVICE } from '../user-rest.constant';

@Controller(['user'])
export class UserController {
  constructor(
    @Inject(USER_SERVICE)
    protected userService: UserService,
    @Inject(USER_REST_DTO_SERVICE)
    protected userRestDtoService: UserRestDtoService,
  ) {}

  /**
   * Create a new User
   *
   * @param bodyDto - Dto of the request body
   * @returns a new User
   */
  @Post()
  public async create(@Body() bodyDto: UserCreateBodyDto): Promise<User> {
    const formatedParams = this.userRestDtoService.formatCreateDto(bodyDto);
    return this.userService.create(formatedParams);
  }

  /**
   * Find zero or one User that matches the filter
   *
   * @param paramsDto - Dto of the request param
   * @param queryDto - Dto of the request query
   * @returns a User or null
   */
  @Get(':id')
  public async findUnique(
    @Param() paramsDto: UserFindUniqueParamsDto,
  ): Promise<User | null> {
    const formatedParams = this.userRestDtoService.formatFindUniqueDtos(
      paramsDto,
    );
    return this.userService.findUnique(formatedParams);
  }

  /**
   * Find zero or more User entities that matches the filter
   *
   * @param queryDto - Dto of the request query
   * @returns an array of User entities
   */
  @Get()
  public async findMany(
    @Query() queryDto: UserFindManyQueryDto,
  ): Promise<User[]> {
    const formatedParams = this.userRestDtoService.formatFindManyDto(queryDto);
    return this.userService.findMany(formatedParams);
  }

  /**
   * Count the number of User entities that matches the filter
   *
   * @param queryDto - Dto of the request query
   * @returns the number of User
   */
  @Get('count')
  public async count(@Query() queryDto: UserCountQueryDto): Promise<number> {
    const formatedParams = this.userRestDtoService.formatCountDto(queryDto);
    return this.userService.count(formatedParams);
  }

  /**
   * Update one User
   *
   * @Remarks
   *
   * Partial updates are allowed with this method
   *
   * @param paramsDto - Dto of the request param
   * @param bodyDto - Dto of the request body
   * @returns the updated User
   */
  @Patch(':id')
  public async update(
    @Param() paramsDto: UserUpdateParamsDto,
    @Body() bodyDto: UserUpdateBodyDto,
  ): Promise<User> {
    const formatedParams = this.userRestDtoService.formatUpdateDtos(
      paramsDto,
      bodyDto,
    );
    return this.userService.update(formatedParams);
  }

  /**
   * Update or create one User
   *
   * @Remarks
   *
   * Partial updates are forbidden with this method. It will
   * fully replace the matched entity
   *
   * @param paramsDto - Dto of the request param
   * @param bodyDto - Dto of the request body
   * @returns the updated User
   */
  @Put(':id')
  public async upsert(
    @Param() paramsDto: UserUpsertParamsDto,
    @Body() bodyDto: UserUpsertBodyDto,
  ): Promise<User> {
    const formatedParams = this.userRestDtoService.formatUpsertDtos(
      paramsDto,
      bodyDto,
    );
    return this.userService.upsert(formatedParams);
  }

  /**
   * Delete one User
   *
   * @param paramsDto - Dto of the request param
   * @returns the updated User
   */
  @Delete(':id')
  public async delete(@Param() paramsDto: UserDeleteParamsDto): Promise<User> {
    const formatedParams = this.userRestDtoService.formatDeleteDto(paramsDto);
    return this.userService.delete(formatedParams);
  }
}
