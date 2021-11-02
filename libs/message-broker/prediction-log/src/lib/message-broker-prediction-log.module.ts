import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { DynamicModule, Module } from '@nestjs/common';
import { transformAndValidate } from '@tractr/common';
import { AsyncOptions, ModuleOptionsFactory } from '@tractr/nestjs-core';

import {
  MESSAGE_BROKER_PREDICTION_LOG_CONFIGURATION,
  MESSAGE_BROKER_PREDICTION_LOG_EXCHANGE,
} from './constants';
import { MessageBrokerPredictionLogService } from './services';

import { MessageBrokerConfiguration } from '@cali/message-broker-common';

@Module({})
export class MessageBrokerPredictionLogModule extends ModuleOptionsFactory<MessageBrokerConfiguration>(
  MESSAGE_BROKER_PREDICTION_LOG_CONFIGURATION,
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
      module: MessageBrokerPredictionLogModule,
      imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
          imports: [module],
          useFactory: (configuration: MessageBrokerConfiguration) => ({
            exchanges: [
              {
                name: MESSAGE_BROKER_PREDICTION_LOG_EXCHANGE,
                type: 'fanout',
              },
            ],
            uri: configuration.url,
            connectionInitOptions: { wait: false },
          }),
          inject: [MESSAGE_BROKER_PREDICTION_LOG_CONFIGURATION],
        }),
      ],
      providers: [MessageBrokerPredictionLogService],
      exports: [MessageBrokerPredictionLogService, RabbitMQModule],
    };
  }
}
