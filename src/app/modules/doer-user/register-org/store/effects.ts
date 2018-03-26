import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { RegisterOrgFormState } from "../register-org.types";
import { FormService } from "./data/form.service";
import { CommonFormEffects } from "../../../../libs/doer-ionic-core";
import { subFormActionsWrap, CommonFormEffectTypes, DisplayErrorFn } from "../../../../libs/doer-ngx-core";
import { isSubFormAction, subFormAction } from "./actions";

import { ToastController } from "ionic-angular";

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
    private readonly formService: FormService,
    toastController: ToastController
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

}
