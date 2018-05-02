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
import { Principal, AuthService, AUTH_SERVICE_CONFIG, Tokens, HttpService, HTTP_CONFIG, HttpConfig, Auth0Config } from '../../doer-ngx-core';
import { validateToken } from '../../doer-ngx-core/auth/auth0';



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
  private readonly validateToken: (token: string) => Promise<A0.AdfsUserProfile>;

  constructor(
    @Inject(HTTP_CONFIG) private readonly httpConfig: HttpConfig,
    @Inject(AUTH_SERVICE_CONFIG) private readonly config: Auth0Config,
    private readonly httpClient: HttpClient
  ) {
    super();
    this.auth0 = new A0.WebAuth({
      clientID: config.clientID,
      domain: config.domain,
      responseType: 'token id_token',
      audience: config.audience,
      redirectUri: config.redirectUri,
      scope: 'openid profile',
    });

    this.validateToken = validateToken(config);
  }

  get isAuthenticated(): boolean {
    return !!localStorage.getItem('id_token');
  }

  /**
   * if user not logined returns null
   */
  get isExpired(): boolean | null {
    const expiresAt = +localStorage.getItem('expires_at');
    return new Date().getTime() > expiresAt;
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

  private post<T>(path: string, payload: any): Promise<T> {
    return this.httpClient.post<T>(`${this.httpConfig.baseUrl}${path}`, payload).toPromise();
  }

  private completeLogin = (isRefresh: boolean) => (tokens: LoginResult): Promise<Principal> =>
    this.validateToken(tokens.idToken)
    .then(profile => ({ profile,  tokens}))
    .then(({ profile,  tokens }) => {
      this.updateStorage(isRefresh, profile['exp'], tokens);
      return this.updatePrincipal(profile);
    });

  login = info =>
      this.post<LoginResult>('login', {email: 'max-3@gmail.com', password: 'Password-org-3'})
      .then(this.completeLogin(false) as any) as any

  logout = (): void => {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_at');

    this.unscheduleRenewal()
    this.principal$.next(null);
    // ???
  };

  private updateStorage = (isRefresh: boolean, expiresIn: number, res: LoginResult): void => {
    const expiresAt = JSON.stringify(
      expiresIn * 1000 + new Date().getTime()
    );

    if (!isRefresh) {
      localStorage.setItem('refresh_token', res.refreshToken);
    }
    localStorage.setItem('id_token', res.idToken);
    localStorage.setItem('access_token', res.accessToken);
    localStorage.setItem('expires_at', expiresAt);
  };

  private tryLoginFromLocalAsync = (): Promise<A0.AdfsUserProfile | null> => {
    if (!this.isExpired) {
      return this.validateToken(localStorage.getItem('id_token'));
    } else {
      return Promise.reject('IdToken not exists or expired');
    }
  };


  public handleAuthentication = () =>
    this.tryLoginFromLocalAsync()
      .then(profile => {
          //loginned from stored session
          return { principal: profile2Principal(profile), fromStored: true };
      })
      .catch(() =>
        // try to login using refresh_token
        this.refreshTokenAsync().then(this.completeLogin(true))
      )
      .then(res => {
        // user logined, schedule renewal
        this.scheduleRenewal();
        return res;
      })
      .catch((err) => {
        console.log(err);
        return Promise.resolve(null);
      });


  // token renewal


  private refreshTokenAsync = (): Promise<LoginResult> => {
    const token = localStorage.getItem('refresh_token');
    if (token) {
      return this.post('refresh-token', {token});
    } else {
      return Promise.reject('refresh_token not found')
    }
  }

  private scheduleRenewal() {

    console.log('schedule renewal');

    this.unscheduleRenewal();

    const expiresAt = +localStorage.getItem('expires_at');

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
        flatMap(() =>
          this.refreshTokenAsync().then(tokens =>
            this.validateToken(tokens.idToken).then(profile => ({ profile,  tokens}))
          )
        )
      ).subscribe(({profile, tokens}) => {
        this.updateStorage(true, profile['exp'], tokens);
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
