import { PoolGroupConfig } from '../interfaces';

export const POOL_GROUP_DEFAULT_CONFIG: Pick<
  PoolGroupConfig,
  'subDomain' | 'reverseProxyDesiredCount'
> = {
  subDomain: 'www',
  reverseProxyDesiredCount: 1,
};
