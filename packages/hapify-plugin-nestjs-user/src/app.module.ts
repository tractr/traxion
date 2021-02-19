import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication';
import { UserCustomService } from './authentication/services/user-customservice';
import { ModelsModule } from './generated.example/models.module';
import { UserService } from './generated.example/user';

@Module({
  imports: [
    AuthenticationModule,
    ModelsModule.register([
      {
        provide: UserService,
        useClass: UserCustomService,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
