import { Test, TestingModule } from '@nestjs/testing';
import { BucketItemStat, Client } from 'minio';

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

  describe('getPresignedUploadUrl', () => {
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

  // nest unit test are disabled because they need a minio container
  // and fake data to run

  // it('should file storage buckets list buckets', async () => {
  //   const result = await fileStorageService.listBuckets();
  //   expect(result).toBeInstanceOf(Array);
  // });

  // it('should generate presigned url to upload new file', async () => {
  //   const result = await fileStorageService.getPresignedUploadUrl(
  //     'image/jpeg',
  //     1034,
  //     '/test',
  //   );
  //   expect(result.postURL).toEqual('http://localhost:9000/test');
  //   expect(result.formData).toBeDefined();
  // });

  // it('should generate presigned url to download storage file', async () => {
  //   const result = await fileStorageService.getPresignedDownloadUrl(
  //     'iceland.jpg',
  //   );
  //   expect(result).toMatch(/^http:\/\/localhost:9000\/test/);
  // });
});
