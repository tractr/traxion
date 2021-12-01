import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { Logger, ModuleOverride } from '@tractr/nestjs-core';
import { DatabaseService } from '@tractr/nestjs-database';
import { PubSub } from 'graphql-subscriptions';

import {
  ALERT_FEEDBACK_DATABASE_SERVICE,
  ALERT_FEEDBACK_SERVICE,
  alertFeedbackDatabaseServiceFactory,
  alertFeedbackDatabaseServiceInject,
  AlertFeedbackService,
} from '../generated';

import {
  NestjsPubSubModule,
  PUB_SUB_SERVICE,
  PubSubQueue,
} from '@cali/nestjs-pub-sub';

const providers = [
  {
    provide: ALERT_FEEDBACK_SERVICE,
    useClass: AlertFeedbackService,
  },
  {
    provide: ALERT_FEEDBACK_DATABASE_SERVICE,
    useFactory: alertFeedbackDatabaseServiceFactory,
    inject: alertFeedbackDatabaseServiceInject,
  },
];

@Module({
  imports: [NestjsPubSubModule],
  exports: providers,
  providers,
})
export class AlertFeedbackModelModule
  extends ModuleOverride
  implements OnModuleInit
{
  constructor(
    private readonly logger: Logger,
    private readonly databaseService: DatabaseService,
    @Inject(PUB_SUB_SERVICE) private readonly pubSub: PubSub,
  ) {
    super();
    this.logger.setContext(`${AlertFeedbackModelModule.name}PrismaHook`);
  }

  /**
   * Add a prisma middleware to send push notification on AlertFeedback creation
   */
  onModuleInit() {
    this.databaseService.$use(async (params, next) => {
      // Bypass middleware for event that ar not alert feedback creation
      if (params.model !== 'AlertFeedback' || params.action !== 'create')
        return next(params);

      // Select the id and alertId fields if it is not selected in the incoming params
      const customSelect =
        !params.args.include && params.args.select
          ? { ...params.args.select, id: true, alertId: true }
          : undefined;

      // Execute the database request is custom select
      const result = await next({
        ...params,
        args: { ...params.args, select: customSelect },
      });

      // Send the id of the created feedback via push notification
      try {
        await this.pubSub.publish(PubSubQueue.alertFeedbackCreated, {
          [PubSubQueue.alertFeedbackCreated]: {
            id: result.id,
            alertId: result.alertId,
          },
        });
      } catch (error) {
        this.logger.error(
          `Something went wrong while publishing to ${PubSubQueue.alertFeedbackCreated}: ${error}`,
        );
      }

      // Remove the id field if it was not selected in the incoming params
      // to keep middleware transparency
      if (params.args.select && !params.args.select.id) delete result.id;

      // Remove the alertId field if it was not selected in the incoming params
      // to keep middleware transparency
      if (params.args.select && !params.args.select.alertId)
        delete result.alertId;

      // Return database request result
      return result;
    });
  }
}
