import { Location, PlatformLocation } from '@angular/common';
import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { filter, map, tap } from 'rxjs/operators';
import * as fromActions from './actions';

//
// tslint:disable-next-line:no-submodule-imports
import { Observable } from 'rxjs/Observable';
export { Observable };
import { always, pipe, when } from 'ramda';

const getBaseHref = platformLocation =>
  pipe(
    when(x => !x || x === '/', always(window.location.origin)),
    (str: string) => str.replace(/\/$/, '')
  )(platformLocation.getBaseHrefFromDOM());

const mapQs = obj => {
  const params = new URLSearchParams();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.set(key, obj[key]);
    }
  }
  return params.toString();
};

export type NavigationExtras = any;
export interface IRouter {
  navigate(commands: any[], extras: NavigationExtras);
}

@Injectable()
export class RouterEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly router: IRouter,
    private readonly platformLocation: PlatformLocation
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    filter(fromActions.isGoAction),
    map(action => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  blank$ = this.actions$.pipe(
    filter(fromActions.isGoBlankAction),
    map(action => action.payload),
    tap(({ path, query }) => {
      const paths = path.join('/');
      const querys = mapQs(query);
      window.open(
        `${getBaseHref(this.platformLocation)}${paths ? '/' + paths : ''}${
          querys ? '?' + querys : ''
        }`,
        '_blank'
      );
    })
  );

  @Effect({ dispatch: false })
  silent$ = this.actions$.pipe(
    filter(fromActions.isGoSilentAction),
    map(action => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      // const paths = path.join('/');
      // const querys = mapQs(queryParams);
      // this.location.go(this.location.prepareExternalUrl(paths), querys);
      // TODO: this is not silent, locatio.go doesn't update router store !
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.pipe(
    filter(fromActions.isBackAction),
    tap(() => this.platformLocation.back())
  );

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.pipe(
    filter(fromActions.isForwardAction),
    tap(() => this.platformLocation.forward())
  );
}
