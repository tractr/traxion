import { terraformServiceLogstash } from './terraform-service-logstash';

describe('terraformServiceLogstash', () => {
  it('should work', () => {
    expect(terraformServiceLogstash()).toEqual('terraform-service-logstash');
  });
});
