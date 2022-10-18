import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { mockDeep, MockProxy } from 'jest-mock-extended';

import { PasswordModule } from './password.module';
import { PasswordService, ResetPasswordService } from './services';

describe('Password Module ', () => {
  let app: INestApplication;
  let mockUserService: MockProxy<Prisma.UserDelegate<false>>;

  it('should load the module when using register', async () => {
    mockUserService = mockDeep<Prisma.UserDelegate<false>>();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        PasswordModule.register({
          resetPasswordLinkFactory: () => 'resetPasswordLinkFactory',
          userService: mockUserService,
        }),
      ],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const passwordService = app.get(PasswordService);
    expect(passwordService).toBeInstanceOf(PasswordService);
    const resetPasswordService = app.get(ResetPasswordService);
    expect(resetPasswordService).toBeInstanceOf(ResetPasswordService);
  });

  it('should load the module when using registerAsync', async () => {
    mockUserService = mockDeep<Prisma.UserDelegate<false>>();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        PasswordModule.registerAsync({
          useFactory: () => ({
            resetPasswordLinkFactory: () => 'resetPasswordLinkFactory',
            userService: mockUserService,
          }),
        }),
      ],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const passwordService = app.get(PasswordService);
    expect(passwordService).toBeInstanceOf(PasswordService);
    const resetPasswordService = app.get(ResetPasswordService);
    expect(resetPasswordService).toBeInstanceOf(ResetPasswordService);
  });
});
