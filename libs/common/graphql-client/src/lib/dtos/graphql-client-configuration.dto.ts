import { IsUrl } from 'class-validator';

export class GraphqlClientConfiguration {
  /**
   * Url for the graphql http endpoint
   */
  @IsUrl({
    protocols: ['http', 'https'],
    require_port: false,
    require_protocol: true,
    require_tld: false,
  })
  httpUri!: string;

  /**
   * Url for the graphql websocket endpoint
   */
  @IsUrl({
    protocols: ['ws'],
    require_port: false,
    require_protocol: true,
    require_tld: false,
  })
  wsUri!: string;
}
