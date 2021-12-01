import { IsIn, IsString } from 'class-validator';

export class MessageBrokerConfiguration {
  /**
   * Domain of the message broker
   */
  @IsString()
  domain: string;

  /**
   * Port of the message broker
   */
  @IsString()
  port: string;

  /**
   * Protocol of the message broker
   */
  @IsString()
  @IsIn(['amqp', 'amqps'])
  protocol: string;

  /**
   * User of the message broker
   */
  @IsString()
  user!: string;

  /**
   * User's password
   */
  @IsString()
  password!: string;
}
