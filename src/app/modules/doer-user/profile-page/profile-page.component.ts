import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { IonicPage } from "ionic-angular";
import { ionicGoAction } from "../../../libs/doer-ionic-core";
import { Principal, AuthStore, selectPrincipal, logoutAction } from "../../../libs/doer-ngx-core";

@IonicPage({name: 'profile'})
@Component({
    selector: 'dr-user-profile-page',
    templateUrl: './profile-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
export class ProfilePageComponent {

  private readonly principal$: Observable<Principal>;

  constructor(private readonly store: Store<AuthStore>)
  {
    this.principal$ = store.select(selectPrincipal);

  }

  onLogout() {
    this.store.dispatch(logoutAction())
  }

}
