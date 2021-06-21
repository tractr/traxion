import { AuthenticationOptions } from '../../src/interfaces';

export function mockAuthenticationOptionsFactory(): AuthenticationOptions {
  return jest.createMockFromModule<
    Record<'AUTHENTICATION_OPTIONS', AuthenticationOptions>
  >('../../src/config/authentication.config').AUTHENTICATION_OPTIONS;
}
