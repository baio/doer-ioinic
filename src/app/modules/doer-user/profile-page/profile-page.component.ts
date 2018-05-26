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
import { IonicPage, normalizeURL } from 'ionic-angular';
import { ionicGoAction } from '@doer/ionic-core';
import {
  Principal,
  AuthStore,
  selectPrincipal,
  logoutAction
} from '@doer/ngx-core';
import { CameraService, UploadFileService } from '@doer/native';
import { map, merge, filter, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { equals } from 'ramda';
import { goAction } from '../../../libs/doer-ngx-core/ngrx/ngrx-router/actions';
import { updateUserAvatarAction } from '../store/users';

@IonicPage({ name: 'profile', segment: 'profile' })
@Component({
  selector: 'dr-user-profile-page',
  templateUrl: './profile-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent {

  readonly avatar$: Observable<SafeUrl>;
  readonly principal$: Observable<Principal>;

  constructor(
    private readonly store: Store<AuthStore>,
    private readonly camera: CameraService,
    private readonly uploadFile: UploadFileService,
    private readonly domSanitizer: DomSanitizer
  ) {
    this.principal$ = store.select(selectPrincipal);

    this.avatar$ = this.principal$
      .pipe(
        filter(x => !!x),
        map(p => p.avatar),
        distinctUntilChanged(),
        map(x => domSanitizer.bypassSecurityTrustResourceUrl(x))
      );

  }

  onLogout() {
    this.store.dispatch(logoutAction());
  }

  onChangePhoto() {
    this.store.dispatch(updateUserAvatarAction());
  }

  onAddWorker() {
    this.store.dispatch(ionicGoAction({ name : 'create-worker' }));
  }

  onShowWorkers() {
    this.store.dispatch(ionicGoAction({ name : 'workers-list' }));
  }

}
