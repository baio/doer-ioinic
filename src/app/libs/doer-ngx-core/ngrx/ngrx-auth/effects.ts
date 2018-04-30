import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { AuthService } from "../../auth/auth.service";
import * as A from "./actions";
import { filter, mapTo, tap } from "rxjs/operators";

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService
  ) {}


  @Effect()
  logout$ = this.actions$.pipe(
    filter(A.isLogoutAction),
    tap(this.authService.logout),
    mapTo(A.logoutResultAction())
  );


}
