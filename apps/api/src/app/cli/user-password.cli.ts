import { Inject } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';

import { USER_SERVICE, UserService } from '@generated/nestjs-models-common';

@Console({ command: 'user' })
export class UserPasswordCli {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: UserService,
  ) {}

  @Command({
    command: 'find',
  })
  async findUser(): Promise<void> {
    console.log('here modafucker');
    try {
      const user = await this.userService.findFirst();
      console.info(user);
    } catch (e) {
      console.log(e);
    }
  }
}
