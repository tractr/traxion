import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class LogConsumer {
  @EventPattern('create_log')
  handleLog(message: string) {
    console.info(message);
  }
}
