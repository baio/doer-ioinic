import { Injectable, Optional, InjectionToken, Inject } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Platform } from 'ionic-angular';
import { Transfer, FileUploadOptions } from '@ionic-native/transfer';
import { AuthService, HttpConfig, HTTP_CONFIG } from '@doer/ngx-core';
import { ok, err } from '@doer/core';

@Injectable()
export class UploadFileService {
  constructor(
    private readonly transfer: Transfer,
    private readonly authService: AuthService,
    @Inject(HTTP_CONFIG)  private readonly httpConfig: HttpConfig
  ) {}

  async uploadFile(url, filePath: string, method: string = 'POST', payload?: any|null) {

    const uploadUrl = `${this.httpConfig.baseUrl}${url}`;

    let token = await this.authService.token;

    const options: FileUploadOptions = {
      httpMethod: method,
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: payload,
      headers: { Authorization: 'Bearer ' + token }
    };

    const transfer = this.transfer.create();

    return transfer.upload(filePath, uploadUrl, options); // .then(ok).catch(e => Promise.resolve(err(e)));
  }
}
