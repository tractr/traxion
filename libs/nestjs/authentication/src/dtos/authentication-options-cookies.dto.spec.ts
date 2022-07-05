import { AuthenticationOptionsCookies } from './authentication-options-cookies.dto';

import { transformAndValidate } from '@tractr/common';

describe('AuthenticationOptionsCookies', () => {
  it('should pass if config is valid', () => {
    const config = {
      cookieName: 'authCookie',
      options: {
        httpOnly: true,
        maxAge: 86400000,
        secure: false,
      },
      queryParamName: 'authToken',
    };

    const validatedDtoWithDefaults = transformAndValidate(
      AuthenticationOptionsCookies,
    )(config);

    expect(validatedDtoWithDefaults).toEqual(config);
  });

  it('should throw an error if config is not  valid', () => {
    const config = {
      cookieName: 123,
    };

    const validate = transformAndValidate(AuthenticationOptionsCookies);

    expect(() => validate(config)).toThrowError();
  });

  it('should initialize default values properly', () => {
    const config = {};

    const dtoDefault = {
      cookieName: 'authCookie',
      options: {
        httpOnly: true,
        maxAge: 86400000,
        secure: false,
      },
      queryParamName: 'authToken',
    };

    const validatedDtoWithDefaults = transformAndValidate(
      AuthenticationOptionsCookies,
    )(config);

    expect(validatedDtoWithDefaults).toEqual(dtoDefault);
  });
});
