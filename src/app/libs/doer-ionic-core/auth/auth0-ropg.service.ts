// Resource owner password grant
// For cordova apps (required refresh token stored safely)
// https://auth0.com/docs/api-auth/grant/password
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as A0 from 'auth0-js';
import * as jwt from 'jsonwebtoken';
import { path, tap, always, equals } from 'ramda';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged, mergeMap, flatMap } from 'rxjs/operators';
import { err, Result, isOK } from '../../doer-core';
import { of } from 'rxjs/Observable/of';
import { timer } from 'rxjs/observable/timer';
import {
  Principal,
  AuthService,
  AUTH_SERVICE_CONFIG,
  Tokens,
  HttpService,
  HTTP_CONFIG,
  HttpConfig,
  Auth0Config
} from '../../doer-ngx-core';
import { validateToken } from '../../doer-ngx-core/auth/auth0';
import { Storage } from '@ionic/storage';
import { fromPromise } from 'rxjs/observable/fromPromise';

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
  avatar: profile['https://doer.auth.com/avatar'] || profile.picture
});

/**
 * Integrates auth0 (resource onwer password grant flow)[https://auth0.com/docs/api-auth/tutorials/password-grant]
 * Could be work both in SPA and ionic, but the flow suppose to store refresh_token safely, which could not be done in web
 * apps. Use it for Ionic app.
 * Auth enpoint must provide following api:
 * [POST] login (payload : {email: string, password: string})
 * [POST] refresh-token (payload : {token: string})
 */
@Injectable()
export class Auth0ROPGService extends AuthService {
  private readonly auth0: A0.WebAuth;
  refreshSub: any;
  private readonly principal$ = new BehaviorSubject<Principal | null>(null);
  private readonly validateToken: (
    token: string
  ) => Promise<A0.AdfsUserProfile>;

  constructor(
    @Inject(HTTP_CONFIG) private readonly httpConfig: HttpConfig,
    @Inject(AUTH_SERVICE_CONFIG) private readonly config: Auth0Config,
    private readonly httpClient: HttpClient,
    private readonly storage: Storage
  ) {
    super();
    this.auth0 = new A0.WebAuth({
      clientID: config.clientID,
      domain: config.domain,
      responseType: 'token id_token',
      audience: config.audience,
      redirectUri: config.redirectUri,
      scope: 'openid profile'
    });

    this.validateToken = validateToken(config);
  }

  private getItem(key: string): Promise<string> {
    return this.storage.get(key);
  }

  private setItem(key: string, val: string) {
    this.storage.set(key, val);
  }

  private removeItem(key: string) {
    this.storage.remove(key);
  }

  get isAuthenticated(): Promise<boolean> {
    return this.getItem('id_token').then(x => !!x);
  }

  get expiresAt(): Promise<number | null> {
    return this.getItem('expires_at').then(x => (x ? +x : null));
  }

  /**
   * if user not logined returns null
   */
  get isExpired(): Promise<boolean | null> {
    return this.expiresAt.then(expiresAt => {
      return new Date().getTime() > expiresAt;
    });
  }

  get principal(): Observable<Principal | null> {
    return this.principal$.pipe(distinctUntilChanged(equals)) as any;
  }

  get token(): Promise<string | null> {
    return this.isExpired.then(x => (x ? null : this.getItem('access_token')));
  }

  private updatePrincipal = (tokens: A0.AdfsUserProfile): Principal => {
    const principal = profile2Principal(tokens);
    this.principal$.next(principal);
    return principal;
  };

  private post<T>(path: string, payload: any): Promise<T> {
    return this.httpClient
      .post<T>(`${this.httpConfig.baseUrl}${path}`, payload)
      .toPromise();
  }

  private completeLogin = (isRefresh: boolean) => (
    tokens: LoginResult
  ): Promise<Principal> =>
    this.validateToken(tokens.idToken)
      .then(profile => ({ profile, tokens }))
      .then(({ profile, tokens }) => {
        this.updateStorage(isRefresh, profile['exp'], tokens);
        return this.updatePrincipal(profile);
      });

  login = info =>
    this.post<LoginResult>('login', info).then(this.completeLogin(false) as any) as any;

  loginFromTokens = (tokens: Tokens): Promise<Principal> => {
    return this.completeLogin(false)(tokens).catch(x => {
      return Promise.reject(x);
    });
  }


  logout = (): void => {
    this.removeItem('id_token');
    this.removeItem('access_token');
    this.removeItem('refresh_token');
    this.removeItem('expires_at');

    this.unscheduleRenewal();
    this.principal$.next(null);
    // ???
  };

  private updateStorage = (
    isRefresh: boolean,
    expiresIn: number,
    res: LoginResult
  ): void => {
    const expiresAt = JSON.stringify(expiresIn * 1000);
    if (!isRefresh) {
      this.setItem('refresh_token', res.refreshToken);
    }
    this.setItem('id_token', res.idToken);
    this.setItem('access_token', res.accessToken);
    this.setItem('expires_at', expiresAt);
  };

  private tryLoginFromLocalAsync = (): Promise<A0.AdfsUserProfile | null> => {
    return this.isExpired.then(
      isExpired =>
        !isExpired
          ? this.getItem('id_token').then(this.validateToken)
          : Promise.reject('IdToken not exists or expired')
    );
  };

  public handleAuthentication = () =>
    this.tryLoginFromLocalAsync()
      .then(profile => {
        //loginned from stored session
        return { principal: profile2Principal(profile), fromStored: true };
      })
      .catch(() =>
        // try to login using refresh_token
        this.refreshTokenAsync()
          .then(this.completeLogin(true))
          .then(principal => ({ principal, fromStored: false }))
      )
      .then(res => {
        // user logined, schedule renewal
        this.scheduleRenewal();
        return res;
      })
      .catch(err => {
        console.log(err);
        return Promise.resolve(null);
      });

  // token renewal

  private refreshTokenAsync = (): Promise<LoginResult> =>
    this.getItem('refresh_token').then(
      token =>
        token
          ? this.post<LoginResult>('refresh-token', { token })
          : Promise.reject('refresh_token not found')
    );


  private scheduleRenewal() {

    this.unscheduleRenewal();

    const expiresIn$ = fromPromise(this.expiresAt).pipe(
      mergeMap(expiresAt => {
        const now = new Date().getTime();
        // Use timer to track delay until expiration
        // to run the refresh at the proper time
        const renewalTime = Math.max(1, expiresAt - now);
        console.log(`schedule renewal in ${renewalTime} ms`);
        return timer(renewalTime);
      })
    );

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSub = expiresIn$
      .pipe(
        flatMap(() =>
          this.refreshTokenAsync().then(tokens =>
            this.validateToken(tokens.idToken).then(profile => ({
              profile,
              tokens
            }))
          )
        )
      )
      .subscribe(({ profile, tokens }) => {
        this.updateStorage(true, profile['exp'], tokens);
        this.scheduleRenewal();
      });
  }

  private unscheduleRenewal() {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }
}
