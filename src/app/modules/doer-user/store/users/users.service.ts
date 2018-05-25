import { Injectable } from '@angular/core';
import {
  SaveFormFn,
  LoadFormFn,
  HttpService,
  DisplayErrorFn
} from '@doer/ngx-core';
import { ok, ObservableResult, err } from '@doer/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { UsersList } from './types';
import { repeat } from 'ramda';
import { UploadFileService, CameraService } from '@doer/native';
import { DoerCameraService } from '@doer/common';
import { fromPromise } from 'rxjs/observable/fromPromise';

const DATA =
  {
    id: '10',
    name: 'Petya',
    kind: 'Worker',
    avatar: 'https://static.getjar.com/icon-50x50/f9/883743_thm.png',
    photosCount: 5
  };


@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly uploadFileService: UploadFileService,
    private readonly cameraService: DoerCameraService
  ) {}

  load = (): ObservableResult<UsersList> => {
    return of(ok({ items: repeat(DATA, 1000) }));
  }

  async _addWorkerPhoto(userId: string) {
    const path = await this.cameraService.takePhotoEnlist();
    const result = await this.uploadFileService.uploadFile(`users/${userId}/enlist-photo`, path);
    return +result.response;
  }

  addWorkerPhoto = (userId: string) =>
    fromPromise(
      this._addWorkerPhoto(userId).then(photosCount => ok({userId, photosCount})).catch(err)
    )

  async _updateUserAvatar() {
    const path = await this.cameraService.takePhotoAvatar();
    const result = await this.uploadFileService.uploadFile('user/avatar', path, 'patch');
    return result.response;
  }

  updateUserAvatar = ()  =>
    fromPromise(this._updateUserAvatar().then(ok).catch(err))
}
