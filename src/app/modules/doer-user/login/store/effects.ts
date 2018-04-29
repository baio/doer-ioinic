import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { LoginFormState } from "../login.types";
import { FormService } from "./data/form.service";
import { CommonFormEffects, ionicGoAction } from "../../../../libs/doer-ionic-core";
import { subFormActionsWrap, CommonFormEffectTypes, DisplayErrorFn, isSaveFormResultAction } from "../../../../libs/doer-ngx-core";
import { isSubFormAction, subFormAction } from "./actions";

import { ToastController, NavController } from "ionic-angular";
import { filterMapRx, getPayload, isOK, filterMap$, mapR$, flatMapR$, mapR, ofPromiseR$ } from "../../../../libs/doer-core";
import { AuthService } from "../../../../libs/doer-ngx-core/auth/auth.service";
import { filter, map, tap, flatMap } from "rxjs/operators";
import { prop, compose, pipe } from "ramda";
import { of } from "rxjs/Observable/of";

const errFn = (toastController: ToastController): DisplayErrorFn => err => {
    const toast = toastController.create({message: err.toString(), duration: 3000});
    toast.present();
    console.error(err);
};

const wrap = subFormActionsWrap(isSubFormAction, subFormAction);

@Injectable()
export class FormEffects extends CommonFormEffects {
  constructor(
    store$: Store<LoginFormState>,
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

  @Effect() common = this.createCommonEffects([]);

  @Effect()
  loginSuccess =
    this.actions$.pipe(
      filterMap$(isSubFormAction)(getPayload),
      filterMap$(isSaveFormResultAction)(getPayload),
      // set auth token to http service
      flatMapR$(
        pipe(this.authService.updatePrincipal, ofPromiseR$)
      ),
      mapR$(_ => ionicGoAction({name: 'register-org-complete'})),
      filterMap$(isOK)(prop('value'))
    )

}
