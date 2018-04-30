import { Action } from '@ngrx/store';
import { IAction, action, isAction, IResultAction, resultAction, isResultAction } from '../../../doer-core';
import { Principal } from '../../auth/auth.types';

export type LoginType = '[ngx-core] login';
export const loginConst = '[ngx-core] login';
export type LoginAction = IResultAction<LoginType, Principal>;
export const loginAction = resultAction<LoginType, Principal>(loginConst);
export const isLoginAction = isResultAction<LoginType, Principal>(loginConst);

export type LoginResultType = '[ngx-core] login result';
export const loginResultConst = '[ngx-core] login result';
export type LoginResultAction = IResultAction<LoginResultType, Principal>;
export const loginResultAction = resultAction<LoginResultType, Principal>(loginResultConst);
export const isLoginResultAction = isResultAction<LoginResultType, Principal>(loginResultConst);

export type LogoutType = '[ngx-core] logout';
export const logoutConst = '[ngx-core] logout';
export type LogoutAction = IAction<LogoutType, void>;
export const logoutAction = action<LogoutType, void>(logoutConst);
export const isLogoutAction = isAction<LogoutType, void>(logoutConst);

export type LogoutResultType = '[ngx-core] logout result';
export const logoutResultConst = '[ngx-core] logout result';
export type LogoutResultAction = IResultAction<LogoutResultType, void>;
export const logoutResultAction = resultAction<LogoutResultType, void>(logoutResultConst);
export const isLogoutResultAction = isResultAction<LogoutResultType, void>(logoutResultConst);

export type Actions = LoginAction | LoginResultAction | LogoutAction | LogoutResultAction;
