---
id: upload-a-file-to-aws-s3
title: Upload a file to AWS S3
sidebar_label: Upload a file to AWS S3
---

:::info

Package's author: [Maxim Darré](https://github.com/maxmousse)

:::

## Installation

To install the package, run `npm i --save @tractr/angular-file-storage`.

Then, to use the `FileStorageService` in your application, you must import the `FileStorageModule` in the module that needs the `FileStorageService`.

Please note that you should register the module and provide an adequate configuration.

### Synchronous configuration

You can call the `register` method with the module configuration.

#### Example

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

### Asynchronous configuration

You can call the `registerAsync` method with the module configuration.

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

## Description

:::caution Coming soon

This page is under construction.

Join our [Discord](https://discord.traxion.dev/) server to get notified when it's ready.

:::
