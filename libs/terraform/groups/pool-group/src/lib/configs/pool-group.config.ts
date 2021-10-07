import { PoolGroupDefaultConfig } from '../interfaces';

export const POOL_GROUP_DEFAULT_CONFIG: PoolGroupDefaultConfig = {
  subDomain: 'www',
  reverseProxyConfig: {
    desiredCount: 1,
    cpu: '256',
    memory: '512',
  },
};
