import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { CreateWorkerFormState } from '../create-worker.types';
import { FormService } from './data/form.service';
import {
  CommonFormEffects,
  ionicGoAction
} from '@doer/ionic-core';
import {
  subFormActionsWrap,
  CommonFormEffectTypes,
  DisplayErrorFn,
  isSaveFormResultAction,
  loginResultAction,
  AuthService,
  loginFromTokensAction
} from '@doer/ngx-core';
import { isSubFormAction, subFormAction } from './actions';

import { ToastController, NavController } from 'ionic-angular';
import {
  filterMap$,
  getPayload,
  isOK,
  ok,
  flatMapR$,
  ofPromiseR$,
  mapR
} from '@doer/core';
import { filter } from 'rxjs/operators/filter';
import { always, pipe, prop, path } from 'ramda';
import { flatMap, tap } from 'rxjs/operators';
import { appendWorkerAction, User } from '../../store/users';

const errFn = (toastController: ToastController): DisplayErrorFn => err => {
  const toast = toastController.create({
    message: err.toString(),
    duration: 3000
  });
  toast.present();
  console.error(err);
};

const wrap = subFormActionsWrap(isSubFormAction, subFormAction);

@Injectable()
export class FormEffects extends CommonFormEffects {
  constructor(
    store$: Store<CreateWorkerFormState>,
    actions$: Actions,
    toastController: ToastController,
    private readonly formService: FormService,
    private readonly authService: AuthService
  ) {
    super(
      store$,
      actions$,
      wrap,
      formService.load,
      formService.save,
      errFn(toastController)
    );
  }

  @Effect() common = this.createCommonEffects();

  @Effect() appendNewUser =
    this.actions$.pipe(
      filterMap$(isSubFormAction)(getPayload),
      filterMap$(isSaveFormResultAction)(getPayload),
      filterMap$(isOK)(prop('value')),
      flatMap((data: User) => [
        appendWorkerAction(data),
        ionicGoAction({name : 'worker-page', id: data.id})
      ])
    );

}
