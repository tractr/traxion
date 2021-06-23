import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'tr-file-storage-upload-button',
  templateUrl: './file-storage-upload-button.component.html',
})
export class FileStorageUploadButtonComponent {
  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
  }
}
