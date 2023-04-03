---
id: file-storage-on-aws-s3
title: File Storage on AWS S3
sidebar_label: File Storage on AWS S3
---

## Introduction

Storing, managing and distributing files is a common task for web applications. However, it can quickly become a cumbersome task to manage for your nodejs application and is usually best delegated to a specialized file storage service like AWS S3 or Minio.

It involves three parts:

- Your backend application, which is responsible for negotiating a presigned download url with the file storage service.
- Your frontend application, which must request this presigned upload url from the backend and then upload the user's file to the file storage.
- The file storage service itself.

Traxion provides the following two packages to interact with the file storage service:

- `@trxn/nestjs-file-storage` allows you to connect your NestJS backend application to a file storage service to manipulate files and negotiate presigned urls.
- `@trxn/angular-file-storage` contains helpers for connecting your frontend application to your backend and file storage service.

## Installation

You must first install the packages in the project: `npm i --save @trxn/nestjs-file-storage @trxn/angular-file-storage`.

Both packages expose modules that extend the `ModuleOptionsFactory` and should be imported into your backend and frontend applications respectively and registered with their configuration.

### Example

```typescript
// file: apps/api/src/app/app.module.ts

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
   // Public key of your file storage user
      accessKey: 'minio',

   // Private key of your file storage user
      secretKey: 'password',

   // Domain to access the file storage
      endPoint: 'localhost',

   // Port to access the file storage
      port: 9000,

   // Denotes if ssl should be used
      // (can be disabled for dev envs, but should be used in production)
      useSSL: false,

   // The name of your file storage bucket
      defaultBucket: 'bucket',

   // Here you can configure the validity time of presigned download urls 
   // (default to 300s)
      presignedDownload: {} as PresignedDownloadConfiguration,

   // Here you can configure the validity time of presigned download urls 
   // (default to 300s)
   // You can also add restrictions on allowed file size and mime type
      presignedUpload: {} as PresignedUploadConfiguration,
    }),
  ],
})
export class AppModule {}
```

```typescript
// file: apps/pwa/src/app/app.module.ts

import { NgModule } from '@angular/core';

import { FileStorageModule } from '@trxn/angular-file-storage';

@NgModule({
  imports: [
    FileStorageModule.register({
   // The name of your file storage bucket
      defaultBucket: 'bucket',
   
   // Endpoint to request presigned upload url (default to 'upload')
      presignedUploadEndpoint: 'upload',

   // Endpoint to request presigned download url (default to 'download')
      presignedDownloadEndpoint: 'download',
    }),
  ],
})
export class AppModule {}
```

The configuration expected by the `register` method is available via the TypeScript interfaces or in the source code:

