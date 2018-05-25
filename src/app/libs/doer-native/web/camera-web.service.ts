import { Injectable, Optional, InjectionToken, Inject } from '@angular/core';

declare var cordova: any;


@Injectable()
export class CameraWebService {

  constructor() {
  }

  takePhoto: any = async (opts) => {
    // convention to pass to upladFileService as a filePath
    return Promise.resolve('file_input');
  }

}
