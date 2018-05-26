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

  constructor(private readonly storage: Storage) {}

  async get(key: string) {
    return this.storage.get(key).then(fromStr);
  }

  async set(key: string, val: any) {
    return this.storage.set(key, toStr(val));
  }
}
