import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';

import { CliService } from './services';

import { MessageBrokerAlertModule } from '@cali/message-broker-alert';

@Module({
  imports: [ConsoleModule, MessageBrokerAlertModule],
  providers: [CliService],
})
export class CliModule {}
