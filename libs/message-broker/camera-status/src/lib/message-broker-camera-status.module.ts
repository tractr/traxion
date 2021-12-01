import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { DynamicModule, Module } from '@nestjs/common';
import { transformAndValidate } from '@tractr/common';
import { AsyncOptions, ModuleOptionsFactory } from '@tractr/nestjs-core';

import {
  MESSAGE_BROKER_CAMERA_STATUS_CONFIGURATION,
  MESSAGE_BROKER_CAMERA_STATUS_EXCHANGE,
} from './constants';
import { MessageBrokerCameraStatusService } from './services';

import {
  generateConnectionUrl,
  MessageBrokerConfiguration,
} from '@cali/message-broker-common';

@Module({})
export class MessageBrokerCameraStatusModule extends ModuleOptionsFactory<MessageBrokerConfiguration>(
  MESSAGE_BROKER_CAMERA_STATUS_CONFIGURATION,
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
      module: MessageBrokerCameraStatusModule,
      imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
          imports: [module],
          useFactory: (configuration: MessageBrokerConfiguration) => ({
            exchanges: [
              {
                name: MESSAGE_BROKER_CAMERA_STATUS_EXCHANGE,
                type: 'fanout',
              },
            ],
            uri: generateConnectionUrl(configuration),
            connectionInitOptions: { wait: true },
          }),
          inject: [MESSAGE_BROKER_CAMERA_STATUS_CONFIGURATION],
        }),
      ],
      providers: [MessageBrokerCameraStatusService],
      exports: [MessageBrokerCameraStatusService],
    };
  }
}
