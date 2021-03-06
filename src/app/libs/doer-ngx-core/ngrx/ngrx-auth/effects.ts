import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { AuthService } from '../../auth/auth.service';
import * as A from './actions';
import {
  filter,
  mapTo,
  tap,
  map,
  flatMap,
  withLatestFrom
} from 'rxjs/operators';
import { filterMap$, getPayload, ofPromiseR$, ok, isOK, isErr } from '@doer/core';
import { pipe, omit, isNil, not, prop } from 'ramda';
import { AuthStore } from './ngrx-auth.types';
import { Store } from '@ngrx/store';
import { selectPrincipal } from './selectors';
import { StorageService } from '../../storage.service';
import { ToastrService } from '../../toastr.service';


@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly store: Store<AuthStore>,
    private readonly storage: StorageService,
    private readonly toastr: ToastrService
  ) {}

  @Effect()
  login$ = this.actions$.pipe(
    filterMap$(A.isLoginAction)(getPayload),
    flatMap(pipe(this.authService.login, ofPromiseR$)),
    map(A.loginResultAction)
  );

  @Effect({dispatch: false})
  loginFails$ = this.actions$.pipe(
    filterMap$(A.isLoginResultAction)(getPayload),
    filterMap$(isErr)(prop('error')),
    tap(x => {
      this.toastr.show({ type: 'error', title: 'Ошибка авторизации', text: x['msg'] });
    })
  );

  @Effect()
  loginFromTokens$ = this.actions$.pipe(
    filterMap$(A.isLoginFromTokensAction)(getPayload),
    flatMap(pipe(this.authService.loginFromTokens, ofPromiseR$)),
    // serve only for errors
    map(A.loginResultAction)
  );

  @Effect()
  logout$ = this.actions$.pipe(
    filter(A.isLogoutAction),
    tap(this.authService.logout),
    mapTo(A.logoutResultAction(ok(null)))
  );

  @Effect()
  avatarChanged$ = this.actions$.pipe(
    filter(A.isSetAvatarAction),
    map(() => A.storePrincipalAction())
  );

  @Effect({ dispatch: false })
  storePrincipal$ = this.actions$.pipe(
    filter(A.isStorePrincipalAction),
    withLatestFrom(this.store.select(selectPrincipal), (avatar, principal) => principal),
    flatMap(x => {
      return this.storage.set('principal', omit(['id'], x));
    })
  );

  @Effect()
  restorePrincipal$ = this.actions$.pipe(
    filter(A.isRestorePrincipalAction),
    flatMap(x => {
      return this.storage.get('principal');
    }),
    filter(pipe(isNil, not)),
    map(A.setPrincipalDataAction)
  );
}
