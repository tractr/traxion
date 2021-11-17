import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { AlertService as BaseAlertService } from '../../generated';

@Injectable()
export class AlertService extends BaseAlertService {
  /**
   * Create an Alert and push a graphql notification.
   *
   * @param {AlertCreateArgs} args - Arguments to create a Alert.
   * @example
   * // Create one Alert
   * const Alert = await this.alertService.create({
   *   data: {
   *     // ... data to create a Alert
   *   }
   * })
   *
   * */
  async create<T extends Prisma.AlertCreateArgs>(
    args: Prisma.SelectSubset<T, Pick<Prisma.AlertCreateArgs, 'data'>>,
  ) {
    // Insert new alert in database
    const alert = await super.create(args);

    // Send an alertCreated graphql notification
    // await pubSub.publish('alertCreated', { alertCreated: { id: alert.id } });

    // Return created alert
    return alert;
  }
}
