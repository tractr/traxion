import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { mockJwtServiceFactory } from '../../../mocks/user/service/jwt.service.mock';
import { mockConfigServiceFactory } from '../../../mocks/config/config.service.mock';
import { AuthService, UserService } from '../../../../src/user';
import { mockUserServiceFactory } from '../../../mocks/user/service/user.service.mock';

describe('AuthService', () => {
  let authService: AuthService;
  let mockConfigService: ConfigService;
  let mockJwtService: JwtService;
  let mockUserService: UserService;

  beforeEach(async () => {
    mockConfigService = mockConfigServiceFactory({
      'login.loginField': 'email',
      'login.password.saltLength': 20,
    });
    mockJwtService = mockJwtServiceFactory();
    mockUserService = mockUserServiceFactory();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
