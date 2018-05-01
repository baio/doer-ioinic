import { Injectable, Inject } from '@angular/core';
import { AuthService, AUTH_SERVICE_CONFIG } from './auth.service';
import { Principal, Tokens } from './auth.types';
import * as A0 from 'auth0-js';
import * as jwt from 'jsonwebtoken';
import { path, tap, always, equals } from 'ramda';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged, mergeMap, flatMap } from 'rxjs/operators';
import { err, Result } from '../../doer-core';
import { of } from 'rxjs/Observable/of';
import { timer } from 'rxjs/observable/timer';

export interface Auth0Config {
  clientID: string;
  domain: string;
  audience: string;
  redirectUri: string;
}

// https://auth0.com/docs/quickstart/spa/angular2/01-login
// https://auth0.github.io/auth0.js/global.html#login
// https://auth0.com/docs/libraries/auth0js/v9

const profile2Principal = (profile: A0.AdfsUserProfile): Principal => ({
  id: profile.sub,
  name: profile['https://doer.auth.com/name'],
  avatar: profile.picture
});

@Injectable()
export class Auth0Service extends AuthService {

  private refreshSub: any;
  private readonly auth0: A0.WebAuth;
  private readonly principal$ = new BehaviorSubject<Principal | null>(null);

  constructor(@Inject(AUTH_SERVICE_CONFIG) private readonly config: Auth0Config) {
    super();
    this.auth0 = new A0.WebAuth({
      clientID: config.clientID,
      domain: config.domain,
      responseType: 'token id_token',
      audience: config.audience,
      redirectUri: config.redirectUri,
      scope: 'openid profile',
    });
  }

  get isAuthenticated(): boolean {
    return !!localStorage.getItem('id_token');
  }

  /**
   * if user not logined returns null
   */
  get isExpired(): boolean | null {
    const expiredAtStr = localStorage.getItem('expires_at');
    if (!expiredAtStr) {
      return null;
    }
    const expiresAt = JSON.parse(expiredAtStr);
    return new Date().getTime() < expiresAt;
  }

  get principal(): Observable<Principal | null> {
    return this.principal$.pipe(distinctUntilChanged(equals)) as any;
  }

  get token(): string | null {
    return this.isExpired ? null : localStorage.getItem('access_token');
  }

  login = info => {
    return new Promise((resove, reject) =>
      // never resolve since login will redirect user to a new page
      this.auth0.login(
        {
          email: 'max-3@gmail.com',
          password: 'Password-org-3',
          realm: 'Username-Password-Authentication',
          prompt: 'none'
        } as any,
        err => {
          // TODO : handle error !
          reject(err);
        }
      )
    );
  };

  updatePrincipal = (tokens: A0.Auth0DecodedHash): Principal => {
    const principal = profile2Principal(tokens.idTokenPayload);
    this.updateStorage(tokens);
    this.principal$.next(principal);
    return principal;
  };

  logout = (): void => {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.unscheduleRenewal();
    this.principal$.next(null);
    this.auth0.logout({ returnTo: this.config.redirectUri});
  };

  private updateStorage = (hash: A0.Auth0DecodedHash): void => {
    const expiresAt = JSON.stringify(
      hash.expiresIn * 1000 + new Date().getTime()
    );

    localStorage.setItem('nonce', hash.idTokenPayload.nonce);
    localStorage.setItem('access_token', hash.accessToken);
    localStorage.setItem('id_token', hash.idToken);
    localStorage.setItem('expires_at', expiresAt);
  };

  //
  private parseHashAsync = (): Promise<Tokens> =>
    new Promise((resolve, reject) =>
      this.auth0.parseHash((err, authResult) => {
        if (err) {
          reject(err);
        } else if (authResult && authResult.accessToken && authResult.idToken) {
          resolve(authResult as any);
        } else {
          reject(new Error('Auth: Required tokens not found'));
        }
      })
    );

  private tryLoginFromLocal = (): Promise<Principal | null> => {
    if (this.isExpired && localStorage.getItem('nonce')) {
      return new Promise(resolve => {
        this.auth0.validateToken(
          localStorage.getItem('id_token'),
          localStorage.getItem('nonce'),
          (err, res) => {
            if (err) {
              resolve(null);
            } else {
              resolve(profile2Principal(res));
            }
          }
        );
      });
    } else {
      return Promise.resolve(null);
    }
  };

  public handleAuthentication = () =>
    this.tryLoginFromLocal()
      .then(res =>{
          if (res) {
            //loginned from stored session
            return { principal: res, fromCallback: false };
          } else {
            // try to pase hash with auth if esixsts
            return this.parseHashAsync()
                .then(this.updatePrincipal)
                .then(res => ({ principal: res, fromCallback: true }));
          }
      })
      .then(res => {
        // user logined, schedule renewal
        this.scheduleRenewal();
        return res;
      })
      .catch(() => Promise.resolve(null));

  // token renewal

  private renewTokenAsync = (): Promise<A0.Auth0DecodedHash> => {
    console.log('renewal started');
    return new Promise((resolve, reject) => this.auth0.checkSession({}, (err, result) => {
      console.log('renewTokenAsync', !!result);
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result)
      }
    }));
  }

  private scheduleRenewal() {

    console.log('schedule renewal');

    this.unscheduleRenewal();

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

    const expiresIn$ = of(expiresAt).pipe(
      mergeMap(
        expiresAt => {
          const now = Date.now();
          // Use timer to track delay until expiration
          // to run the refresh at the proper time
          return timer(Math.max(1, expiresAt - now));
        }
      )
    );

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSub = expiresIn$.pipe(
        flatMap(this.renewTokenAsync)
      ).subscribe(result => {
        this.updateStorage(result);
        this.scheduleRenewal();
      }
    );
  }

  private unscheduleRenewal() {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }

}
