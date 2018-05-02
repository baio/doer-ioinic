import { Injectable, Inject, InjectionToken, Optional, Injector } from '@angular/core';
import { mergeDeepLeft, pathOr, pipe, propOr, tap } from 'ramda';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Principal, Tokens } from './auth.types';

export const AUTH_SERVICE_CONFIG = new InjectionToken('AUTH_SERVICE_CONFIG');

export interface Auth0Config {
    clientID: string;
    domain: string;
    audience: string;
    redirectUri: string;
    jwks?: any | null;
}

interface HandleAuthorizationResult {
    principal: Principal;
    fromCallback: boolean;
}

@Injectable()
export abstract class  AuthService {
    token: string | null;
    principal: Observable<Principal | null>;
    abstract login = (info: {email: string, password: string}): Promise<Principal> => null;
    abstract logout = (): void => null;
    abstract handleAuthentication = (): Promise<HandleAuthorizationResult | null> => null;
}

