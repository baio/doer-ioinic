import { Injectable, Optional, InjectionToken, Inject } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Platform } from 'ionic-angular';
import { Transfer, FileUploadOptions } from '@ionic-native/transfer';
import {
  HttpService
} from '@doer/ngx-core';
import { ok, err } from '@doer/core';

declare var window: Window;

@Injectable()
export class UploadFileWebService {

  constructor(
    private readonly httpService: HttpService
  ) {}

  async uploadFile(
    url,
    filePath: string,
    method: string = 'POST',
    payload?: any | null
  ) {
    const files = window.event.target['files'];
    const fileCount: number = files.length;
    const formData = new FormData();
    if (fileCount > 0) {
      // a file was selected
      for (let i = 0; i < fileCount; i++) {
        formData.append('file[]', files.item(i));
      }
      return this.httpService.request({
        url,
        headers: [],
        kind: 'HttpPostLike',
        method,
        body: formData
      } as any).toPromise();
    } else {
      return Promise.reject('File wasnt selected');
    }
  }
}
