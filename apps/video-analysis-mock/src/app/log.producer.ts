import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class LogProducer {
  constructor(@Inject('LOG_SERVICE') private logService: ClientProxy) {
    this.log('coucou');
  }

  public log(message: string) {
    this.logService.emit('create_log', message);
  }
}
