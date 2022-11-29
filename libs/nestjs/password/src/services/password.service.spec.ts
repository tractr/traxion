import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy } from 'jest-mock-extended';

import { BadPasswordError } from '../errors';
import { HashService } from './hash.service';
import { PasswordService } from './password.service';
import { UserPasswordService } from './user-password.service';

import { UserNotFoundError } from '@trxn/nestjs-authentication';

describe('PasswordService', () => {
  let passwordService: PasswordService;
  let mockUserPasswordService: MockProxy<UserPasswordService>;
  let mockHashService: MockProxy<HashService>;

  beforeEach(async () => {
    mockUserPasswordService = mockDeep<UserPasswordService>();
    mockHashService = mockDeep<HashService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordService,
        { provide: UserPasswordService, useValue: mockUserPasswordService },
        { provide: HashService, useValue: mockHashService },
      ],
    }).compile();

    passwordService = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(passwordService).toBeDefined();
  });

  describe('updatePassword', () => {
    it('should update the password', async () => {
      mockUserPasswordService.getUserFromId.mockResolvedValue({
        id: '1',
        password: 'old',
        email: 'email',
      });
      mockHashService.compare.mockResolvedValue(true);

      await passwordService.updatePassword('1', 'old', 'new');

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockUserPasswordService.updateUserPassword).toHaveBeenCalledWith(
        '1',
        'new',
      );
    });

    it('should throw if the user has not been found', async () => {
      mockUserPasswordService.getUserFromId.mockResolvedValue(null);

      await expect(async () =>
        passwordService.updatePassword('1', 'old', 'new'),
      ).rejects.toEqual(new UserNotFoundError('User not found'));
    });

    it('should throw if the old password is not right', async () => {
      mockUserPasswordService.getUserFromId.mockResolvedValue({
        id: '1',
        password: 'password',
        email: 'email',
      });
      mockHashService.compare.mockResolvedValue(false);

      await expect(async () =>
        passwordService.updatePassword('1', 'old', 'new'),
      ).rejects.toEqual(new BadPasswordError());
    });
  });
});
