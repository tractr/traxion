import { getAuthConfig } from '../../../../src/user/common/config/auth.config';

describe('User auth configurations', () => {
  const {
    TRACTR_USER_JWT_SECRET,
    TRACTR_USER_JWT_EXPIRES_IN,
    TRACTR_USER_PASSWORD_SALT_LENGTH,
    TRACTR_USER_LOGIN_KEY,
  } = process.env;

  beforeEach(() => {
    delete process.env.TRACTR_USER_JWT_SECRET;
    delete process.env.TRACTR_USER_JWT_EXPIRES_IN;
    delete process.env.TRACTR_USER_PASSWORD_SALT_LENGTH;
    delete process.env.TRACTR_USER_LOGIN_KEY;
  });

  afterEach(() => {
    if (TRACTR_USER_JWT_SECRET)
      process.env.TRACTR_USER_JWT_SECRET = TRACTR_USER_JWT_SECRET;
    if (TRACTR_USER_JWT_EXPIRES_IN)
      process.env.TRACTR_USER_JWT_EXPIRES_IN = TRACTR_USER_JWT_EXPIRES_IN;
    if (TRACTR_USER_PASSWORD_SALT_LENGTH)
      process.env.TRACTR_USER_PASSWORD_SALT_LENGTH = TRACTR_USER_PASSWORD_SALT_LENGTH;
    if (TRACTR_USER_LOGIN_KEY)
      process.env.TRACTR_USER_LOGIN_KEY = TRACTR_USER_LOGIN_KEY;
  });

  it('should be a function', () => {
    expect(typeof getAuthConfig).toBe('function');
  });

  it('should be a configuration object with default value', () => {
    expect(getAuthConfig()).toEqual({
      jwt: {
        secret: 'developmentSecret',
        signOptions: {
          expiresIn: 3600,
        },
      },
      passport: {
        defaultStrategy: 'jwt',
      },
      login: {
        password: {
          saltLength: 20,
        },
        loginField: 'email',
      },
    });
  });

  it('should be a configuration object that can take override value when env is set', () => {
    process.env.TRACTR_USER_JWT_SECRET = 'foo';
    process.env.TRACTR_USER_JWT_EXPIRES_IN = '60';
    process.env.TRACTR_USER_PASSWORD_SALT_LENGTH = '10';
    process.env.TRACTR_USER_LOGIN_FIELD = 'bar';
    expect(getAuthConfig()).toEqual({
      jwt: {
        secret: 'foo',
        signOptions: {
          expiresIn: 60,
        },
      },
      passport: {
        defaultStrategy: 'jwt',
      },
      login: {
        password: {
          saltLength: 10,
        },
        loginField: 'bar',
      },
    });
  });
});
