import { Injectable, Optional, InjectionToken, Inject } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Platform } from 'ionic-angular';

declare var cordova: any;

@Injectable()
export class CameraService {
  constructor(private readonly camera: Camera, private readonly platform: Platform, private readonly file: File) {}

  private async copyFileToLocalDir(namePath, currentName, newFileName) {
    return await this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      console.log('111', JSON.stringify(success, null, 2));
      return `file://${success.fullPath}`;
    });
  }

  async normalizePath(path: string) {

    /*
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }*/

    const currentName = path.substr(path.lastIndexOf('/') + 1);
    const correctPath = path.substr(0, path.lastIndexOf('/') + 1);

    return await this.copyFileToLocalDir(correctPath, currentName, '111.jpg');
  }

  async takePhoto() {

    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    return await this.camera.getPicture(options).then(url => {
        console.log('success');
        console.log(url);
        return this.normalizePath(url);
     }, (err) => {
      // Handle error
        console.log('error');
        console.log(JSON.stringify(err, null, 2));
        return Promise.reject(err);
     });
  }
}
