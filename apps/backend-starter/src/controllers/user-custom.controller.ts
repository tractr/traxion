import { Controller, Get, Query } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserController } from '@generated/nestjs-models-rest';
import { UserFindManyQueryDto } from '@generated/rest-dtos';

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
