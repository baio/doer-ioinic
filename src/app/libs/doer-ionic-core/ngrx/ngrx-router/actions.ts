import { IAction, action, isAction } from '@doer/core';

export interface IonicGoActionPayload {
  name: string;
  id?: string;
  animate?: boolean;
}

export type IonicGoActionType = '[ionic-core] router go';
export const ionicGoActionConst = '[ionic-core] router go';
export type IonicGoAction = IAction<IonicGoActionType, IonicGoActionPayload>;
export const ionicGoAction = action<IonicGoActionType, IonicGoActionPayload>(
  ionicGoActionConst
);
export const isIonicGoAction = isAction<
  IonicGoActionType,
  IonicGoActionPayload
>(ionicGoActionConst);

export type IonicBackActionType = '[ionic-core] router back';
export const ionicBackActionConst = '[ionic-core] router back';
export type IonicBackAction = IAction<IonicBackActionType, void>;
export const ionicBackAction = action<IonicBackActionType, void>(
  ionicBackActionConst
);
export const isIonicBackAction = isAction<IonicBackActionType, void>(ionicBackActionConst);

export type Action = IonicGoAction | IonicBackAction;
