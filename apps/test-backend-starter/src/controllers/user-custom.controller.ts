import { Controller, Get, Query } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserController, UserFindManyQueryDto } from '../generated/user';

@Controller(['user'])
export class UserCustomController extends UserController {
  @Get()
  public async findMany(
    @Query() queryDto: UserFindManyQueryDto,
  ): Promise<User[]> {
    console.log('Controller has been overrided');
    const formatedParams = this.userRestDtoService.formatFindManyDto(queryDto);
    return this.userService.findMany(formatedParams);
  }
}
