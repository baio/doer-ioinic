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
import { Users, User } from './types';
import { repeat, map, evolve, pipe, when, isNil, always, fromPairs, objOf } from 'ramda';
import { UploadFileService, CameraService } from '@doer/native';
import { DoerCameraService } from '@doer/common';
import { fromPromise } from 'rxjs/observable/fromPromise';

const DEFAULT_AVATAR = 'https://static.getjar.com/icon-50x50/f9/883743_thm.png';

const mapListResult: any =
  pipe(
    map(
      pipe(
        evolve({ avatar: when(isNil, always(DEFAULT_AVATAR)) }),
        (x: any) => [x.id, x]
      )
    ),
    fromPairs,
    objOf('items')
  );

const toObsResult = <T>(f: Promise<T>) =>  fromPromise(
  f.then(ok).catch(err)
);

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly uploadFileService: UploadFileService,
    private readonly cameraService: DoerCameraService
  ) {}

  load = (): ObservableResult<Users> => {
    return this.httpService.get('users').pipe(mapR$(mapListResult));
  };

  async _addFirstWorkerPhoto(userId: string) {
    // If this first user photo take it as for avatar and then update also user's profile avatar
    const path = await this.cameraService.takePhotoAvatar();
    const result = await this.uploadFileService.uploadFile(
      `users/${userId}/enlist-photo`,
      path
    );
    const avatarResult = await this.uploadFileService.uploadFile(
      `users/${userId}/avatar`,
      path
    );
    return avatarResult;
  }

  addFirstWorkerPhoto = (userId: string) =>
    toObsResult(
      this._addFirstWorkerPhoto(userId)
        .then(avatar => ({ userId, avatar }))
    )

  async _addWorkerPhoto(userId: string) {
    const path = await this.cameraService.takePhotoEnlist();
    const result = await this.uploadFileService.uploadFile(
      `users/${userId}/enlist-photo`,
      path
    );
    return +result;
  }

  addWorkerPhoto = (userId: string) =>
    toObsResult(
      this._addWorkerPhoto(userId)
        .then(photosCount => ({ userId, photosCount }))
    )

  async _updateUserAvatar() {
    const path = await this.cameraService.takePhotoAvatar();
    const result = await this.uploadFileService.uploadFile(
      'user/avatar',
      path
    );
    return result;
  }

  updateUserAvatar = () =>
    toObsResult(this._updateUserAvatar())
}
