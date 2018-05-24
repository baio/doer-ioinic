import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { UsersService } from './data';
import { filterMap$, getPayload } from '@doer/core';
import * as A from './actions';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class Effects {
  constructor(
      private readonly actions$: Actions,
      private readonly usersService: UsersService
  ) {}

  @Effect()
  load$ = this.actions$.pipe(
    filterMap$(A.isLoadUsersAction)(getPayload),
    switchMap(this.usersService.load),
    map(A.loadUsersResultAction)
  );

}
