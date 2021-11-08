import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { DynamicModule, Module } from '@nestjs/common';
import { transformAndValidate } from '@tractr/common';
import { AsyncOptions, ModuleOptionsFactory } from '@tractr/nestjs-core';

import {
  MESSAGE_BROKER_ALERT_CONFIGURATION,
  MESSAGE_BROKER_ALERT_EXCHANGE,
} from './constants';
import { MessageBrokerAlertService } from './services';

import { MessageBrokerConfiguration } from '@cali/message-broker-common';

@Module({})
export class MessageBrokerAlertModule extends ModuleOptionsFactory<MessageBrokerConfiguration>(
  MESSAGE_BROKER_ALERT_CONFIGURATION,
  transformAndValidate(MessageBrokerConfiguration),
) {
  static register(options: MessageBrokerConfiguration): DynamicModule {
    const module = super.register(options);
    return this.createModuleFromOptions(module);
  }

  static registerAsync(
    options: AsyncOptions<MessageBrokerConfiguration>,
  ): DynamicModule {
    const module = super.registerAsync(options);
    return this.createModuleFromOptions(module);
  }

  private static createModuleFromOptions(module: DynamicModule): DynamicModule {
    return {
      module: MessageBrokerAlertModule,
      imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
          imports: [module],
          useFactory: (configuration: MessageBrokerConfiguration) => ({
            exchanges: [
              {
                name: MESSAGE_BROKER_ALERT_EXCHANGE,
                type: 'fanout',
              },
            ],
            uri: configuration.url,
            connectionInitOptions: { wait: false },
          }),
          inject: [MESSAGE_BROKER_ALERT_CONFIGURATION],
        }),
      ],
      providers: [MessageBrokerAlertService],
      exports: [MessageBrokerAlertService],
    };
  }
}
