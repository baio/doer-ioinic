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
      }
    ]
  }

}
