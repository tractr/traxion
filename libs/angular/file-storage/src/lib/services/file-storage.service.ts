import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';

import { FILE_STORAGE_CONFIGURATION } from '../constants';
import {
  FileStorageConfig,
  FileStorageFormData,
  FileStoragePresignedPostToken,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class FileStorageService {
  constructor(
    @Inject(FILE_STORAGE_CONFIGURATION)
    private fileStorageConfig: FileStorageConfig,
    private http: HttpClient,
  ) {}

  /**
   * Get presigned post token to upload a file into storage
   *
   * @returns Observable that resolve into a presigned post token
   */
  public getPresignedUploadToken() {
    return this.http.get<FileStoragePresignedPostToken>(
      `${this.fileStorageConfig.fileStorageEndpoint}`,
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
  public uploadFileToFileStorage(file: File, reportProgress = false) {
    if (!file) throw new Error('No file provided for upload to file storage');

    return this.getPresignedUploadToken().pipe(
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
