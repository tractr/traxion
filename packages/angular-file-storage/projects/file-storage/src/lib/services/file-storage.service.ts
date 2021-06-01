import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
// eslint-disable-next-line
import { map, mergeMap } from 'rxjs/operators';

import { FILE_STORAGE_CONFIG } from '../constants';
import { FileStorageConfig } from '../interfaces';
import { FileStorageFormData } from '../interfaces/file-storage-form-data.interface';
import { FileStoragePresignedPostToken } from '../interfaces/file-storage-presigned-post.interface';

@Injectable({
  providedIn: 'root',
})
export class FileStorageService {
  constructor(
    @Inject(FILE_STORAGE_CONFIG) private fileStorageConfig: FileStorageConfig,
    private http: HttpClient,
  ) {}

  /**
   * Get presigned post token to upload a file into storage
   *
   * @returns Observable that resolve into a presigned post token
   */
  public getPresignedPostToken() {
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
  public uploadFileToStorage(file: File, reportProgress = false) {
    if (!file) throw new Error('No file provided for upload to file storage');

    // Send request
    return this.getPresignedPostToken().pipe(
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
