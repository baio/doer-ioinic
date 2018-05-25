import { Injectable, Optional, InjectionToken, Inject } from '@angular/core';
import { CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Platform } from 'ionic-angular';
import { normalizeURL } from 'ionic-angular';
import { merge } from 'ramda';
import { CameraService, TakePhoto } from '@doer/native';

declare var cordova: any;

@Injectable()
export class DoerCameraService {
  constructor(private readonly cameraService: CameraService) {}

  takePhoto: TakePhoto = this.cameraService.takePhoto.bind(this);

  takePhotoAvatar = () =>
    this.takePhoto({
      quality: 75,
      targetWidth: 600,
      targetHeight: 600,
      allowEdit: true
    })

  takePhotoEnlist = () =>
    this.takePhoto({
      quality: 75,
      targetWidth: 600
    })

  takePhotoVerify = () =>
    this.takePhoto({
      quality: 75,
      targetWidth: 600
    })
}
