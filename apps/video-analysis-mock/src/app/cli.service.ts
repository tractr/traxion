import { lorem } from 'faker';
import { Command, Console } from 'nestjs-console';

import { LogProducer } from './log.producer';

@Console({
  command: 'log',
  description: 'send fake logs to the message broker',
})
export class CliService {
  constructor(private logProducer: LogProducer) {}

  @Command({
    command: 'send-one',
    description: 'send one log to the message broker',
  })
  sendOne() {
    this.logProducer.log('PLOP');
  }
}
