import { Injectable, Optional, InjectionToken, Inject } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { merge } from 'ramda';

const toStr = x => (x ? JSON.stringify(x) : null);
const fromStr = x => (x ? JSON.parse(x) : null);

@Injectable()
export class StorageService {

  constructor() {}

  async get(key: string) {
    return Promise.resolve(window.localStorage.getItem(key)).then(fromStr);
  }

  async set(key: string, val: any) {
    return Promise.resolve(window.localStorage.setItem(key, toStr(val)));
  }
}
