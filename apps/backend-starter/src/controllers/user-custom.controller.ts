import { Controller, Get, Query } from '@nestjs/common';

import { UserController } from '@generated/nestjs-models-rest';
import { UserFindManyQueryDto } from '@generated/rest-dtos';

import { User } from '@prisma/client';

@Controller(['user'])
export class UserCustomController extends UserController {
  @Get()
  public async findMany(
    @Query() queryDto: UserFindManyQueryDto,
  ): Promise<User[]> {
    console.info('Controller has been overrided');
    const formatedParams = this.userRestDtoService.formatFindManyDto(queryDto);
    return this.userService.findMany(formatedParams);
  }
}
