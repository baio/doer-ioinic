import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { repeat } from 'ramda';
import { UsersListStore, UsersList, selectWorkers, selectUser, User, addWorkerPhotoAction } from '../store/users';
import { ionicGoAction } from '@doer/ionic-core';


@IonicPage({ name: 'worker', segment: 'workers/:id' })
@Component({
  selector: 'dr-user-worker-page',
  templateUrl: './worker-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerPageComponent {

  readonly user$: Observable<User>;

  constructor(navParams: NavParams, private readonly store: Store<UsersListStore>) {
    this.user$ = store.select(selectUser(navParams.get('id')));
  }

  onAddWorkerPhoto(userId: string, $event) {
    console.log('+++', $event);
    this.store.dispatch(addWorkerPhotoAction(userId));
  }

}
