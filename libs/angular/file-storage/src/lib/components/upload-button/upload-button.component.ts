import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzUploadXHRArgs } from 'ng-zorro-antd/upload';

import { FileStorageService } from '../../services';

@Component({
  selector: 'tractr-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.less'],
})
export class UploadButtonComponent {
  @Input() placeholder = 'test';

  @Input() acceptedFileTypes = 'image/jpeg';

  @Input() sizeLimit = 20000;

  @Input() uploadListSettings = {
    showPreviewIcon: false,
    showDownloadIcon: false,
    showRemoveIcon: true,
  };

  @Output() previewUrl = new EventEmitter<string>();

  @Output() temporaryUrl = new EventEmitter<string>();

  @Output() remove = new EventEmitter<string>();

  fileList = [];

  constructor(private fileStorageService: FileStorageService) {}

  // Upload file to s3 temporary bucket
  customUpload = (item: NzUploadXHRArgs) => {
    const { file } = item;
    // this.previewUrl.emit(URL.createObjectURL(file));
    return this.fileStorageService
      .uploadFileToFileStorage(file as unknown as File)
      .subscribe((res) => console.log('coucou', res)) as any;
  };
}
