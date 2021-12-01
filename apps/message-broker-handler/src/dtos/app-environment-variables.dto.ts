import { IsString } from 'class-validator';

export class AppEnvironmentVariables {
  @IsString()
  MESSAGE_BROKER_DOMAIN!: string;

  @IsString()
  MESSAGE_BROKER_PORT!: string;

  @IsString()
  MESSAGE_BROKER_PROTOCOL!: string;

  @IsString()
  MESSAGE_BROKER_USER!: string;

  @IsString()
  MESSAGE_BROKER_PASSWORD!: string;
}
