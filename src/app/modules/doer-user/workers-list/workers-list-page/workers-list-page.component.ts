import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Field, ionicGoAction } from '../../../../libs/doer-ionic-core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormState, FormAction } from '../../../../libs/doer-ngx-core';
import { IonicPage } from 'ionic-angular';
import { repeat } from 'ramda';
import { UsersListStore, UsersList, selectWorkers } from '../../store/users';


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
    this.store.dispatch(ionicGoAction({name: 'worker', id }));
  }

}
