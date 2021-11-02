import { DynamicModule, Module } from '@nestjs/common';
import { transformAndValidate } from '@tractr/common';
import { AsyncOptions, ModuleOptionsFactory } from '@tractr/nestjs-core';

import { MESSAGE_BROKER_HANDLER_ALERT_FILTER_CONFIGURATION } from './constants';
import { MessageBrokerHandlerAlertFilterService } from './services';

import { MessageBrokerAlertModule } from '@cali/message-broker-alert';
import { MessageBrokerConfiguration } from '@cali/message-broker-common';
import { MessageBrokerPredictionLogModule } from '@cali/message-broker-prediction-log';

@Module({})
export class MessageBrokerHandlerAlertFilterModule extends ModuleOptionsFactory<MessageBrokerConfiguration>(
  MESSAGE_BROKER_HANDLER_ALERT_FILTER_CONFIGURATION,
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
      module: MessageBrokerHandlerAlertFilterModule,
      imports: [
        MessageBrokerPredictionLogModule.registerAsync({
          imports: [module],
          useFactory: (_, configuration: MessageBrokerConfiguration) =>
            configuration,
          inject: [MESSAGE_BROKER_HANDLER_ALERT_FILTER_CONFIGURATION],
        }),
        MessageBrokerAlertModule.registerAsync({
          imports: [module],
          useFactory: (_, configuration: MessageBrokerConfiguration) =>
            configuration,
          inject: [MESSAGE_BROKER_HANDLER_ALERT_FILTER_CONFIGURATION],
        }),
      ],
      providers: [MessageBrokerHandlerAlertFilterService],
      exports: [
        MessageBrokerHandlerAlertFilterService,
        MessageBrokerPredictionLogModule,
        MessageBrokerAlertModule,
      ],
    };
  }
}
