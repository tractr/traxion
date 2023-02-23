import { DynamicModule, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';

import { FILE_STORAGE_CONFIGURATION } from './constants';
import {
  FileStorageConfigurationPrivateDto,
  PresignedDownloadConfigurationDto,
  PresignedUploadConfigurationDto,
} from './dtos';
import { FileStorageModule } from './file-storage.module';
import { FileStorageService } from './services';

/**
 * Test NestJS module integration with module FileStorageModule
 */
describe('FileStorageModule', () => {
  let app: INestApplication;
  let fileStorageModule: TestingModule;

  beforeAll(async () => {
    const fileStorageDynamicModule: DynamicModule = FileStorageModule.register({
      endPoint: 'http://localhost:3000',
      accessKey: 'test',
      secretKey: 'test',
      useSSL: false,
      port: 3000,
      defaultBucket: 'test',
      presignedUpload: {
        allowedMimeTypes: ['image/png', 'image/jpeg'],
        minFileSize: 1,
        maxFileSize: 10,
        defaultValidity: 3600,
      },
      presignedDownload: {
        defaultValidity: 3600,
      },
    });
    fileStorageModule = await Test.createTestingModule({
      imports: [
        {
          ...fileStorageDynamicModule,
          providers: [
            ...(fileStorageDynamicModule.providers || []),
            { provide: FileStorageService, useValue: {} },
          ],
        },
      ],
    }).compile();

    app = fileStorageModule.createNestApplication();
    await app.init();
  });

  it('should create an instance', () => {
    expect(fileStorageModule).toBeTruthy();
  });

  it('Test that FILE_STORAGE_CONFIGURATION has been created and has the correct values', () => {
    const fileStorageConfig = app.get(FILE_STORAGE_CONFIGURATION);
    expect(fileStorageConfig).toBeInstanceOf(
      FileStorageConfigurationPrivateDto,
    );
    expect(fileStorageConfig).toStrictEqual(
      plainToInstance(FileStorageConfigurationPrivateDto, {
        endPoint: 'http://localhost:3000',
        accessKey: 'test',
        secretKey: 'test',
        useSSL: false,
        port: 3000,
        defaultBucket: 'test',
        presignedUpload: plainToInstance(PresignedUploadConfigurationDto, {
          allowedMimeTypes: ['image/png', 'image/jpeg'],
          minFileSize: 1,
          maxFileSize: 10,
          defaultValidity: 3600,
        }),
        presignedDownload: plainToInstance(PresignedDownloadConfigurationDto, {
          defaultValidity: 3600,
        }),
        temporaryFilesTTL: 7200,
        temporaryPrefix: 'temp',
      }),
    );
  });
});
