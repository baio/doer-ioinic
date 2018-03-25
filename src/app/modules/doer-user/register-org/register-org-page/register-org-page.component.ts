import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { Field } from "../../../../libs/doer-ionic-core";

@Component({
    selector: 'dr-user-register-org-page',
    templateUrl: './register-org-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
export class RegisterOrgPageComponent {

  fields: Field[];

  constructor() {
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
    ]
  }

}
