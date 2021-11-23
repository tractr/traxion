import { IsString } from 'class-validator';

export class AppEnvironmentVariables {
  @IsString()
  MESSAGE_BROKER_URL!: string;

  @IsString()
  MESSAGE_BROKER_USER!: string;

  @IsString()
  MESSAGE_BROKER_PASSWORD!: string;
}
