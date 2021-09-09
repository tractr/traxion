import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConsoleModule } from 'nestjs-console';

import { CliService } from './cli.service';
import { LogConsumer } from './log.consumer';
import { LogProducer } from './log.producer';

@Module({
  imports: [
    ConsoleModule,
    ClientsModule.register([
      {
        name: 'LOG_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'logs',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [LogConsumer],
  providers: [LogProducer, CliService],
})
export class AppModule {}
