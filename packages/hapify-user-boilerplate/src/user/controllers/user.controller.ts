import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from '../services';
import {
  UserCreateDto,
  UserReadOneDto,
  UserReadManyDto,
  UserUpdateDto,
} from '../dtos';

@Controller(['v1/user', 'v1/admin/user'])
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  public async create(@Body() data: UserCreateDto): Promise<User> {
    return this.userService.create(data);
  }

  @Get('count')
  public async count(@Query() filters: UserReadManyDto): Promise<number> {
    const where = this.userService.searchDtoToSearchParams(filters);
    return this.userService.count(where);
  }

  @Get(':id')
  public async readOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() include: UserReadOneDto
  ): Promise<User> {
    return this.userService.readOne({ id }, { include });
  }

  @Get()
  public async readMany(@Query() filters: UserReadManyDto): Promise<User[]> {
    const where = this.userService.searchDtoToSearchParams(filters);
    return this.userService.readMany(where);
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserUpdateDto
  ): Promise<User> {
    return this.userService.update({ id }, data);
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.delete({ id });
  }
}
