import { Injectable, Optional, InjectionToken, Inject } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Platform } from 'ionic-angular';
import { Transfer, FileUploadOptions } from '@ionic-native/transfer';
import {
  HttpService
} from '@doer/ngx-core';
import { ok, err, isOK } from '@doer/core';

declare var window: Window;

@Injectable()
export class UploadFileWebService {

  private pervFiles: any;

  constructor(
    private readonly httpService: HttpService
  ) {}

  async uploadFile(
    url,
    filePath: string,
    method: string = 'POST',
    payload?: any | null
  ) {
    const files = window.event.target['files'] || this.pervFiles;
    // when 2 file uploads one after another
    this.pervFiles = files;
    const fileCount: number = files.length;
    const formData = new FormData();
    if (fileCount > 0) {
      // a file was selected
      for (let i = 0; i < fileCount; i++) {
        formData.append('file_' + i, files.item(i));
      }
      formData.append('file_name', 'file.jpg');
      console.log('uploadFile', url, method);
      try {
        const result = await this.httpService.request({
          url,
          headers: {mimeType: 'multipart/form-data'},
          kind: 'HttpPostLike',
          method,
          body: formData
        } as any)
        .toPromise()
        .then(x => {
          if (isOK(x)) {
            console.log('uploadFile success', x.value);
            return x.value;
          } else {
            throw x.error;
          }
        });

        return result;
      } catch (e) {
        console.log('uploadFile error', e);
        throw e;
      }

    } else {
      return Promise.reject('File wasnt selected');
    }
  }
}
