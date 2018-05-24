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
import { IonicPage } from 'ionic-angular';
import { repeat } from 'ramda';
import { UsersListStore, UsersList, selectWorkers } from '../store/users';
import { ionicGoAction } from '@doer/ionic-core';


@IonicPage({ name: 'workers-list' })
@Component({
  selector: 'dr-user-workers-list-page',
  templateUrl: './workers-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersListPageComponent {

  readonly list$: Observable<UsersList>;

  constructor(private readonly store: Store<UsersListStore>) {
    this.list$ = store.select(selectWorkers);
  }

  trackBy = (index, item) => {
    return index;
  }

  onShow(id: string) {
    this.store.dispatch(ionicGoAction({name: 'worker-page', id }));
  }

}
