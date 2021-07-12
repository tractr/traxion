import { Inject } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';

import { USER_SERVICE, UserService } from '@generated/nestjs-models-common';

@Console({ alias: 'user' })
export class UserPasswordCli {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: UserService,
  ) {}

  @Command({
    command: 'find',
  })
  async findUser(): Promise<void> {
    const user = await this.userService.findFirst();
    console.info(user);
  }
}
