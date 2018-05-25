import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { UsersService } from './users.service';
import { filterMap$, getPayload, mapR, isOK } from '@doer/core';
import * as A from './actions';
import { switchMap, map, filter } from 'rxjs/operators';
import { UploadFileService, CameraService } from '@doer/native';
import { setAvatarAction } from '@doer/ngx-core';
import { prop } from 'ramda';

@Injectable()
export class Effects {
  constructor(
      private readonly actions$: Actions,
      private readonly cameraService: CameraService,
      private readonly uploadFileService: UploadFileService,
      private readonly usersService: UsersService
  ) {}

  @Effect()
  load$ = this.actions$.pipe(
    filterMap$(A.isLoadUsersAction)(getPayload),
    switchMap(this.usersService.load),
    map(A.loadUsersResultAction)
  );

  @Effect()
  updateUserAvatar$ = this.actions$.pipe(
    filterMap$(A.isupdateUserAvatarAction)(getPayload),
    // TODO : show error !
    switchMap(this.usersService.updateUserAvatar),
    filterMap$(isOK)(prop('value')),
    map(setAvatarAction)
  );


  @Effect()
  addWorkerPhoto$ = this.actions$.pipe(
    filterMap$(A.isAddWorkerPhotoAction)(getPayload),
    switchMap(this.usersService.addWorkerPhoto),
    map(A.addWorkerPhotoResultAction)
  );

}
