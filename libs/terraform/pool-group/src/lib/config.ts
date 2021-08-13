// Load the env from .env and put it into process.env
import * as process from 'process';

import { kebab } from 'case';
import { config } from 'dotenv';

import type { PoolGroupConfig } from './pool.group';

config();

const { ENV_NAME, REVERSE_PROXY_DESIRED_COUNT } = process.env;

// Ensure mandatory envs
if (!ENV_NAME) {
  throw new Error('ENV_NAME must be defined');
}

function guessContextFromEnvName(envName: string): {
  subDomain: string;
  dockerLabels: string;
} {
  if (envName === 'main') {
    return {
      subDomain: 'www',
      dockerLabels: 'latest',
    };
  }
  return {
    subDomain: kebab(envName),
    dockerLabels: kebab(envName),
  };
}
const context = guessContextFromEnvName(ENV_NAME);

export const poolConfig: Omit<
  PoolGroupConfig,
  'registryGroup' | 'networkGroup' | 'zoneGroup' | 'hootsuiteGroup'
> = {
  subDomain: context.subDomain,
  reverseProxyDesiredCount: REVERSE_PROXY_DESIRED_COUNT
    ? Number(REVERSE_PROXY_DESIRED_COUNT)
    : 1,
};
