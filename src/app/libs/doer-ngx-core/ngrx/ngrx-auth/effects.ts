import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { AuthService } from "../../auth/auth.service";
import * as A from "./actions";
import { filter, mapTo, tap, map, flatMap } from "rxjs/operators";
import { filterMap$, getPayload, ofPromiseR$ } from "../../../doer-core";
import { pipe } from "ramda";

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService
  ) {}

  @Effect()
  login$ = this.actions$.pipe(
    filterMap$(A.isLoginAction)(getPayload),
    flatMap(pipe(this.authService.login, ofPromiseR$)),
    // serve only for errors
    map(A.loginResultAction)
  );

  @Effect()
  logout$ = this.actions$.pipe(
    filter(A.isLogoutAction),
    tap(this.authService.logout),
    mapTo(A.logoutResultAction())
  );


}
