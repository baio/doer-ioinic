import { IAction, action, isAction } from '../../../../libs/doer-core';
import { FormAction } from '../../../../libs/doer-ngx-core';

type SubFormActionType = '[doer-user] register org subForm action';
export const subFormActionConst = '[doer-user] register org subForm action';
export type SubFormAction = IAction<SubFormActionType, FormAction>;
export const subFormAction = action<SubFormActionType, FormAction>(
  subFormActionConst
);
export const isSubFormAction = isAction<SubFormActionType, FormAction>(
  subFormActionConst
);

export type Action = SubFormAction;
