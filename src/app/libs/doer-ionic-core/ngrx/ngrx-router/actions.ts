import { IAction, action, isAction } from "../../../doer-core";

export interface IonicGoActionPayload {
    name: string;
    id?: string;
    animate?: boolean;
  }

  export type IonicGoActionType = '[ionic-core] Router Go';
  export const ionicGoActionConst = '[ionic-core] Router Go';
  export type IonicGoAction = IAction<IonicGoActionType, IonicGoActionPayload>;
  export const ionicGoAction = action<IonicGoActionType, IonicGoActionPayload >(ionicGoActionConst);
  export const isIonicGoAction = isAction<IonicGoActionType, IonicGoActionPayload >(ionicGoActionConst);
