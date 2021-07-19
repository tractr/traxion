import { AngularConfig } from './angular-config';

export interface AngularConfigOptions<T extends AngularConfig = AngularConfig> {
  apiEndpoint: string;
  getConfig: (angularConfig: AngularConfig) => T;
}
