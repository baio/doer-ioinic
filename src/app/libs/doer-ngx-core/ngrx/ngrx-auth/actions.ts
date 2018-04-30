import { Action } from '@ngrx/store';
import { IAction, action, isAction, IResultAction, resultAction, isResultAction } from '../../../doer-core';
import { Principal } from '../../auth/auth.types';

export type LoginSuccessType = '[ngx-core] login success';
export const loginSuccessConst = '[ngx-core] login success';
export type LoginSuccessAction = IAction<LoginSuccessType, Principal>;
export const loginSuccessAction = action<LoginSuccessType, Principal>(loginSuccessConst);
export const isLoginSuccessAction = isAction<LoginSuccessType, Principal>(loginSuccessConst);

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

export type Actions = LoginSuccessAction | LogoutAction | LogoutResultAction;
