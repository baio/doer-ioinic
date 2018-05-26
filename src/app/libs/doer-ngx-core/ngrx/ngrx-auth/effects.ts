import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { AuthService } from "../../auth/auth.service";
import * as A from "./actions";
import { filter, mapTo, tap, map, flatMap, withLatestFrom } from "rxjs/operators";
import { filterMap$, getPayload, ofPromiseR$, ok } from "../../../doer-core";
import { pipe } from "ramda";
import { AuthStore } from "./ngrx-auth.types";
import { Store } from "@ngrx/store";
import { selectPrincipal } from "./selectors";
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly store: Store<AuthStore>,
    private readonly storage: Storage
  ) {}

  @Effect()
  login$ = this.actions$.pipe(
    filterMap$(A.isLoginAction)(getPayload),
    flatMap(pipe(this.authService.login, ofPromiseR$)),
    // serve only for errors
    map(A.loginResultAction)
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

  // sync local principal with token principal
  // during session principal data could be updated but token stays the same, sync it
  @Effect({dispatch: false})
  avatarChanged$ = this.actions$.pipe(
    filterMap$(A.isSetAvatarAction)(getPayload),
    withLatestFrom(this.store.select(selectPrincipal), (avatar, principal) => ({
      ...principal, avatar
    })),
    // store principal locally / restore on app start
    flatMap(x => {
      console.log('!!!', x);
      return this.storage.set('principal', x);
    })
  );



}
