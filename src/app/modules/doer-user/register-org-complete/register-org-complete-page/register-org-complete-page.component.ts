import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { Field } from "../../../../libs/doer-ionic-core";
import { Store } from "@ngrx/store";
// import { RegisterOrgFormStore, RegisterOrgFormState } from "../register-org-complete.types";
import { Observable } from "rxjs/Observable";
// import { selectFormSubState, subFormAction } from "../store";
// import { FormState, FormAction } from "../../../../libs/doer-ngx-core";
import { IonicPage } from "ionic-angular";

@IonicPage({name: 'register-org-complete'})
@Component({
    selector: 'dr-user-register-org-complete-page',
    templateUrl: './register-org-complete-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
export class RegisterOrgCompletePageComponent {

  constructor(
  ) {}

  onUploadPhoto() {}

  onContinue() {}


}
