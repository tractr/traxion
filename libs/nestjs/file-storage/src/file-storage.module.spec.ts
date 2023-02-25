import { DynamicModule, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';

import { FILE_STORAGE_CONFIGURATION } from './constants';
import { FileStorageModule } from './file-storage.module';
import {
  FileStorageConfigurationPrivate,
  FileStorageConfigurationPublic,
} from './interfaces';
import { FileStorageService } from './services';

/**
 * Test NestJS module integration with module FileStorageModule
 */
describe('FileStorageModule', () => {
  let app: INestApplication;
  let fileStorageModule: TestingModule;

  const setFileStorageDynamicModule = async (
    fileStorageConfigurationPublic: FileStorageConfigurationPublic,
  ) => {
    // const app: INestApplication;
    // const fileStorageModule: TestingModule;
    const fileStorageDynamicModule: DynamicModule = FileStorageModule.register(
      fileStorageConfigurationPublic,
    );

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
  };
  it('should create an instance', async () => {
    const clientConfig: FileStorageConfigurationPublic = {
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
    };
    await setFileStorageDynamicModule(clientConfig);
    expect(fileStorageModule).toBeTruthy();
  });

  it('Test that FILE_STORAGE_CONFIGURATION all the default values', async () => {
    const clientConfig: FileStorageConfigurationPublic = {
      endPoint: 'http://localhost:3000',
      accessKey: 'test',
      secretKey: 'test',
      useSSL: false,
      port: 3000,
      defaultBucket: 'test',
    };
    await setFileStorageDynamicModule(clientConfig);
    const fileStorageConfig = app.get<FileStorageConfigurationPrivate>(
      FILE_STORAGE_CONFIGURATION,
    );

    const mockFileStorageConfigurationPrivate =
      mockDeep<FileStorageConfigurationPrivate>();

    expect(fileStorageConfig).toBeInstanceOf(
      mockFileStorageConfigurationPrivate.constructor,
    );

    const fileStorageConfigurationExpected = {
      endPoint: 'http://localhost:3000',
      accessKey: 'test',
      secretKey: 'test',
      useSSL: false,
      port: 3000,
      temporaryPrefix: 'temp',
      temporaryFilesTTL: 60 * 60 * 2,
      defaultBucket: 'test',
      presignedUpload: {
        defaultValidity: 300,
        minFileSize: 1024,
        maxFileSize: 10485760,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif'],
      },
      presignedDownload: {
        defaultValidity: 300,
      },
    };

    expect(fileStorageConfig).toStrictEqual(fileStorageConfigurationExpected);
  });
  it('Test that FILE_STORAGE_CONFIGURATION all the default override', async () => {
    const clientConfig: FileStorageConfigurationPublic = {
      endPoint: 'http://localhost:3000',
      accessKey: 'test',
      secretKey: 'test',
      useSSL: false,
      port: 3000,
      defaultBucket: 'test',
      temporaryPrefix: 'temporary',
      temporaryFilesTTL: 100,
      presignedUpload: {
        defaultValidity: 3000,
        minFileSize: 512,
        maxFileSize: 1048,
        allowedMimeTypes: ['image/jpeg'],
      },
      presignedDownload: {
        defaultValidity: 3600,
      },
    };
    await setFileStorageDynamicModule(clientConfig);
    const fileStorageConfig = app.get<FileStorageConfigurationPrivate>(
      FILE_STORAGE_CONFIGURATION,
    );

    const mockFileStorageConfigurationPrivate =
      mockDeep<FileStorageConfigurationPrivate>();

    expect(fileStorageConfig).toBeInstanceOf(
      mockFileStorageConfigurationPrivate.constructor,
    );

    const fileStorageConfigurationExpected = {
      endPoint: 'http://localhost:3000',
      accessKey: 'test',
      secretKey: 'test',
      useSSL: false,
      port: 3000,
      temporaryPrefix: 'temporary',
      temporaryFilesTTL: 100,
      defaultBucket: 'test',
      presignedUpload: {
        defaultValidity: 3000,
        minFileSize: 512,
        maxFileSize: 1048,
        allowedMimeTypes: ['image/jpeg'],
      },
      presignedDownload: {
        defaultValidity: 3600,
      },
    };

    expect(fileStorageConfig).toStrictEqual(fileStorageConfigurationExpected);
  });
});
