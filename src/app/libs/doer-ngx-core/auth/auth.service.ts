import { Injectable, Inject, InjectionToken, Optional, Injector } from '@angular/core';
import { mergeDeepLeft, pathOr, pipe, propOr, tap } from 'ramda';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Principal, Tokens } from './auth.types';

export const AUTH_SERVICE_CONFIG = new InjectionToken('AUTH_SERVICE_CONFIG');

@Injectable()
export abstract class  AuthService {
    token: string | null;
    principal: Observable<Principal | null>;
    abstract updatePrincipal(tokens: Tokens): Promise<Principal | null>;
}

