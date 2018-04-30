import { Action } from '@ngrx/store';
import { IAction, action, isAction } from '../../../doer-core';
import { Principal } from '../../auth/auth.types';



export type LoginSuccessType = '[ngx-core] login success';
export const loginSuccessConst = '[ngx-core] login success';
export type LoginSuccessAction = IAction<LoginSuccessType, Principal>;
export const loginSuccessAction = action<LoginSuccessType, Principal>(loginSuccessConst);
export const isLoginSuccessAction = isAction<LoginSuccessType, Principal>(loginSuccessConst);

export type Actions = LoginSuccessAction;
