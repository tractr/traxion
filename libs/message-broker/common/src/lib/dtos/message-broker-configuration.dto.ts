import { IsString, IsUrl } from 'class-validator';

export class MessageBrokerConfiguration {
  /**
   * Url of the message broker
   */
  @IsUrl({
    protocols: ['amqp'],
    require_port: true,
    require_protocol: true,
    require_tld: false,
  })
  url!: string;

  @IsString()
  user!: string;

  @IsString()
  password!: string;
}
