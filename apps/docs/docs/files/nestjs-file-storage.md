---
id: nestjs-file-storage
title: How to use NestJS File Storage
sidebar_label: NestJS - File Storage
keywords: 
  - nestjs
  - files
  - file-storage
tags:
  - label: NestJS
    permalink: nestjs
  - label: Files
    permalink: files
  - label: File Storage
    permalink: file-storage
---

:::info
- Package's author: [Maxim Darré](https://github.com/maxmousse)
:::

# Install

To install the package, run `npm i --save @tractr/nestjs-file-storage`.

Then, to use the `FileStorageService` in your application, you must import the `FileStorageModule` in the module that needs the `FileStorageService`.

Please note that you should register the module and provide an adequate configuration.

- If your configuration is accessible without an asynchronous operation, you can call the `register` method with the module configuration.

Example:

*app.module.ts*
```typescript
import { Module } from '@nestjs/common';

import {
  FileStorageController,
  FileStorageModule,
  PresignedDownloadConfiguration,
  PresignedUploadConfiguration,
} from '@tractr/nestjs-file-storage';

@Module({
  imports: [
    FileStorageModule.register({
      accessKey: 'minio',
      secretKey: 'password',
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      defaultBucket: 'bucket',
      presignedDownload: {} as PresignedDownloadConfiguration,
      presignedUpload: {} as PresignedUploadConfiguration,
    }),
  ],
  controllers: [FileStorageController],
})
export class AppModule {}
```
- Else, if you need to wait for an asynchronous operation to access the file storage configuration (an http call or another service instanciation), you can call the `registerAsync`.

Example:

*app.module.ts*
```typescript
import { Module } from '@nestjs/common';

import {
  FileStorageController,
  FileStorageModule,
  PresignedDownloadConfiguration,
  PresignedUploadConfiguration,
} from '@tractr/nestjs-file-storage';

@Module({
  imports: [
    FileStorageModule.registerAsync({
      useFactory: (defaultConfig) => ({
        ...defaultConfig,
        accessKey: 'minio',
        secretKey: 'password',
        endPoint: 'localhost',
        port: 9000,
        useSSL: false,
        defaultBucket: 'bucket',
        presignedDownload: {} as PresignedDownloadConfiguration,
        presignedUpload: {} as PresignedUploadConfiguration,
      }),
    }),
  ],
  controllers: [FileStorageController],
})
export class AppModule {}
```

# Description

TODO