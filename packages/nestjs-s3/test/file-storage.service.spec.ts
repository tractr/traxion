import { Test, TestingModule } from '@nestjs/testing';
import { Client } from 'minio';

import { FileStorageModule, FileStorageService } from '../src';

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
          buckets: ['bucket'],
          routePrefix: '',
          temporaryPrefix: 'temp',
          permanentPrefix: '',
          temporaryFilesTTL: 5000,
          presignedUploadDefaults: {
            allowedMimeTypes: [''],
            minFileSize: 300,
            maxFileSize: 300,
            defaultValidity: 300,
          },
          presignedDownloadDefaults: {
            defaultValidity: 300,
          },
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

  it('should file storage buckets list buckets', async () => {
    const result = await fileStorageService.listBuckets();
    expect(result).toBeInstanceOf(Array);
  });

  it('should generate presigned url to upload new file', async () => {
    const result = await fileStorageService.getPresignedUploadUrl('test');
    expect(result.postURL).toEqual('http://localhost:9000/test');
    expect(result.formData).toBeDefined();
  });

  it('should generate presigned url to download storage file', async () => {
    const result = await fileStorageService.getPresignedDownloadUrl(
      'test',
      'iceland.jpg',
    );
    expect(result).toMatch(new RegExp('^http://localhost:9000/test'));
  });
});
