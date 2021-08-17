import { PoolGroupConfig } from '../interfaces';

export const poolGroupDefaultConfig: Pick<
  PoolGroupConfig,
  'subDomain' | 'reverseProxyDesiredCount'
> = {
  subDomain: 'www',
  reverseProxyDesiredCount: 1,
};
