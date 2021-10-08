import { SecretValue } from '@tractr/terraform-ecs-services';

export const SECRET_ENVIRONMENT = Symbol('SecretEnvironment');

export function Secret(secretKey?: string): symbol | SecretValue {
  if (secretKey) {
    return { type: 'secret', secretKey };
  }
  return SECRET_ENVIRONMENT;
}
