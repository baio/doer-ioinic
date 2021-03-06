import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { UsersService } from './users.service';
import { filterMap$, getPayload, mapR, isOK, mapR$, ok } from '@doer/core';
import * as A from './actions';
import { switchMap, map, filter, tap, withLatestFrom, flatMap } from 'rxjs/operators';
import { UploadFileService, CameraService } from '@doer/native';
import { setAvatarAction, isLoginResultAction } from '@doer/ngx-core';
import { prop, propEq, pipe, not } from 'ramda';
import { UsersListStore} from './types';
import { Store } from '@ngrx/store';
import { selectUser, selectUsersSet } from './selectors';

@Injectable()
export class Effects {
  constructor(
      private readonly actions$: Actions,
      private readonly cameraService: CameraService,
      private readonly uploadFileService: UploadFileService,
      private readonly usersService: UsersService,
      private readonly store: Store<UsersListStore>
  ) {}

  // load users on successfull login
  @Effect()
  loginSuccess$ = this.actions$.pipe(
    filterMap$(isLoginResultAction)(getPayload),
    filter(isOK),
    map(() => A.loadUsersAction())
  );

  @Effect()
  load$ = this.actions$.pipe(
    filterMap$(A.isLoadUsersAction)(getPayload),
    switchMap(this.usersService.load),
    map(A.loadUsersResultAction)
  );

  @Effect()
  updateUserAvatar$ = this.actions$.pipe(
    filterMap$(A.isUpdatePrincipalAvatarAction)(getPayload),
    // TODO : show error !
    switchMap(this.usersService.updatePrincipalAvatar),
    filterMap$(isOK)(prop('value')),
    map(setAvatarAction)
  );

  @Effect()
  changeWorkerAvatar$ = this.actions$.pipe(
    filterMap$(A.isChangeWorkerAvatarAction)(getPayload),
    switchMap(this.usersService.updateUserAvatar),
    map(A.changeWorkerAvatarResultAction)
  );

  // just map changeWorkerAvatarResultAction -> setUserAvatarAction
  @Effect()
  changeWorkerAvatarSuccess$ = this.actions$.pipe(
    filterMap$(A.isChangeWorkerAvatarResultAction)(getPayload),
    tap(console.log),
    filterMap$(isOK)(prop('value')),
    map(A.setUserAvatarAction)
  );

  addWorkerPhoto$ = this.actions$.pipe(
    filterMap$(A.isAddWorkerPhotoAction)(getPayload),
    withLatestFrom(this.store.select(selectUsersSet), (userId: string, usersSet) => usersSet[userId])
  );

  @Effect()
  addFirstWorkerPhoto$ = this.addWorkerPhoto$.pipe(
    filter(propEq('photosCount', 0)),
    map(prop('id')),
    switchMap(this.usersService.addFirstWorkerPhoto),
    flatMap(res => {
      if (isOK(res)) {
        return [
          A.addWorkerPhotoResultAction(ok({userId: res.value.userId, photosCount: 1})),
          A.setUserAvatarAction({userId: res.value.userId, avatar: res.value.avatar})
        ];
      } else {
        return [A.addWorkerPhotoResultAction(res)];
      }
    })
  );

  @Effect()
  addNextWorkerPhoto$ = this.addWorkerPhoto$.pipe(
    filter(pipe(propEq('photosCount', 0), not)),
    map(prop('id')),
    switchMap(this.usersService.addWorkerPhoto),
    map(A.addWorkerPhotoResultAction)
  );
}
