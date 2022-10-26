/* eslint-disable max-classes-per-file */
import { IsString, ValidateNested } from 'class-validator';

export class AppApiConfig {
  @IsString()
  uri!: string;
}

export class AppConfig {
  @ValidateNested()
  api!: AppApiConfig;
}

export class AdminEnv {
  @IsString()
  API_URL!: string;
}
