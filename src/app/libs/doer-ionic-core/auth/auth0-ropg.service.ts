// Resource owner password grant
// For cordova apps (required refresh token stored safely)
// https://auth0.com/docs/api-auth/grant/password
import { Injectable, Inject } from '@angular/core';
import * as A0 from 'auth0-js';
import * as jwt from 'jsonwebtoken';
import { path, tap, always, equals } from 'ramda';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged, mergeMap, flatMap } from 'rxjs/operators';
import { err, Result, isOK } from '../../doer-core';
import { of } from 'rxjs/Observable/of';
import { timer } from 'rxjs/observable/timer';
import { Principal, AuthService, AUTH_SERVICE_CONFIG, Tokens, HttpService } from '../../doer-ngx-core';

export interface Auth0Config {
  clientID: string;
  domain: string;
  audience: string;
  redirectUri: string;
}

// https://auth0.com/docs/quickstart/spa/angular2/01-login
// https://auth0.github.io/auth0.js/global.html#login
// https://auth0.com/docs/libraries/auth0js/v9

interface LoginResult {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}

const profile2Principal = (profile: A0.AdfsUserProfile): Principal => ({
  id: profile.sub,
  name: profile['https://doer.auth.com/name'],
  avatar: profile.picture
});

@Injectable()
export class Auth0ROPGService extends AuthService {

  private readonly auth0: A0.WebAuth;
  refreshSub: any;
  private readonly principal$ = new BehaviorSubject<Principal | null>(null);

  constructor(@Inject(AUTH_SERVICE_CONFIG) private readonly config: Auth0Config, private readonly httpService: HttpService) {
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

  private updatePrincipal = (tokens: A0.AdfsUserProfile): Principal => {
    const principal = profile2Principal(tokens);
    this.principal$.next(principal);
    return principal;
  };

  login = info =>
      this.httpService.post<LoginResult>('login', {email: 'max-3@gmail.com', password: 'Password-org-3'})
      .toPromise()
      .then(x => isOK(x) ? Promise.resolve(x.value) : Promise.reject(x.error))
      .then(tokens => this.validateTokenAsync(tokens.idToken).then(profile => ({ profile,  tokens})))
      .then(({ profile,  tokens }) => {
        console.log('+++', profile, tokens);
        this.updateStorage(1, tokens);
        return this.updatePrincipal(profile);
      });

  logout = (): void => {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // this.unscheduleRenewal();
    this.principal$.next(null);
    // ???
  };

  private updateStorage = (expiresIn: number, res: LoginResult): void => {
    const expiresAt = JSON.stringify(
      expiresIn * 1000 + new Date().getTime()
    );

    localStorage.setItem('refresh_token', res.refreshToken);
    localStorage.setItem('access_token', res.accessToken);
    localStorage.setItem('id_token', res.idToken);
    localStorage.setItem('expires_at', expiresAt);
  };

  //

  /*
  private tryLoginFromLocalAsync = (): Promise<Principal | null> => {
    if (!this.isExpired) {
      return this.validateTokenAsync(localStorage.getItem('id_token'));
    } else {
      return Promise.resolve(null);
    }
  };
  */


  private validateTokenAsync = (token): Promise<A0.AdfsUserProfile | null> => {
      return new Promise((resolve, reject) => {
        this.auth0.validateToken(
          token,
          null,
          (err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          }
        );
      });
  }

  public handleAuthentication = () => Promise.resolve(null);
    /*
    this.tryLoginFromLocalAsync()
      .then(res =>{
          if (res) {
            //loginned from stored session
            return { principal: res, fromCallback: false };
          } else {
            // try to login from refresh token
            this.renewTokenAsync()

            .then(res => ({ principal: res, fromCallback: false }));
          }
      })
      .then(res => {
        // user logined, schedule renewal
        this.scheduleRenewal();
        return res;
      })
      .catch(() => Promise.resolve(null));
      */

  // token renewal

  /*
  private renewTokenAsync = (): Promise<A0.Auth0DecodedHash> => {
    console.log('renewal started');
    if (localStorage.getItem('refresh_token')) {
      this.httpService.post('refersh-token', {token: localStorage.getItem('refresh_token')}).toPromise().then(
        res =>
      )
    } else {
      return Promise.reject('refresh_token not found')
    }
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
  */

}
