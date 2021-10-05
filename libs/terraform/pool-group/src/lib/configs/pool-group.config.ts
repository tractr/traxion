import { PoolGroupPublicConfig } from '../interfaces';

export const POOL_GROUP_DEFAULT_CONFIG: PoolGroupPublicConfig = {
  subDomain: 'www',
  reverseProxy: {
    desiredCount: 1,
    cpu: '256',
    memory: '512',
    dockerImageTags: 'v2.4.8',
  },
};
