import { AuthenticationOptions } from '../../src/authentication/interfaces';

export function mockAuthenticationOptionsFactory(): AuthenticationOptions {
  return jest.createMockFromModule<
    Record<'AUTHENTICATION_OPTIONS', AuthenticationOptions>
  >('../../src/authentication/config/authentication.config')
    .AUTHENTICATION_OPTIONS;
}
