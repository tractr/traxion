import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { mockDeep, MockProxy } from 'jest-mock-extended';

import { PasswordModule } from './password.module';
import { PasswordService } from './services';

import { UserService } from '@trxn/nestjs-user';

describe('Password Module ', () => {
  let app: INestApplication;
  let mockUserService: MockProxy<UserService>;

  it('should load the module when using register', async () => {
    mockUserService = mockDeep<UserService>();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        PasswordModule.register({
          providers: [{ provide: UserService, useValue: mockUserService }],
        }),
      ],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const passwordService = app.get(PasswordService);
    expect(passwordService).toBeInstanceOf(PasswordService);
  });

  it('should load the module when using registerAsync', async () => {
    mockUserService = mockDeep<UserService>();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        PasswordModule.registerAsync({
          providers: [{ provide: UserService, useValue: mockUserService }],
          useFactory: () => ({}),
        }),
      ],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const passwordService = app.get(PasswordService);
    expect(passwordService).toBeInstanceOf(PasswordService);
  });
});
