import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy } from 'jest-mock-extended';

import { HashService } from './hash.service';
import { PasswordService } from './password.service';
import { BadPasswordError } from '../errors';

import { UserNotFoundError } from '@trxn/nestjs-authentication';
import { UserService } from '@trxn/nestjs-user';

describe('PasswordService', () => {
  let passwordService: PasswordService;
  let mockUserService: MockProxy<UserService>;
  let mockHashService: MockProxy<HashService>;

  beforeEach(async () => {
    mockUserService = mockDeep<UserService>();
    mockHashService = mockDeep<HashService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordService,
        { provide: UserService, useValue: mockUserService },
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
      mockUserService.findUserById.mockResolvedValue({
        id: '1',
        password: 'old',
        email: 'email',
      });
      mockHashService.compare.mockResolvedValue(true);

      await passwordService.updatePassword('1', 'old', 'new');

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockUserService.updatePassword).toHaveBeenCalledWith('1', 'new');
    });

    it('should throw if the user has not been found', async () => {
      mockUserService.findUserById.mockResolvedValue(null);

      await expect(async () =>
        passwordService.updatePassword('1', 'old', 'new'),
      ).rejects.toEqual(new UserNotFoundError('User not found'));
    });

    it('should throw if the old password is not right', async () => {
      mockUserService.findUserById.mockResolvedValue({
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
