import { Action } from '@ngrx/store';
import { IAction, action, isAction, IResultAction, resultAction, isResultAction } from '../../../doer-core';
import { Principal, Tokens } from '../../auth/auth.types';

export type LoginType = '[ngx-core] login';
export const loginConst = '[ngx-core] login';
export type LoginAction = IResultAction<LoginType, Principal>;
export const loginAction = resultAction<LoginType, Principal>(loginConst);
export const isLoginAction = isResultAction<LoginType, Principal>(loginConst);

export type LoginFromTokensType = '[ngx-core] login from tokens';
export const loginFromTokensConst = '[ngx-core] login from tokens';
export type LoginFromTokensAction = IResultAction<LoginFromTokensType, Tokens>;
export const loginFromTokensAction = resultAction<LoginFromTokensType, Tokens>(loginFromTokensConst);
export const isLoginFromTokensAction = isResultAction<LoginFromTokensType, Tokens>(loginFromTokensConst);

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

export type SetAvatarType = '[ngx-core] set avatar';
export const setAvatarConst = '[ngx-core] set avatar';
export type SetAvatarAction = IAction<SetAvatarType, string>;
export const setAvatarAction = action<SetAvatarType, string>(setAvatarConst);
export const isSetAvatarAction = isAction<SetAvatarType, string>(setAvatarConst);

export type StorePrincipalType = '[ngx-core] store principal';
export const storePrincipalConst = '[ngx-core] store principal';
export type StorePrincipalAction = IAction<StorePrincipalType, void>;
export const storePrincipalAction = action<StorePrincipalType, void>(storePrincipalConst);
export const isStorePrincipalAction = isAction<StorePrincipalType, string>(storePrincipalConst);

export type RestorePrincipalType = '[ngx-core] restore principal';
export const restorePrincipalConst = '[ngx-core] restore principal';
export type restorePrincipalAction = IAction<RestorePrincipalType, void>;
export const restorePrincipalAction = action<RestorePrincipalType, void>(restorePrincipalConst);
export const isRestorePrincipalAction = isAction<RestorePrincipalType, void>(restorePrincipalConst);

// sync local storage principal and token one
export type SetPrincipalDataType = '[ngx-core] set principal data';
export const setPrincipalDataConst = '[ngx-core] set principal data';
export type SetPrincipalDataAction = IAction<SetPrincipalDataType, Principal>;
export const setPrincipalDataAction = action<SetPrincipalDataType, Principal>(setPrincipalDataConst);
export const isSetPrincipalDataAction = isAction<SetPrincipalDataType, Principal>(setPrincipalDataConst);

export type Actions = LoginAction | LoginResultAction | LogoutAction
| LogoutResultAction | LoginFromTokensAction | SetAvatarAction
| StorePrincipalAction | StorePrincipalAction | StorePrincipalAction | SetPrincipalDataAction;
