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
  CreateUserDto,
  ReadUserDto,
  SearchUserDto,
  UpdateUserDto,
} from '../dtos';

@Controller(['v1/user', 'v1/admin/user'])
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  public async create(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.create(data);
  }

  @Get('count')
  public async count(@Query() filters: SearchUserDto): Promise<number> {
    return this.userService.count(filters);
  }

  @Get(':id')
  public async read(
    @Param('id', ParseIntPipe) id: number,
    @Query() include: ReadUserDto
  ): Promise<User> {
    return this.userService.read(id, include);
  }

  @Get()
  public async search(@Query() filters: SearchUserDto): Promise<User[]> {
    return this.userService.search(filters);
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto
  ): Promise<User> {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.delete(id);
  }
}
