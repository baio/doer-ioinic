import { Injectable, Optional, InjectionToken, Inject } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Platform } from 'ionic-angular';
import { Transfer, FileUploadOptions } from '@ionic-native/transfer';
import { AuthService, HttpConfig, HTTP_CONFIG } from '@doer/ngx-core';

@Injectable()
export class UploadFileService {
  constructor(
    private readonly transfer: Transfer,
    private readonly authService: AuthService,
    @Inject(HTTP_CONFIG)  private readonly httpConfig: HttpConfig
  ) {}

  async uploadFile(path: string) {
    const uploadUrl = `${this.httpConfig.baseUrl}update-avatar`;
    const fileName = 'user-avatar.jpg';

    let token = await this.authService.token;

    const options: FileUploadOptions = {
      fileKey: 'file',
      fileName,
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: { fileName },
      headers: { Authorization: 'Bearer ' + token }
    };

    const transfer = this.transfer.create();

    return await transfer.upload(path, uploadUrl, options);
  }
}
