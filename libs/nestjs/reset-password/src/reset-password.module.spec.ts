import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy } from 'jest-mock-extended';

import { ResetPasswordModule } from './reset-password.module';
import { ResetPasswordService } from './services';

import { MailerService } from '@trxn/nestjs-mailer';
import { UserService } from '@trxn/nestjs-user';

describe('Password Module ', () => {
  let app: INestApplication;
  let mockUserService: MockProxy<UserService>;
  let mockMailerService: MockProxy<MailerService>;

  it('should load the module when using register', async () => {
    mockUserService = mockDeep<UserService>();
    mockMailerService = mockDeep<MailerService>();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ResetPasswordModule.register({
          from: 'test',
          providers: [
            { provide: UserService, useValue: mockUserService },
            { provide: MailerService, useValue: mockMailerService },
          ],
        }),
      ],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const resetPasswordService = app.get(ResetPasswordService);
    expect(resetPasswordService).toBeInstanceOf(ResetPasswordService);
  });

  it('should load the module when using registerAsync', async () => {
    mockUserService = mockDeep<UserService>();
    mockMailerService = mockDeep<MailerService>();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ResetPasswordModule.registerAsync({
          providers: [
            { provide: UserService, useValue: mockUserService },
            { provide: MailerService, useValue: mockMailerService },
          ],
          useFactory: () => ({
            from: 'test',
          }),
        }),
      ],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const resetPasswordService = app.get(ResetPasswordService);
    expect(resetPasswordService).toBeInstanceOf(ResetPasswordService);
  });

  it('should throw an error if you do not provide MailerService or UserService', async () => {
    await expect(
      Test.createTestingModule({
        imports: [
          ResetPasswordModule.register({
            from: 'test',
          }),
        ],
        providers: [],
      }).compile(),
    ).rejects.toThrowError();
  });
});
