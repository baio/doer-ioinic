import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): Promise<boolean> | boolean {

    /*
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    */
    return this.auth.handleAuthentication().then(x => !!x).catch(() => Promise.resolve(true));
  }

}