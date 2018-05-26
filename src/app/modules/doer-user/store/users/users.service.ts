import { Injectable } from '@angular/core';
import {
  SaveFormFn,
  LoadFormFn,
  HttpService,
  DisplayErrorFn
} from '@doer/ngx-core';
import { ok, ObservableResult, err, mapR$ } from '@doer/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { UsersList } from './types';
import { repeat, map, evolve, pipe, when, isNil, always } from 'ramda';
import { UploadFileService, CameraService } from '@doer/native';
import { DoerCameraService } from '@doer/common';
import { fromPromise } from 'rxjs/observable/fromPromise';

const DEFAULT_AVATAR = 'https://static.getjar.com/icon-50x50/f9/883743_thm.png';

const mapListResult = list => ({
  items: map(
    evolve({ avatar: when(isNil, always(DEFAULT_AVATAR)) }),
    list
  )
}) as any;

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly uploadFileService: UploadFileService,
    private readonly cameraService: DoerCameraService
  ) {}

  load = (): ObservableResult<UsersList> => {
    return this.httpService.get('users').pipe(mapR$(mapListResult));
  };

  async _addWorkerPhoto(userId: string) {
    const path = await this.cameraService.takePhotoEnlist();
    const result = await this.uploadFileService.uploadFile(
      `users/${userId}/enlist-photo`,
      path
    );
    return +result.response;
  }

  addWorkerPhoto = (userId: string) =>
    fromPromise(
      this._addWorkerPhoto(userId)
        .then(photosCount => ok({ userId, photosCount }))
        .catch(err)
    );

  async _updateUserAvatar() {
    const path = await this.cameraService.takePhotoAvatar();
    const result = await this.uploadFileService.uploadFile(
      'user/avatar',
      path,
      'patch'
    );
    return result.response;
  }

  updateUserAvatar = () =>
    fromPromise(
      this._updateUserAvatar()
        .then(ok)
        .catch(err)
    );
}
