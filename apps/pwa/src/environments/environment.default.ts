/* eslint-disable max-classes-per-file */
import { AngularConfig } from '@tractr/angular-config';
import { IsString, ValidateNested } from 'class-validator';

import { transformAndValidate } from '@cali/common-rext-client';

export class AppApiConfig {
  @IsString()
  uri!: string;
}

export class AppGraphqlConfig {
  @IsString()
  uri!: string;

  @IsString()
  ws!: string;
}

export class AppConfig {
  @ValidateNested()
  api!: AppApiConfig;

  @ValidateNested()
  graphql!: AppGraphqlConfig;
}

export const validateAppConfig = transformAndValidate(AppConfig);

export class AngularEnv {
  @IsString()
  API_URL!: string;

  @IsString()
  GRAPHQL_URL!: string;
}

export const validateEnv = transformAndValidate(AngularEnv);

export function getConfig(appConfig: AngularConfig): AppConfig {
  const { API_URL, GRAPHQL_URL } = validateEnv(appConfig);

  return validateAppConfig({
    api: {
      uri: API_URL,
    },
    graphql: {
      uri: GRAPHQL_URL,
      ws: `${GRAPHQL_URL.replace('https', 'ws').replace('http', 'ws')}`,
    },
  });
}
