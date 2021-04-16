import { UserController } from '@generated/nestjs-models-rest';
import { UserFindManyQueryDto } from '@generated/rest-dtos';
import { Controller, Get, Query } from '@nestjs/common';

@Controller(['user'])
export class UserCustomController extends UserController {
  @Get()
  public findMany(@Query() queryDto: UserFindManyQueryDto) {
    console.info('Controller has been overrided');
    const formatedParams = this.userRestDtoService.formatFindManyDto(queryDto);
    return this.userService.findMany(formatedParams);
  }
}
