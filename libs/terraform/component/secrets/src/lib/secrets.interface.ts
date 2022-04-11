import { secretsmanager } from '@cdktf/provider-aws';

export type SecretsComponentConfig = Record<string, never>;
export interface SecretsComponentArtifacts {
  secret: secretsmanager.SecretsmanagerSecret;
}
