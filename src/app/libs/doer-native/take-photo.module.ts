import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, Platform } from 'ionic-angular';
import { CameraService } from './ionic/camera.service';
import { Camera } from '@ionic-native/camera';
import { CameraWebService } from './web/camera-web.service';
import { UploadFileService } from '@doer/native';
import { Transfer } from '@ionic-native/transfer';
import {
  AUTH_SERVICE_CONFIG,
  AuthService,
  HTTP_CONFIG,
  HttpConfig,
  HttpService
} from '@doer/ngx-core';
import { UploadFileWebService } from './web/upload-file-web.service';
import { TakePhotoButtonComponent } from './take-photo-button.component';


export function getCameraService(platform: Platform, camera: Camera) {
  if (platform.platforms().indexOf('mobile') !== -1) {
    return new CameraService(camera);
  } else {
    console.log('initialize camera WEB service');
    return new CameraWebService();
  }
}

export function getUploadFileService(
  platform: Platform,
  transfer: Transfer,
  authService: AuthService,
  httpConfig: HttpConfig,
  httpService: HttpService
) {
  if (platform.platforms().indexOf('mobile') !== -1) {
    return new UploadFileService(transfer, authService, httpConfig);
  } else {
    console.log('initialize upload file WEB service');
    return new UploadFileWebService(httpService);
  }
}


/**
 * Initialize camera.service and upload-filed service depending on platform
 */
@NgModule({
  imports: [
    IonicModule
  ],
  declarations: [
    TakePhotoButtonComponent
  ],
  exports: [
    TakePhotoButtonComponent
  ]
})
export class TakePhotoModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TakePhotoModule,
            providers: [
                Camera,
                Transfer,
                {
                    provide: CameraService,
                    useFactory: getCameraService,
                    deps: [Platform, Camera]
                },
                {
                    provide: UploadFileService,
                    useFactory: getUploadFileService,
                    deps: [Platform, Transfer, AuthService, HTTP_CONFIG, HttpService],
                }
            ]
        }
    }
}
