import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { IonicPage } from "ionic-angular";
import { ionicGoAction } from "../../../libs/doer-ionic-core";


@Component({
    selector: 'dr-authorizing-page',
    templateUrl: './authorizing-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
export class AuthorizingPageComponent {

  constructor() {}

}
