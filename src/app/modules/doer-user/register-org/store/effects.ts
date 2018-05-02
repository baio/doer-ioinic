import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { RegisterOrgFormState } from "../register-org.types";
import { FormService } from "./data/form.service";
import { CommonFormEffects, ionicGoAction } from "../../../../libs/doer-ionic-core";
import { subFormActionsWrap, CommonFormEffectTypes, DisplayErrorFn, isSaveFormResultAction, loginResultAction, AuthService, loginFromTokensAction } from "../../../../libs/doer-ngx-core";
import { isSubFormAction, subFormAction } from "./actions";

import { ToastController, NavController } from "ionic-angular";
import { filterMap$, getPayload, isOK, ok, flatMapR$, ofPromiseR$ } from "../../../../libs/doer-core";
import { filter } from "rxjs/operators/filter";
import { always, pipe, prop, path } from "ramda";
import { flatMap, tap } from "rxjs/operators";

const errFn = (toastController: ToastController): DisplayErrorFn => err => {
    const toast = toastController.create({message: err.toString(), duration: 3000});
    toast.present();
    console.error(err);
};

const wrap = subFormActionsWrap(isSubFormAction, subFormAction);

@Injectable()
export class FormEffects extends CommonFormEffects {
  constructor(
    store$: Store<RegisterOrgFormState>,
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

  @Effect()
  registerOrgSuccess = this.actions$.pipe(
    filterMap$(isSubFormAction)(getPayload),
    filterMap$(isSaveFormResultAction)(pipe(getPayload)),
    filterMap$(isOK)(pipe(path(['value', 'tokens']), loginFromTokensAction)),
  );

}
