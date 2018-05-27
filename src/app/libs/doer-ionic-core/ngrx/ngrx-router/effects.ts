import { Location, PlatformLocation } from '@angular/common';
import { Injectable, Injector } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { NavController, App } from 'ionic-angular';
import { filter, map, tap } from 'rxjs/operators';
import { isIonicGoAction, isIonicBackAction } from './actions';

@Injectable()
export class RouterEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly app: App
  ) {}

  private get navController() { return this.app.getActiveNav(); }

  @Effect({ dispatch: false })
  go$ = this.actions$.pipe(
    filter(isIonicGoAction),
    map(action => action.payload),
    tap(({ name, id, animate }) => {
      this.navController.push(name, id ? { id } : undefined, { animate });
    })
  );

  @Effect({ dispatch: false })
  back$ = this.actions$.pipe(
    filter(isIonicBackAction),
    tap(() => {
      this.navController.pop();
    })
  );


}
