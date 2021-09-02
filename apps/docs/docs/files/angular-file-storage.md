---
id: angular-file-storage
title: How to use Angular File Storage
sidebar_label: Angular - File Storage
keywords: 
  - angular
  - files
  - file-storage
tags:
  - label: Angular
    permalink: angular
  - label: Files
    permalink: files
  - label: File Storage
    permalink: file-storage
---

:::info
- Package's author: [Maxim Darré](https://github.com/maxmousse)
:::

# Install

To install the package, run `npm i --save @tractr/angular-file-storage`.

Then, to use the `FileStorageService` in your application, you must import the `FileStorageModule` in the module that needs the `FileStorageService`.

Please note that you should register the module and provide an adequate configuration. This
can be done de deux manières:
- You can call the `register` method with the module configuration.

Example:

app.module.ts
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
- You can call the `registerAsync` method with the module configuration.


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