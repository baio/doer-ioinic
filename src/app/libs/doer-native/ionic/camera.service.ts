import { Injectable, Optional, InjectionToken, Inject } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Platform } from 'ionic-angular';
import { normalizeURL } from 'ionic-angular';
import { merge } from 'ramda';

declare var cordova: any;

// https://devdactic.com/ionic-2-images/

export type TakePhoto = (opts?: CameraOptions|null) => Promise<string>;

@Injectable()
export class CameraService {

  constructor(private readonly camera: Camera) {}

  takePhoto: TakePhoto = async (opts) => {

    const options: CameraOptions = merge({
      quality: 75,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true/*,
      targetWidth: 600,
      targetHeight: 600,
      allowEdit: true*/
    }, opts || {});

    console.log('takePhoto', options);

    const url: string = await this.camera.getPicture(options);

    return normalizeURL(url);
  }

}
