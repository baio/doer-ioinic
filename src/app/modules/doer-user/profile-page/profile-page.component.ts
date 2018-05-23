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
    private readonly uploadFile: UploadFileService,
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

  }

  onLogout() {
    this.store.dispatch(logoutAction());
  }

  async onChangePhoto() {
    try {

      const path = await this.camera.takePhoto();
      this.justTakenPhoto$.next(path);
      const uplodResult = await this.uploadFile.uploadFile(path);
      console.log('suc', JSON.stringify(uplodResult, null, 2));
    } catch (err) {
      console.log('err', JSON.stringify(err, null, 2));
    }
  }

  onAddWorker() {
    this.store.dispatch(ionicGoAction({ name : 'create-worker' }));
  }

}
