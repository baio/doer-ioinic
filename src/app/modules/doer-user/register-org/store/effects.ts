import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { RegisterOrgFormState } from "../register-org.types";
import { FormService } from "./data/form.service";
import { CommonFormEffects } from "../../../../libs/doer-ionic-core";
import { subFormActionsWrap } from "../../../../libs/doer-ngx-core";
import { isSubFormAction, subFormAction } from "./actions";


const wrap = subFormActionsWrap(isSubFormAction, subFormAction);

@Injectable()
export class FormEffects extends CommonFormEffects {
  constructor(
    store$: Store<RegisterOrgFormState>,
    actions$: Actions,
    private readonly formService: FormService
  ) {

    super(
      store$,
      actions$,
      wrap,
      formService.load,
      formService.save,
    );
  }

  @Effect() common = this.createCommonEffects();

}
