import { DynamicModule, Module } from '@nestjs/common';
import { transformAndValidate } from '@tractr/common';
import { AsyncOptions, ModuleOptionsFactory } from '@tractr/nestjs-core';

import { NESTJS_MESSAGE_BROKER_CONFIGURATION } from './constants';
import { AlertSubscriber, VideoGenerationSubscriber } from './subscribers';

import { MessageBrokerAlertModule } from '@cali/message-broker-alert';
import { MessageBrokerConfiguration } from '@cali/message-broker-common';
import { MessageBrokerVideoGenerationModule } from '@cali/message-broker-video-generation';
import { AlertModelModule } from '@cali/nestjs-common';
import { NestjsPubSubModule } from '@cali/nestjs-pub-sub';

@Module({})
export class MessageBrokerModule extends ModuleOptionsFactory<MessageBrokerConfiguration>(
  NESTJS_MESSAGE_BROKER_CONFIGURATION,
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
      module: MessageBrokerModule,
      imports: [
        NestjsPubSubModule,
        AlertModelModule.register(),
        MessageBrokerAlertModule.registerAsync({
          imports: [module],
          useFactory: (_, configuration: MessageBrokerConfiguration) =>
            configuration,
          inject: [NESTJS_MESSAGE_BROKER_CONFIGURATION],
        }),
        MessageBrokerVideoGenerationModule.registerAsync({
          imports: [module],
          useFactory: (_, configuration: MessageBrokerConfiguration) =>
            configuration,
          inject: [NESTJS_MESSAGE_BROKER_CONFIGURATION],
        }),
      ],
      providers: [AlertSubscriber, VideoGenerationSubscriber],
      exports: [],
    };
  }
}
