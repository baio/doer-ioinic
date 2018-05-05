import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IonicPage } from 'ionic-angular';
import { ionicGoAction } from '@doer/ionic-core';
import {
  Principal,
  AuthStore,
  selectPrincipal,
  logoutAction
} from '@doer/ngx-core';
import { CameraService } from '@doer/native';
import { map, merge, filter, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { equals } from 'ramda';

@IonicPage({ name: 'profile' })
@Component({
  selector: 'dr-user-profile-page',
  templateUrl: './profile-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent {

  readonly avatar$: Observable<SafeUrl>;
  readonly justTakenPhoto$ =new Subject<string>();

  readonly principal$: Observable<Principal>;


  constructor(
    private readonly store: Store<AuthStore>,
    private readonly camera: CameraService,
    private readonly domSanitizer: DomSanitizer
  ) {
    this.principal$ = store.select(selectPrincipal);

    this.avatar$ = this.principal$
      .pipe(
        filter(x => !!x),
        map(p => p.avatar),
        merge(this.justTakenPhoto$),
        distinctUntilChanged(),
        map(x => domSanitizer.bypassSecurityTrustUrl(x))
      );

      this.avatar$.subscribe(res => {
        console.log('+++', JSON.stringify(res, null, 2));

      });

  }

  onLogout() {
    this.store.dispatch(logoutAction());
  }

  onChangePhoto() {
    this.camera.takePhoto().then(x =>
      this.justTakenPhoto$.next(x)
    );
  }
}
