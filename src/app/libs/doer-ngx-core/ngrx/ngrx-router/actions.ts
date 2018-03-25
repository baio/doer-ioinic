import { Action } from '@ngrx/store';
import { IAction, action, isAction } from '../../../doer-core';


export interface GoActionPayload {
  path: any[];
  query?: object;
  extras?: any;
}

export type GoActionType = '[ngx-core] Router Go';
export const goActionConst = '[ngx-core] Router Go';
export type GoAction = IAction<GoActionType, GoActionPayload>;
export const goAction = action<GoActionType, GoActionPayload>(goActionConst);
export const isGoAction = isAction<GoActionType, GoActionPayload>(goActionConst);

export interface GoBlankActionPayload {
  path: any[];
  query?: object;
}

export type GoBlankActionType = '[ngx-core] Router Go Blank';
export const goBlankActionConst = '[ngx-core] Router Go Blank';
export type GoBlankAction = IAction<GoBlankActionType, GoBlankActionPayload>;
export const goBlankAction = action<GoBlankActionType, GoBlankActionPayload>(goBlankActionConst);
export const isGoBlankAction = isAction<GoBlankActionType, GoBlankActionPayload>(goBlankActionConst);

export type GoSilentActionType = '[ngx-core] Router Go Silent';
export const goSilentActionConst = '[ngx-core] Router Go Silent';
export type GoSilentAction = IAction<GoSilentActionType, GoActionPayload>;
export const goSilentAction = action<GoSilentActionType, GoActionPayload>(goSilentActionConst);
export const isGoSilentAction = isAction<GoSilentActionType, GoActionPayload>(goSilentActionConst);

export type BackActionType = '[ngx-core] Back';
export const backActionConst = '[ngx-core] Back';
export type BackAction = IAction<BackActionType, void>;
export const backAction = action<BackActionType, void>(backActionConst);
export const isBackAction = isAction<BackActionType, void>(backActionConst);

export type ForwardActionType = '[ngx-core] Forward';
export const forwardActionConst = '[ngx-core] Forward';
export type ForwardAction = IAction<ForwardActionType, void>;
export const forwardAction = action<ForwardActionType, void>(forwardActionConst);
export const isForwardAction = isAction<ForwardActionType, void>(forwardActionConst);

export type Actions = GoAction | BackAction | ForwardAction | GoBlankAction | GoSilentAction;
