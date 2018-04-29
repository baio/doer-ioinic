import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { Field, ionicGoAction } from "../../../../libs/doer-ionic-core";
import { Store } from "@ngrx/store";
import { LoginFormStore } from "../login.types";
import { Observable } from "rxjs/Observable";
import { selectFormSubState, subFormAction } from "../store";
import { FormState, FormAction } from "../../../../libs/doer-ngx-core";
import { IonicPage } from "ionic-angular";

@IonicPage({name: 'login'})
@Component({
    selector: 'dr-login-page',
    templateUrl: './login-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
export class LoginPageComponent {

  readonly formState$: Observable<FormState>;
  fields: Field[];

  constructor(
    private readonly store: Store<LoginFormStore>
  )
  {

    this.formState$ = store.select(selectFormSubState);

    this.fields = [
      {
        kind: 'TextField' as 'TextField',
        id: 'email',
        label: 'Email',
        validation: { required : true }
      },
      {
        kind: 'TextField' as 'TextField',
        id: 'password',
        label: 'Пароль',
        validation: { required : true }
      }
    ];


  }

  onAction(action: FormAction) {
    this.store.dispatch(subFormAction(action));
  }

  onCancel() {
    this.store.dispatch(ionicGoAction({name: 'register-org-complete'}))
  }

}
