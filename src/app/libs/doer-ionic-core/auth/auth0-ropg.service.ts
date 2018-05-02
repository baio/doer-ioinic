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
import { Principal, AuthService, AUTH_SERVICE_CONFIG, Tokens, HttpService, HTTP_CONFIG, HttpConfig } from '../../doer-ngx-core';
import  * as V from 'idtoken-verifier';

class Cashe1 {
  get() {
    console.log('xxxx');
    return {
      exp: '010001',
      modulus: 'e28d34a0d37ce72681dcf056fbda092b48eadea6518554cb3c0f994018e37f9c586d514e024a04d5e93cd5e3778ef26032e81c5b339854abe1ee4b6787280e02133f9865f677bb26a4336d8bd0071ae1fe6aa1f5aeec7560e4891479b7b6903f1aea60f55487289c15ae6e2071a7f413c44f5f638664a51c4c984234811f73ea7a4d2b0ff4819c6ac62d2cb4258e14453bce182c010b4eca7706bc9be6337824bad17911411416777b3d012101d4d4293b7c80476774c9085a2d93a1601b788dbe65f7a2667f9b097d5e6fe580ee2c87368bb6ad442484b00246d295384c6b8ff95e10819eb69c930d4709aae93b1a7d3e4de032226b1bd30eb4c90507752f2f'
    }
  }

  has() {
    console.log('yyyy');
    return true;
  }

  set(key, x) {
    console.log('888', x);
  }
}

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

    console.log('!!!', `${this.httpConfig.baseUrl}${path}`);
    return this.httpClient.post<T>(`${this.httpConfig.baseUrl}${path}`, payload).toPromise();
  }

  private completeLogin = (isRefresh: boolean) => (tokens: LoginResult): Promise<Principal> =>
    this.validateTokenAsync(tokens.idToken).then(profile => ({ profile,  tokens}))
    .then(({ profile,  tokens }) => {
      this.updateStorage(isRefresh, profile['exp'], tokens);
      return this.updatePrincipal(profile);
    });

  login = info =>
      this.post<LoginResult>('login', {email: 'max-3@gmail.com', password: 'Password-org-3'})
      //this.httpClient.post('https://httpbin.org/post', {test: 'ok'}).toPromise()
      .catch(err => {
        console.log(JSON.stringify(err, null, 2));
        return Promise.reject(err);
      })
      .then(x => {
        console.log('done !!!', x);
        return x;
      })
      .then(this.completeLogin(false) as any) as any

  logout = (): void => {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_at');
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
      return this.validateTokenAsync(localStorage.getItem('id_token'));
    } else {
      return Promise.resolve(null);
    }
  };

  private validateTokenAsync = (token): Promise<A0.AdfsUserProfile | null> => {

    return this.validateToken(token) as any;
    /*
      return new Promise((resolve, reject) => {
        this.auth0.validateToken(
          token,
          null,
          (err, res) => {
            if (err) {
              console.log('validateTokenAsync:err');
              console.log(JSON.stringify(err, null, 2));
              reject(err);
            } else {
              resolve(res);
            }
          }
        );
      });
      */

  }

  validateToken(token: string) {

    var verifier = new V({
      issuer: 'https://doer-stage.eu.auth0.com/',//.token_issuer,
      jwksURI: 'https://doer-stage.eu.auth0.com/.well-known/jwks.json',//'',//this.baseOptions.jwksURI,
      audience: this.config.clientID,//this.baseOptions.clientID,
      jwksCache: new Cashe1(),
      leeway: 0// this.baseOptions.leeway || 0,
    });


    return new Promise((resolve, reject) => {
        console.log('111', verifier);
        verifier.verify(token, null, function(err, payload) {
          console.log('222', err, payload);
          if (err) {
            return reject(err);
          } else {
            return resolve(payload);
          }
        });
    });
  }

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
      .catch(() => Promise.resolve(null));


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
            this.validateTokenAsync(tokens.idToken).then(profile => ({ profile,  tokens}))
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
