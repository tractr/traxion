import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { Logger, ModuleOverride } from '@tractr/nestjs-core';
import { DatabaseService } from '@tractr/nestjs-database';
import { PubSub } from 'graphql-subscriptions';

import {
  ALERT_DATABASE_SERVICE,
  ALERT_SERVICE,
  alertDatabaseServiceFactory,
  alertDatabaseServiceInject,
  AlertService,
} from '../generated';

import {
  NestjsPubSubModule,
  PUB_SUB_SERVICE,
  PubSubQueue,
} from '@cali/nestjs-pub-sub';

const PrismaMiddlewareActionMap = {
  create: PubSubQueue.alertCreated,
  update: PubSubQueue.alertUpdated,
} as const;

const providers = [
  {
    provide: ALERT_SERVICE,
    useClass: AlertService,
  },
  {
    provide: ALERT_DATABASE_SERVICE,
    useFactory: alertDatabaseServiceFactory,
    inject: alertDatabaseServiceInject,
  },
];

@Module({
  imports: [NestjsPubSubModule],
  exports: providers,
  providers,
})
export class AlertModelModule extends ModuleOverride implements OnModuleInit {
  constructor(
    private readonly logger: Logger,
    private readonly databaseService: DatabaseService,
    @Inject(PUB_SUB_SERVICE) private readonly pubSub: PubSub,
  ) {
    super();
    this.logger.setContext(`${AlertModelModule.name}PrismaHook`);
  }

  /**
   * Add a prisma middleware to send push notification on Alert creation and update
   */
  onModuleInit() {
    this.databaseService.$use(async (params, next) => {
      // List of the action handled by the middleware
      const middlewareActions = Object.keys(PrismaMiddlewareActionMap);

      // Bypass middleware for event that ar not alert creation or update
      if (
        params.model !== 'Alert' ||
        !middlewareActions.includes(params.action)
      )
        return next(params);

      // Select the id field if it is not selected in the incoming params
      const customSelect = params.args.select
        ? { ...params.args.select, id: true }
        : { id: true };

      // Execute the database request is custom select
      const result = await next({
        ...params,
        args: { ...params.args, select: customSelect },
      });

      // Dynamically determine the queue to publish events, depending of the prisma action
      const pubSubQueue = PrismaMiddlewareActionMap[params.action];

      // Send the id of the created feedback via push notification
      try {
        await this.pubSub.publish(pubSubQueue, {
          [pubSubQueue]: { id: result.id },
        });
      } catch (error) {
        this.logger.error(
          `Something went wrong while publishing to ${pubSubQueue}: ${error}`,
        );
      }

      // Remove the id field if it was not selected in the incoming params
      // to keep middleware transparency
      if (!params.args.select?.id) delete result.id;

      // Return database request result
      return result;
    });
  }
}
