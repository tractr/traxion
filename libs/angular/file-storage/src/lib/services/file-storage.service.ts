import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { FILE_STORAGE_CONFIGURATION } from '../constants';
import {
  FileStorageConfiguration,
  FileStorageFormData,
  FileStoragePresignedPostToken,
  FileStorageUploadResult,
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
   * @param mimeType - MIME type of the file to upload
   * @param fileSize - Size of the file to upload
   * @returns Observable that resolve into a presigned post token
   */
  public getPresignedUploadUrl(mimeType: string, fileSize: number) {
    const { presignedUploadEndpoint } = this.fileStorageConfiguration;
    return this.http
      .get<FileStoragePresignedPostToken>(presignedUploadEndpoint, {
        params: { mimeType, fileSize },
      })
      .pipe(shareReplay(1));
  }

  /**
   * Get presigned download url to download a file to storage
   *
   * @param file - Path of the file to download
   * @returns Observable that resolve into a presigned post token
   */
  public getPresignedDownloadUrl(file: string) {
    const { presignedDownloadEndpoint } = this.fileStorageConfiguration;
    return this.http
      .get<{ url: string }>(presignedDownloadEndpoint, {
        params: { file },
      })
      .pipe(shareReplay(1));
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
      formData.append(key, value as string);
    }

    formData.append('file', file);

    return formData;
  }

  /**
   * Upload a file to file storage using presigned url
   *
   * @param file - File to upload to file storage
   * @param reportProgress - Option to report request progress
   * @returns Observable that resolves as a temporary url of the uploaded file
   */
  public uploadFileToFileStorage(
    file: File,
    reportProgress = false,
  ): Observable<FileStorageUploadResult> {
    if (!file) throw new Error('No file provided for upload to file storage');

    return this.getPresignedUploadUrl(file.type, file.size).pipe(
      map(({ formData, postURL }) => ({
        postURL,
        formData: this.generateFormData(formData, file),
      })),
      switchMap(({ postURL, formData }) =>
        this.http.post(postURL, formData, { reportProgress }).pipe(
          map(() => ({
            url: this.getUploadFileUrl(
              postURL,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              formData.get('key')!.toString(),
            ),
            size: file.size,
            mimeType: file.type,
          })),
        ),
      ),
      shareReplay(1),
    );
  }

  /**
   * Return the url of an uploaded file, calculated from the upload url
   * and the file key
   *
   * @param postURL - Upload url of the file
   * @param fileKey - Key of the uploaded file
   * @returns the public url of the uploaded file
   */
  public getUploadFileUrl(postURL: string, fileKey: string) {
    // Remove last backslash of the url if it exists, as it can be inconsistent between minio and aws
    const formattedPostUrl = postURL.replace(/\/\s*$/, '');
    return `${formattedPostUrl}/${fileKey}`;
  }
}
