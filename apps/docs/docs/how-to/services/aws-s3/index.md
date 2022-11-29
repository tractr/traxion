---
id: index
title: AWS S3
sidebar_label: AWS S3
---

## Introduction

Files storage, management and distribution is a common task for web
applications. However this can quickly become a heavy task to handle for your
nodejs application and it is usually preferable to delegate it to a specialize
file storage service like AWS S3 or Minio.

One of the most common task is to upload a user file, lets say its avatar
picture, to the file storage. This upload involve three parts:

- Your backend application that is in charge to negociate a presigned upload url
  with the file storage
- Your frontend application, that should request this upload presigned url to
  the backend and then upload the user photo to the file storage.
- The file storage service itself.

That's why we provides the next two packages to interact with the file storage
service:

- `@trxn/nestjs-file-storage` allows to connect your nestjs backend
  application to a file storage service to manipulate files and negoticate
  presigned urls.

- `@trxn/angular-file-storage` contains helpers to connect your frontend
  application to your backend and to the file storage service.

## Installation

First you need to install the packages to the
project:`npm i --save @trxn/nestjs-file-storage tractr/angular-file-storage`.

Both packages expose modules that extends the `ModuleOptionsFactory` and must be
respectively imported in your backend and frontend app and registered with their
configuration.

Example:

_apps/api/src/app/app.module.ts_

```typescript
import { Module } from '@nestjs/common';

import {
  FileStorageController,
  FileStorageModule,
  PresignedDownloadConfiguration,
  PresignedUploadConfiguration,
} from '@trxn/nestjs-file-storage';

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
})
export class AppModule {}
```

_apps/pwa/src/app/app.module.ts_

```typescript
import { NgModule } from '@angular/core';

import { FileStorageModule } from '@trxn/angular-file-storage';

@NgModule({
  imports: [
    FileStorageModule.register({
      defaultBucket: 'bucket',
      presignedUploadEndpoint: 'upload',
      presignedDownloadEndpoint: 'download',
    }),
  ],
})
export class AppModule {}
```

The configuration expected by the register method is available via the
typescript interfaces or in the source code:

- [@trxn/nestjs-file-storage configuration](https://github.com/tractr/stack/blob/main/libs/nestjs/file-storage/src/lib/interfaces/file-storage-configuration-public.interface.ts)
- [@trxn/angular-file-storage configuration](https://github.com/tractr/stack/blob/main/libs/angular/file-storage/src/lib/interfaces/file-storage-configuration.interface.ts)

For more details about registering a module that extends `ModuleOptionsFactory`,
please refer to the documentation: LINK.

## Upload a file to the file storage with a presigned url

Has explained precedently, this is the most frequent use case for a file storage
service. If you application does not need to execute custom logic when uploading
a file to the file storage, you can use the perbuild `FileStorageController`.
Simply import it from `@trxn/nestjs-file-storage` and add it to your
`app.module.ts`.

_apps/api/src/app/app.module.ts_

```typescript
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

The `FileStorageController` exposes two endpoints:

- The `upload` endpoint can be used to request an upload presigned token.
- The `download` endpoint can be used to request a download presigned token.

On the frontend side of your application, you can use the
`tractr-file-storage-upload-button` button component exported from
`@trxn/angular-file-storage` to automatically send files uploaded by the users
to the file storage.

Then you should listen to the `uploadResult` event to get information about the
uploaded file.

_your-angular-component.html_

```html
<tractr-file-storage-upload-button
  acceptedFileTypes="image/jpeg,impage/png"
  sizeLimit="1000"
  (uploadResult)="handleUploadResult($event)"
>
  Upload
</tractr-file-storage-upload-button>
```

_your-angular-component.ts_

```typescript
import { Component, EventEmitter, Output } from '@angular/core';
import { FileStorageUploadResult } from '@trxn/angular-file-storage';

@Component({
  selector: 'app-atom-gallery-photo-selector',
  templateUrl: './atom-gallery-photo-selector.component.html',
  styleUrls: ['./atom-gallery-photo-selector.component.less'],
})
export class YourAngularComponent {
  @Output() photoUploaded = new EventEmitter<FileStorageUploadResult>();

  handleUploadResult(uploadResult: FileStorageUploadResult): void {
    this.photoUpdated.emit(uploadResult);
    console.log(uploadResult);
    /* uploadResult
    {
      url: string // Url of the uploaded file
      mimeType: string // MIME type of the uploaded file
      size: number // File size (in bits)
    }
    */
  }
}
```

## Temporary files

## Download a file from the file storage with a presigned url

## Custom operations

## Other file manipulations

