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
import { USER_REST_DTO_SERVICE } from '../user-rest.constant';
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

@Controller(['user'])
export class UserController {
  constructor(
    @Inject(USER_SERVICE)
    protected userService: UserService,
    @Inject(USER_REST_DTO_SERVICE)
    protected userRestDtoService: UserRestDtoService,
  ) {}

  @Post()
  public async create(@Body() bodyDto: UserCreateBodyDto): Promise<User> {
    const formatedParams = this.userRestDtoService.formatCreateDto(bodyDto);
    return this.userService.create(formatedParams);
  }

  @Get()
  public async findMany(
    @Query() queryDto: UserFindManyQueryDto,
  ): Promise<User[]> {
    const formatedParams = this.userRestDtoService.formatFindManyDto(queryDto);
    return this.userService.findMany(formatedParams);
  }

  @Get('count')
  public async count(@Query() queryDto: UserCountQueryDto): Promise<number> {
    const formatedParams = this.userRestDtoService.formatCountDto(queryDto);
    return this.userService.count(formatedParams);
  }

  @Get(':id')
  public async findOne(
    @Param() paramsDto: UserFindUniqueParamsDto,
  ): Promise<User | null> {
    const formatedParams = this.userRestDtoService.formatFindUniqueDtos(
      paramsDto,
    );
    return this.userService.findUnique(formatedParams);
  }

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

  @Delete(':id')
  public async delete(@Param() paramsDto: UserDeleteParamsDto): Promise<User> {
    const formatedParams = this.userRestDtoService.formatDeleteDto(paramsDto);
    return this.userService.delete(formatedParams);
  }
}
