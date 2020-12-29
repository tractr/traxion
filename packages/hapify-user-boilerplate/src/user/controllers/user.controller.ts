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
import { CreateUserDto, ReadUserDto, UpdateUserDto } from '../dtos';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  public async create(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.create(data);
  }

  @Get()
  public async read(@Query() filters: ReadUserDto): Promise<User[]> {
    return this.userService.read(filters);
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
