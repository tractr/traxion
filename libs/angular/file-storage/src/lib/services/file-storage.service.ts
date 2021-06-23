import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';

import { FILE_STORAGE_CONFIGURATION } from '../constants';
import {
  FileStorageConfiguration,
  FileStorageFormData,
  FileStoragePresignedPostToken,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class FileStorageService {
  constructor(
    @Inject(FILE_STORAGE_CONFIGURATION)
    private fileStorageConfiguration: FileStorageConfiguration,
    private http: HttpClient,
  ) {}

  /**
   * Get presigned upload url to upload a file into storage
   *
   * @params customBucket - Custom bucket to update file. Else default
   * bucket will be used
   * @returns Observable that resolve into a presigned post token
   */
  public getPresignedUploadUrl(customBucket?: string) {
    const { defaultBucket, presignedUploadEndpoint } =
      this.fileStorageConfiguration;
    const bucket = customBucket ?? defaultBucket;
    return this.http.get<FileStoragePresignedPostToken>(
      presignedUploadEndpoint,
      {
        params: { bucket },
      },
    );
  }

  /**
   * Get presigned download url to download a file into storage
   *
   * @params customBucket - Custom bucket to update file. Else default
   * bucket will be used
   * @returns Observable that resolve into a presigned post token
   */
  public getPresignedDownloadUrl(file: string, customBucket?: string) {
    const { defaultBucket, presignedDownloadEndpoint } =
      this.fileStorageConfiguration;
    const bucket = customBucket ?? defaultBucket;
    return this.http.get<FileStoragePresignedPostToken>(
      presignedDownloadEndpoint,
      {
        params: { bucket, file },
      },
    );
  }

  /**
   * Generate form data from presigned post token and file
   * to upload
   *
   * @param presignedPostToken - Presigned post token to build form data
   * @param file - File to upload
   * @returns Form data instance that must be sent to data storage
   */
  public generateFormData(
    rawFormData: FileStorageFormData,
    file: File,
  ): FormData {
    const formData = new FormData();

    for (const [key, value] of Object.entries(rawFormData)) {
      formData.append(key, value);
    }

    formData.append('file', file);

    return formData;
  }

  /**
   * Upload a file to file storage using presigned url
   *
   * @param file - File to upload to file storage
   * @param reportProgress - Option to report request progress
   * @returns Observable
   */
  public uploadFileToFileStorage(
    file: File,
    reportProgress = false,
    customBucket?: string,
  ) {
    if (!file) throw new Error('No file provided for upload to file storage');

    return this.getPresignedUploadUrl(customBucket).pipe(
      map(({ formData, postUrl }) => ({
        postUrl,
        formData: this.generateFormData(formData, file),
      })),
      mergeMap(({ postUrl, formData }) =>
        this.http.post(postUrl, formData, { reportProgress }),
      ),
    );
  }
}
