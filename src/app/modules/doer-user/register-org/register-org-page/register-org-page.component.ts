import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { Field } from "../../../../libs/doer-ionic-core";
import { Store } from "@ngrx/store";
import { RegisterOrgFormStore, RegisterOrgFormState } from "../register-org.types";
import { Observable } from "rxjs/Observable";
import { selectFormSubState, subFormAction } from "../store";
import { FormState, FormAction } from "../../../../libs/doer-ngx-core";

@Component({
    selector: 'dr-user-register-org-page',
    templateUrl: './register-org-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
export class RegisterOrgPageComponent {

  readonly formState$: Observable<FormState>;
  fields: Field[];

  constructor(
    private readonly store: Store<RegisterOrgFormStore>
  )
  {

    this.formState$ = store.select(selectFormSubState);

    this.fields = [
      {
        kind: 'TextField' as 'TextField',
        id: 'orgName',
        label: 'Название Организации',
        validation: { required : true }
      }/*,
      {
        kind: 'TextField' as 'TextField',
        id: 'lastName',
        label: 'Фамилия Владельца',
        validation: { required : true }
      },
      {
        kind: 'TextField' as 'TextField',
        id: 'firstName',
        label: 'Имя Владельца',
        validation: { required : true }
      },
      {
        kind: 'TextField' as 'TextField',
        id: 'middleName',
        label: 'Очество Владельца',
        validation: { required : true }
      },
      {
        kind: 'TextField' as 'TextField',
        id: 'email',
        label: 'Email',
        validation: { required : true }
      },
      {
        kind: 'TextField' as 'TextField',
        id: 'phone',
        label: 'Телефон',
        validation: { required : true }
      },
      {
        kind: 'TextField' as 'TextField',
        id: 'password',
        label: 'Пароль',
        validation: { required : true }
      },
      {
        kind: 'TextField' as 'TextField',
        id: 'password2',
        label: 'Повторите пароль',
        validation: { required : true }
      }*/
    ];


  }

  onAction(action: FormAction) {
    this.store.dispatch(subFormAction(action));
  }

  onCancel() {

  }

}
