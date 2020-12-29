import { Module } from '@nestjs/common';
import { DatabaseModule, LogModule } from 'src/core';
import { UserController } from './controllers';
import { UserResolver } from './resolvers';
import { UserService } from './services';

@Module({
  imports: [DatabaseModule, LogModule],
  providers: [UserService, UserResolver],
  controllers: [UserController],
})
export class UserModule {}
