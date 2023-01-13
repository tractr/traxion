---
id: file-storage-on-aws-s3
title: File storage on AWS S3
sidebar_label: File storage on AWS S3
---

## Introduction

Storing, managing and distributing files is a common task for web applications. However, it can quickly become a cumbersome task to manage for your nodejs application and is usually best delegated to a specialized file storage service like AWS S3 or Minio.

It involves three parts:

- Your backend application, which is responsible for negotiating a pre-signed download url with the file storage service.
- Your frontend application, which must request this pre-signed upload url from the backend and then upload the user's file to the file storage.
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

## Common use cases

One of the most common feature that could require a file storage usage is authentication and authorizations to manipulate files. You probably want to grant read or write persimissions to some files depending on a set of conditions, but you don’t want the files to transit by your backend.

To achieve this, you can use presigned urls. Presigned urls are similar to tokens: they can be used only during a finite among of time, to perform only one type of operation.

For exemple, a user uploading an image for its avatar to the storage would follow the next steps:

- The frontend request a presigned url to the backend. The presigned url should allow the current user to upload its image to the store.
- Once the backend has validated that the user has sufficent authorisations, it negociates a presigned url with the file storage and returns it to the frontend
- The frontend is now able to upload the user image to the file storage by using the presigned url.

In this scenario, the bakend is in charge of checking authentication, aurthorizations, but the responsability of hosting and serving files is delegated to the file storage.

### Upload a file to the file storage with a presigned url

As explained precedently, this is one of the most frequent use case for a file storage service. If you application does not need to execute custom logic when uploading a file to the file storage, you can use the prebuilt `FileStorageController`. Simply import it from `@trxn/nestjs-file-storage` and add it to your `app.module.ts`.

*apps/api/src/app/app.module.ts*

```typescript


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

- The `upload` endpoint can be used to request an upload presigned token.
- The `download` endpoint can be used to request a download presigned token.

On the frontend side of your application, you can use the `tractr-file-storage-upload-button` button component exported from `@tractr/angular-file-storage` to automatically send files uploaded by the users to the file storage.

Then you should listen to the `uploadResult` event to get information about the uploaded file.

*your-angular-component.html*

```html
<trxn-file-storage-upload-button  acceptedFileTypes="image/jpeg,impage/png"  sizeLimit="1000"  (uploadResult)="handleUploadResult($event)">  Upload</trxn-file-storage-upload-button>
```

*your-angular-component.ts*

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

Under the hood, the `trxn-file-storage-upload-button` uses `FileStorageService` to request an presigned upload url and transfert the file to the file storage.

If your application require custom logique on the frontend side, the `FileStorageService` can be directily used and exposes methods to request the presigned url and upload the file:

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

On the backend side, the default controller only request a presigned url to the file storage. If you have some business logique, you can write your own controller and use the `FileStorageService`

Nestjs controller example:

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

### Download a file from the file storage with a presigned url

Read access to a file can also be restricted by using presigned urls for download. The mechanic is very similar to the one presented in the upload section:

For this example, let’s consider a `PrivateImageComponent` that takes in input the path of a file on the storage, request a presigned download url, and display the file:

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

On the backend side, run business logic to check user is allowed to read the file then, with the provided `FileStorageService` to negociate the url with the file storage.

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

When uploading files on the storage, it is frequent to have a file uploaded during a process that could fail or abort. In the example of a user uploading an image for its avatar during an account creation, the image could be uploaded while the user never complete the account creation.

As file storages software do not implement any type of ‘Transaction’, we rely on a folder dedicated to store temporary files.

By default, the uploaded files are stored in a temporary folder on the storage (the folder path can be defined when initialising the nestjs `FileStorageModule`.

Depending on your business logic, you should move those files into a definitive location when necessary, and periodically prune the temporary folder.

In the avatar example, the avatar image should be move into a definitive location only whene the account creation is completed.

This temporary folder should also be pruned periodically to remove images uploaded by users that did not complete the account creation.

The location of the temporary folder can be set when configuring the nestjs `FileStorageModule` with the `temporaryPrefix` option (defaulting to `tmp/`).

### Commit temporary files to a definitive location

The `FileStorageService` exposes a `commitTemporaryFile` method that allows to move a file from the temporary folder to a definitive location. Here is an hypothetic example in a method that would commit a temporary image when creating a user:

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

```

### Prune outdated temporary files

While configuring the nestjs `FileStorageModule`, you can provide a `temporaryTTL` option to set the Time To live of the temporary files (in seconds, with a default value of 2 hours).

The nestjs `FileStorageService` exposes a `pruneTemporaryFiles` method that will remove all files older than the TTL in the temporary folder.

This method should be called periodically (for example in a cron) if you don’t want the temporary folder to grow out of boundaries.

## Other file manipulations

The nestjs `FileStorageService` uses Minio javascript client () and extends it, making all the minio client method also available for custom operations. For more information, please refer to the minio documentation ([https://min.io/docs/minio/linux/developers/javascript/API.html](https://min.io/docs/minio/linux/developers/javascript/API.html))
