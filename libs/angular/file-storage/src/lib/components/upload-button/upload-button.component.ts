import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzUploadXHRArgs } from 'ng-zorro-antd/upload';

import { FileStorageUploadResult } from '../../interfaces';
import { FileStorageService } from '../../services';

@Component({
  selector: 'tractr-file-storage-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.less'],
})
export class UploadButtonComponent {
  /**
   * Input: List of MIME types accepted for the upload
   * MIME types should be separated by coma
   *
   * @example 'image/jpeg,image/png'
   */
  @Input() acceptedFileTypes?: string;

  /**
   * Input: Maximum size of the file (KB)
   */
  @Input() sizeLimit?: number;

  /**
   * Output: return temporary url of the uploaded file
   */
  @Output() uploadResult = new EventEmitter<FileStorageUploadResult>();

  constructor(private fileStorageService: FileStorageService) {}

  // NOTE: customUpload method must be written as an arrow function
  // see https://ng.ant.design/components/upload/en#nzcustomrequest

  /**
   * Callback to upload file to file storage
   *
   * @param item
   * @returns Observable that resolve as an ojbect
   * containing, the temporary url of the uploaded file,
   * its size and MIME type
   */
  customUpload = (item: NzUploadXHRArgs) => {
    const { file } = item;
    return this.fileStorageService
      .uploadFileToFileStorage(file as unknown as File)
      .subscribe((fileUploadResult) => {
        this.uploadResult.emit(fileUploadResult);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any; // any used to solve type conflict between rxjs 7 and 6
  };
}
