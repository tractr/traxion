import { Test, TestingModule } from '@nestjs/testing';
import { BucketItemStat, Client, PostPolicy } from 'minio';

import { FileStorageService } from './file-storage.service';
import { DEFAULT_CONFIG } from '../configs';
import { FileStorageModule } from '../file-storage.module';
import {
  PresignedDownloadConfiguration,
  PresignedUploadConfiguration,
} from '../interfaces';

describe('S3Service', () => {
  let fileStorageService: FileStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        FileStorageModule.register({
          accessKey: 'minio',
          secretKey: 'password',
          endPoint: 'localhost',
          port: 9000,
          useSSL: false,
          defaultBucket: 'test',
          temporaryPrefix: 'temp',
          temporaryFilesTTL: 5000,
          presignedDownload: {} as PresignedDownloadConfiguration,
          presignedUpload: {} as PresignedUploadConfiguration,
        }),
      ],
    }).compile();

    fileStorageService = module.get<FileStorageService>(FileStorageService);
  });

  it('should be defined', () => {
    expect(fileStorageService).toBeDefined();
    expect(fileStorageService).toBeInstanceOf(FileStorageService);
  });

  it('should be an instance of FileStorageClient', () => {
    expect(fileStorageService).toBeInstanceOf(Client);
  });

  describe('getUniqueFilename', () => {
    it('should check if file exists', async () => {
      const mockBucketItemStat: BucketItemStat = {
        etag: 'abc123',
        lastModified: new Date(),
        size: 1234,
        metaData: {
          'x-amz-meta-custom-header': 'custom value',
          'x-amz-meta-another-header': 'another value',
        },
      };
      // Mock the statObject method to return a successful result
      jest
        .spyOn(fileStorageService, 'statObject')
        .mockResolvedValue(mockBucketItemStat);

      const result = await fileStorageService.doesFileExists('iceland.jpg');
      expect(result).toBe(true);
    });

    it('should check if file exists', async () => {
      // Mock the statObject method to throw a NotFound error
      jest.spyOn(fileStorageService, 'statObject').mockImplementation(() => {
        const error = new Error();
        (error as unknown as Record<string, unknown>).code = 'NotFound';
        throw error;
      });

      const result = await fileStorageService.doesFileExists('iceland.jpg');
      expect(result).toBe(false);
    });
  });

  describe('getPresignedUploadUrl', () => {
    it('returns a presigned upload URL', async () => {
      // Arrange
      const fileMimeType = DEFAULT_CONFIG.presignedUpload.allowedMimeTypes[0];
      const fileSize = 1024;
      const customBucket = 'custom-bucket';
      const path = 'test/file.txt';
      const expectedUrl = 'https://test-url.com';
      const policy = new PostPolicy();
      policy.setBucket('mock-bucket');
      policy.setKey('mock-key');
      policy.setExpires(new Date(Date.now() + 3600000));
      policy.setContentLengthRange(fileSize - 5, fileSize + 5);
      const presignedPostPolicy = jest.fn().mockReturnValue(expectedUrl);
      jest.spyOn(fileStorageService, 'newPostPolicy').mockReturnValue(policy);
      jest
        .spyOn(fileStorageService, 'presignedPostPolicy')
        .mockImplementation(presignedPostPolicy);

      // Act
      const result = fileStorageService.getPresignedUploadUrl(
        fileMimeType,
        fileSize,
        path,
        customBucket,
      );

      // Assert
      expect(result).toEqual(expectedUrl);

      expect(presignedPostPolicy).toHaveBeenCalledWith(policy);
    });
    it('throws an error when file mime type is not allowed', async () => {
      const fileMimeType =
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      const fileSize = 1024;

      expect(() =>
        fileStorageService.getPresignedUploadUrl(fileMimeType, fileSize),
      ).toThrow(`${fileMimeType} is not an allowed MIME type`);
    });

    it('throws an error when file size is inferior to the file minFileSize configuration', () => {
      const fileMimeType = DEFAULT_CONFIG.presignedUpload.allowedMimeTypes[0];

      const fileSize = 102;

      expect(() =>
        fileStorageService.getPresignedUploadUrl(fileMimeType, fileSize),
      ).toThrow(
        `File size is out of allowed range. It must be between ${DEFAULT_CONFIG.presignedUpload.minFileSize} and ${DEFAULT_CONFIG.presignedUpload.maxFileSize} bits`,
      );
    });
  });

  describe('getPresignedDownloadUrl', () => {
    it('returns a presigned download URL', async () => {
      // Arrange
      const fileName = 'test/file.txt';
      const expectedUrl = 'https://test-url.com';
      const presignedGetObject = jest.fn().mockReturnValue(expectedUrl);
      jest
        .spyOn(fileStorageService, 'presignedGetObject')
        .mockImplementation(presignedGetObject);

      // Act
      const result = fileStorageService.getPresignedDownloadUrl(fileName);

      // Assert
      expect(result).toEqual(expectedUrl);
    });
  });
});
