/* eslint-disable @typescript-eslint/unbound-method */

import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy, mockReset } from 'jest-mock-extended';

import { FileStorageController } from './file-storage.controller';
import { GetPresignedDownloadUrlQueryDto } from '../dtos';
import { FileStorageService } from '../services';

describe('FileStorageController', () => {
  let mockFileStorageService: MockProxy<FileStorageService>;
  let fileStorageController: FileStorageController;

  beforeEach(async () => {
    mockFileStorageService = mockDeep<FileStorageService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileStorageController],
      providers: [
        {
          provide: FileStorageService,
          useValue: mockFileStorageService,
        },
      ],
    }).compile();

    fileStorageController = module.get<FileStorageController>(
      FileStorageController,
    );
  });

  afterEach(() => {
    mockReset(mockFileStorageService);
  });

  it('should be defined', () => {
    expect(fileStorageController).toBeDefined();
  });

  describe('getPresignedDownloadUrl', () => {
    it('should get the upload url if no error', async () => {
      const query: GetPresignedDownloadUrlQueryDto = { file: 'file' };

      mockFileStorageService.getPresignedDownloadUrl.mockResolvedValue(
        'success',
      );

      const result = await fileStorageController.getPresignedDownloadUrl(query);

      expect(result).toEqual({ url: 'success' });
    });

    it('should throw an error if something go wrong', async () => {
      const query: GetPresignedDownloadUrlQueryDto = { file: 'file' };

      mockFileStorageService.getPresignedDownloadUrl.mockRejectedValue('error');

      try {
        await fileStorageController.getPresignedDownloadUrl(query);
      } catch (e) {
        expect(e).toMatch('error');
      }
    });
  });
});
