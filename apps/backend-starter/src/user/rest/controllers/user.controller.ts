import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from '../../common';
import {
  UserCreateBodyDto,
  UserFindUniqueParamsDto,
  UserFindUniqueQueryDto,
  UserFindManyQueryDto,
  UserUpdateParamsDto,
  UserUpdateBodyDto,
  UserCountQueryDto,
  UserDeleteParamsDto,
} from '../dtos';
import { UserRestDtoService } from '../services';

@Controller(['user', 'admin/user'])
export class UserController {
  constructor(
    private userService: UserService,
    private userRestDtoService: UserRestDtoService
  ) {}

  @Post()
  public async create(@Body() bodyDto: UserCreateBodyDto): Promise<User> {
    const formatedParams = this.userRestDtoService.formatCreateDto(bodyDto);
    return this.userService.create(formatedParams);
  }

  @Get('count')
  public async count(@Query() queryDto: UserCountQueryDto): Promise<number> {
    const formatedParams = this.userRestDtoService.formatCountDto(queryDto);
    return this.userService.count(formatedParams);
  }

  @Get(':id')
  public async findOne(
    @Param() paramsDto: UserFindUniqueParamsDto,
    @Query() queryDto: UserFindUniqueQueryDto
  ): Promise<User | null> {
    const formatedParams = this.userRestDtoService.formatFindUniqueDtos(
      paramsDto,
      queryDto
    );
    return this.userService.findUnique(formatedParams);
  }

  @Get()
  public async findMany(
    @Query() queryDto: UserFindManyQueryDto
  ): Promise<User[]> {
    const formatedParams = this.userRestDtoService.formatFindManyDto(queryDto);
    return this.userService.findMany(formatedParams);
  }

  @Put(':id')
  public async update(
    @Param() paramsDto: UserUpdateParamsDto,
    @Body() bodyDto: UserUpdateBodyDto
  ): Promise<User> {
    const formatedParams = this.userRestDtoService.formatUpdateDtos(
      paramsDto,
      bodyDto
    );
    return this.userService.update(formatedParams);
  }

  @Delete(':id')
  public async delete(@Param() paramsDto: UserDeleteParamsDto): Promise<User> {
    const formatedParams = this.userRestDtoService.formatDeleteDto(paramsDto);
    return this.userService.delete(formatedParams);
  }
}