- [@trxn/nestjs-file-storage configuration](https://github.com/tractr/traxion/blob/main/libs/nestjs/file-storage/src/lib/interfaces/file-storage-configuration-public.interface.ts)
- [@trxn/angular-file-storage configuration](https://github.com/tractr/traxion/blob/main/libs/angular/file-storage/src/lib/interfaces/file-storage-configuration.interface.ts)

For more details about registering a dynamic module, please refer to the [NestJS documentation](https://docs.nestjs.com/fundamentals/dynamic-modules).

## Common use case

One of the most common features that may require the use of file storage is authentication and file manipulation permissions. You probably want to grant read or write permissions to certain files based on a set of conditions, but you don't want the files to flow through your backend because that would be too bandwidth intensive.

To achieve this, you can use presigned URLs. Presigned URLs are similar to tokens: they have a limited lifetime and are only valid for one type of operation.

:::info

For more information on presigned URLs, see the [AWS documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html).

:::

For example, a user who wants to upload his avatar image to storage would take the following steps:

- The frontend requests a presigned url from the backend. The presigned URL should allow the current user to upload their image to the file storage.
- Once the backend has validated that the user has sufficient permissions, it negotiates a presigned URL with the file storage and sends it back to the frontend.
- The frontend is now able to upload the user's image to the file store by performing a POST to the presigned URL.

In this scenario, the backend is responsible for verifying authentication, permissions, but the responsibility for hosting and serving the files is delegated to the file store.

### Upload a file to the file storage with a presigned url

As explained earlier, this is one of the most common cases of using a file storage service.
If your application does not need to run custom logic when uploading a file to the file store, you can use the pre-built `FileStorageController`.
Simply import it from `@trxn/nestjs-file-storage` and add it to your `app.module.ts`.

```typescript
// file: apps/api/src/app/app.module.ts

import { 
 FileStorageModule, 
 FileStorageController 
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
  controllers: [FileStorageController], // FileStorageController is imported here
})
export class AppModule {}
```

The `FileStorageController` exposes two endpoints:

- The `upload` endpoint can be used to request an upload presigned URL.
- The `download` endpoint can be used to request a download presigned URL.

On the frontend side of your application, you can use the `tractr-file-storage-upload-button` button component exported from `@trxn/angular-file-storage` to automatically send files uploaded by the users to the file storage.

Then you should listen to the `uploadResult` event to get information about the uploaded file.

```html
<!-- file: your-angular-component.html -->

<trxn-file-storage-upload-button
  acceptedFileTypes="image/jpeg,impage/png"
  sizeLimit="1000"
  (uploadResult)="handleUploadResult($event)"
>Upload</trxn-file-storage-upload-button>
```

```typescript
// file: your-angular-component.ts

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

Under the hood, the `trxn-file-storage-upload-button` uses `FileStorageService` to request a presigned upload url and transfer the file to file storage.

If your application requires custom logic on the frontend, the `FileStorageService` can be used directly and exposes methods to request the presigned url and transfer the file:

```typescript
import { Component } from '@angular/core';

import { FileStorageService } from '../../services';

@Component({
  selector: 'custom-upload-button',
  templateUrl: './custom-upload-button.component.html',
  styleUrls: ['./custom-upload-button.component.less'],
})
export class UploadButtonComponent {
  constructor(private fileStorageService: FileStorageService) {}

  /**
   * Callback to upload file to file storage
   *
   * @param item
   * @returns Observable that resolve as an object
   * containing, the temporary url of the uploaded file,
   * its size and MIME type
   */
  uploadFileToStorage(file: File) {
    return this.fileStorageService.uploadFileToFileStorage(file);
  }
}
```

On the backend, the default controller simply requests a presigned URL from the file storage. If you have some business logic, you can write your own controller and use the `FileStorageService`.

NestJS controller example:

```typescript
import { Controller, Get, Query } from '@nestjs/common';

import { 
 GetPresignedDownloadUrlQueryDto,
  GetPresignedUploadUrlQueryDto,
 FileStorageService
} from '@trxn/nestjs-file-storage';

@Controller('file-storage')
export class FileStorageController {
  constructor(private fileStorageService: FileStorageService) {}

  /**
   * Get presigned upload url
   */
  @Get('upload')
  getPresignedUploadUrl(@Query() queryDto: GetPresignedUploadUrlQueryDto) {

  // Business logique could be added here or in some nestjs guards

    const { mimeType, fileSize } = queryDto;
  // Request presigned url to the file storage and returns it
    return this.fileStorageService.getPresignedUploadUrl(mimeType, fileSize);
  }
}
```

### Download a file from file storage with a presigned URL

Read access to a file can also be restricted by using presigned URLs for downloading. The mechanism is very similar to the one presented in the upload section.

For this example, consider a `PrivateImageComponent` that takes as input the file path on the storage, requests a presigned upload URL, and displays the file:

```typescript
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

import { FileStorageService } from '../../services';

@Component({
  selector: 'tractr-file-storage-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.less'],
})
export class PrivateImageComponent implements OnChanges {
  /**
   * Image of the file on the storage (example 'images/1234.png')
   *
   */
  @Input() imagePath!: string;

  /**
   * Image download url
   */
  imageUrl$?: Observable<{ url: string }>;

  constructor(private fileStorageService: FileStorageService) {}

  ngOnChanges({ imagePath }: SimpleChanges) {
    if (imagePath)
      this.imageUrl$ = this.fileStorageService.getPresignedDownloadUrl(
        imagePath.currentValue as string,
      );
  }
}
```

On the backend, run the business logic to verify that the user is authorized to read the file, and then, with the provided `FileStorageService`, negotiate the URL with the file storage.

```typescript
import { Controller, Get, Query } from '@nestjs/common';

import {
  GetPresignedDownloadUrlQueryDto,
  GetPresignedUploadUrlQueryDto,
 FileStorageService
} from '@trxn/nestjs-file-storage';

@Controller('file-storage')
export class FileStorageController {
  constructor(private fileStorageService: FileStorageService) {}

  /**
   * Get presigned download url
   */
  @Get('download')
  async getPresignedDownloadUrl(
    @Query() queryDto: GetPresignedDownloadUrlQueryDto,
  ) {

  // Business logique could be added here or in some nestjs guards

    const { file } = queryDto;
  // Request presigned url to the file storage and returns it
    const url = await this.fileStorageService.getPresignedDownloadUrl(file);
    return { url };
  }
}
```

## Temporary files

When uploading files to storage, it is common for a file to be uploaded during a process that may fail or be interrupted. For example, a user could upload their avatar image while creating their account and never complete the account creation.

Since file storage solutions do not implement any type of "transaction", we rely on a dedicated folder to store temporary files.

By default, uploaded files are stored in a temporary folder on the storage. Depending on your internal logic, you should move these files to a permanent location when necessary, and periodically clean up this temporary folder.

In the avatar example, the avatar image should be moved to a permanent location only when the account creation is completed. This temporary folder should be periodically cleaned up to remove images uploaded by users who have not completed the account creation.

The location of the temporary folder can be set when configuring the NestJS `FileStorageModule` with the `temporaryPrefix` option (default is `tmp/`).

### Delivering temporary files to a permanent location

The `FileStorageService` exposes a `commitTemporaryFile` method that moves a file from the temporary folder to a permanent location. Here is an example of a method that would commit a temporary image when a user is created:

```typescript
import { FileStorageService } from '@trxn/nestjs-file-storage';

Injectable()
export class UserService {
 
 constructor(private fileStorageService: FileStorageService) {}

 async create(user: User) {
  const avatarImageTempPath = user.avatarUrl;
  const avatarImageDefinitivePath = `images/${uuid()}.jpg`;

  try {
   // Move the file out of the temporary folder
   await this.fileStorageService.commitTemporaryFile(
    avatarImageTempPath, 
    avatarImageDefinitivePath
   );
  } catch (e) {
   // handle potential errors with the file storage
  }
  //...
  // Save your user with the new avatar path
 }
}
```

### Delete expired temporary files

By configuring the NestJS `FileStorageModule`, you can provide a `temporaryTTL` option to set the lifetime of temporary files (in seconds, with a default value of 2 hours).

The NestJS `FileStorageService` exposes a `pruneTemporaryFiles` method which will delete all files older than the TTL in the temporary folder.

This method should be called periodically (e.g. in a Cron) if you don't want the temporary folder to overflow.

:::info Other file manipulations

The NestJS `FileStorageService` uses the Minio javascript client and extends it, making all the Minio client methods available for custom operations as well. For more information, please refer to the [Minio documentation](https://min.io/docs/minio/linux/developers/javascript/API.html).

:::
