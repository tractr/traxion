import { AngularConfig } from './angular-config';

export interface AngularConfigOptions<T = unknown> {
  apiEndpoint: string;
  getConfig: (angularConfig: AngularConfig) => T;
}
