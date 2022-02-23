---
id: manage-file-storage-with-aws-s3
title: Manage file storage with AWS S3
sidebar_label: Manage file storage with AWS S3
---

:::info

Package's author: [Maxim Darré](https://github.com/maxmousse)

:::

## Installation

To install the package, run `npm i --save @tractr/nestjs-file-storage`.

Then, to use the `FileStorageService` in your application, you must import the `FileStorageModule` in the module that needs the `FileStorageService`.

Please note that you should register the module and provide an adequate configuration.

### Synchronous configuration

If the configuration is accessible without an asynchronous operation, you can call the `register` method with the module configuration.

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

### Asynchronous configuration

If you need to wait for an asynchronous operation to access the file storage configuration (a http call or another service instantiation), you can call the `registerAsync`.

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

## Description

:::caution Coming soon

This page is under construction.

Join our [Discord](https://discord.traxion.dev/) server to get notified when it's ready.

:::

