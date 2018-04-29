import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { IonicPage } from "ionic-angular";
import { ionicGoAction } from "../../../libs/doer-ionic-core";

@IonicPage({name: 'home'})
@Component({
    selector: 'dr-user-home-page',
    templateUrl: './home-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
export class HomePageComponent {

  constructor(private readonly store: Store<any>
  ) {}

  onLogin() {
    this.store.dispatch(ionicGoAction({name: 'login'}))
  }

  onRegisterNewOrg() {
    this.store.dispatch(ionicGoAction({name: 'register-org'}))
  }

}
