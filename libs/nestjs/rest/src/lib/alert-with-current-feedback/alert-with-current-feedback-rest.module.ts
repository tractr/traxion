import { Module } from '@nestjs/common';

import { AlertWithCurrentFeedbackController } from './controllers';

import { AlertModelModule } from '@cali/nestjs-common';

@Module({
  imports: [AlertModelModule.register()],
  controllers: [AlertWithCurrentFeedbackController],
})
export class AlertWithCurrentFeedbackRestModule {}
