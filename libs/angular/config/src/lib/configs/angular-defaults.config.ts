import { AngularConfig, AngularConfigOptions } from '../interfaces';

export type AngularDefaultOptions = AngularConfigOptions;

export const ANGULAR_DEFAULTS_OPTIONS: AngularDefaultOptions = {
  apiEndpoint: 'assets/app-config.json',
  getConfig: (angularConfig: AngularConfig) => angularConfig,
};
