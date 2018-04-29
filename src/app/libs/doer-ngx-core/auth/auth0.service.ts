import { Injectable, Inject } from '@angular/core';
import { AuthService, AUTH_SERVICE_CONFIG } from './auth.service';
import { Principal, Tokens } from './auth.types';
import * as A0 from 'auth0-js';
import * as jwt from 'jsonwebtoken';
import { path, tap, always, equals } from 'ramda';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged } from 'rxjs/operators';
import { err, Result } from '../../doer-core';

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
  name: profile.name,
  avatar: profile.picture
});

@Injectable()
export class Auth0Service extends AuthService {
  private readonly auth0: A0.WebAuth;
  private readonly principal$ = new BehaviorSubject<Principal | null>(null);

  constructor(@Inject(AUTH_SERVICE_CONFIG) config: Auth0Config) {
    super();
    this.auth0 = new A0.WebAuth({
      clientID: config.clientID,
      domain: config.domain,
      responseType: 'token id_token',
      audience: config.audience,
      redirectUri: config.redirectUri,
      scope: 'openid profile'
    });
  }

  get isExpired() {
    const x = localStorage.getItem('expires_at');
    const expiresAt = x ? JSON.parse(x) : null;
    return new Date().getTime() < expiresAt;
  }

  get principal(): Observable<Principal | null> {
    return this.principal$.pipe(distinctUntilChanged(equals)) as any;
  }

  get token(): string | null {
    return this.isExpired ? null : localStorage.getItem('access_token');
  }

  login(email: string, password: string) {
    this.auth0.login({ email, password }, err => {
      // TODO : handle error !
      console.error(err);
    });
  }

  updatePrincipal = (tokens: Tokens): Promise<Principal> =>  {
    return this.validateTokenAsync(tokens.idToken).then(profile => {
      const principal = profile2Principal(profile);
      this.updateStorage(tokens);
      this.principal$.next(principal);
      return principal;
    });
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.principal$.next(null);
  }

  private updateStorage = (tokens: Tokens) => (profile: A0.AdfsUserProfile) => (
    principal: Principal
  ) => {
    const expiresAt = JSON.stringify(
      profile['exp'] * 1000 + new Date().getTime()
    );

    localStorage.setItem('access_token', tokens.accessToken);
    localStorage.setItem('id_token', tokens.idToken);
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

  private validateTokenAsync = (token: string): Promise<A0.AdfsUserProfile> => {
    return new Promise((resolve, reject) => {
      this.auth0.validateToken(token, null, (err, payload ) => {
        if (err) {
          reject(err);
        } else {
          resolve(payload);
        }
      });
    });
  };

  public handleAuthentication = () =>
    this.parseHashAsync().then(this.updatePrincipal);

}
