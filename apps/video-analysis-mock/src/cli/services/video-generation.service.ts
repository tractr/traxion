import { Command, Console } from 'nestjs-console';
import { interval, map, tap } from 'rxjs';

import {
  MessageBrokerVideoGenerationService,
  mockVideoGeneration,
} from '@cali/message-broker-video-generation';

@Console({
  command: 'video-generation',
  description: 'send video generation status to the message broker',
})
export class VideoGenerationService {
  constructor(
    private messageBrokerVideoGenerationService: MessageBrokerVideoGenerationService,
  ) {}

  @Command({
    command: 'publish-one',
    description: 'publish a random video generation status',
  })
  public async publishOne() {
    try {
      await this.messageBrokerVideoGenerationService.publish({
        routingKey: '',
        message: mockVideoGeneration(),
      });
    } catch (e) {
      console.error(e);
    }
  }

  @Command({
    command: 'publish-interval <timeInterval>',
    description:
      'publish video generation status at the specified interval (ms)',
  })
  public async publishInterval(timeInterval: string) {
    const timeIntervalNumber = parseInt(timeInterval, 10);

    if (Number.isNaN(timeIntervalNumber))
      throw Error('Time interval must be an integer');

    try {
      interval(timeIntervalNumber)
        .pipe(
          map(() =>
            this.messageBrokerVideoGenerationService.publish({
              routingKey: '',
              message: mockVideoGeneration(),
            }),
          ),
          tap(() => console.info(`Send framePerformanceAlert`)),
        )
        .subscribe();
    } catch (e) {
      console.error(e);
    }
  }
}
