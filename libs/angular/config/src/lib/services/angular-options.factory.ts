/* eslint-disable @typescript-eslint/no-explicit-any */
import { ANGULAR_CONFIGURATION_SESSION_STORAGE } from '../helpers';
import {
  AngularConfigModuleOptions,
  AngularConfigOptions,
} from '../interfaces';

export function createAngularConfigModuleOptions(
  options: AngularConfigOptions,
): () => AngularConfigModuleOptions {
  return () => ({
    sessionStorageKey:
      options.sessionStorageKey || ANGULAR_CONFIGURATION_SESSION_STORAGE,
    configurationEndpoint:
      options.configurationEndpoint || '/assets/app-config.json',
    transformConfig: options.transformConfig,
  });
}
